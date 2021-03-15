<template>
    <div class="w-full min-width relative rounded text-center rounded-t-lg bg-ym-light-black text-white overflow-hidden shadow max-w-xs my-3">
        <div class="absolute right-0 top-0 p-2">
            <span class="font-black text-sm">{{ user.likes.length }} <i class="fas fa-thumbs-up text-sm text-ym-blue"/></span>
        </div>
        <div class="flex justify-center mt-8">
            <img :src="imageProfile" alt="profile"
                 class="h-28 rounded-full border-solid border-main border-5 -mt-3"/>
        </div>
        <div class="text-center px-3 pb-3 pt-2">
            <h3 class="-mt-8 text-white text-2xl font-black font-sans uppercase italic">{{ user.username }}</h3>
            <ul class="chips mt-2 font-sans font-light">
                <li v-for="profile in constProfilesTypes" v-bind:key="profile.value"
                    v-bind:class="[user.profilesTypes.includes(profile.value) ? 'activeProfile' : 'inactiveProfile']">
                    {{ profile.label }}
                </li>
            </ul>
        </div>
        <div class="musics-container flex px-3 py-2 text-grey-dark mb-18">
            <div class="uppercase font-black text-main justify-left flex flex-col items-start align-center pr-4 border-r-2 border-ym-light-black">
                <span class="block">Genres</span>
                <span class="block">Musicaux</span>
            </div>
            <ul class="chips pl-4 flex flex-wrap justify-left">
                <li v-for="music in musicsTypesActiveDisplay()" v-bind:key="music.value"
                    class="chipMusic">
                    {{ music.label }}
                </li>
                <li>{{musicsTypesActive(true) > 3 ? '...' : ''}}</li>
            </ul>
        </div>
        <div class="flex justify-center left-0 right-0 absolute bottom-0">
            <router-link :to="{name: 'Profile.show', params: { id: user._id }}" class="uppercase italic font-bold w-full mt-4 btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-main hover:bg-main text-white font-normal py-4 px-4 rounded-b">
                Découvrir
            </router-link>
        </div>
    </div>
</template>

<script>
    import ProfilesTypes from '../store/constants/ProfilesTypes'
    import MusicsType from '../store/constants/MusicsTypes'

    export default {
        name: "UserCard",
        props: ['user'],
        data () {
            return {
                constProfilesTypes: ProfilesTypes,
                constMusicsTypes: MusicsType,
            }
        },
        computed: {
            imageProfile: function () {
                return this.user.profilePicture ?
                    'data:'+ this.user.profilePicture.contentType +';base64,'+btoa(String.fromCharCode(...new Uint8Array(this.user.profilePicture.data.data)))
                    : require('../assets/images/default-profile.jpg')
            }
        },
        methods: {
            musicsTypesActive: function (count = false) {
                // Get user's musics types
                const types = this.constMusicsTypes.filter( music => this.user.musicsTypes.includes(music.value))
                // if parameter count is true, return length of musics types else return musics types
                return count ? types.length : types
            },
            musicsTypesActiveDisplay: function () {
                // Truncate number of musics types to 3
                return this.musicsTypesActive().slice(0,3)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .min-width {
        min-width: 275px;
    }

    div.musics-container {
        background-color: #343434;
        min-height: 114px;
    }

    ul.chips {
        li {
            display: inline-block;
            padding: .25rem .5rem;
            border-radius: 100px;
            font-weight: 800;
            font-size: .8rem;
            margin: .7rem .2rem;

            &.activeProfile {
                background-color: white;
                color: #7149F9;
            }
            &.inactiveProfile {
                background-color: #9F9F9F;
                color: #656565;
            }
            &.chipMusic {
               background-color: #7149F9;
                color: white;
                display: inline-table;
            }
        }
    }
</style>