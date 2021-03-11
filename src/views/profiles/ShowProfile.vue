<template>
    <div class="mb-16 flex flex-wrap">
        <div class="profile-header w-full lg:w-1/4 relative">
            <div class="absolute setting-btn" v-on:click="goToSetting">
                <i class="fas fa-cog"></i>
            </div>
            <div class="mb-6">
                <div class="relative flex justify-center">
                    <img :src="imageProfile" alt="photo de profil"
                         class="h-48 relative rounded-full border-solid border-main border-8 -mt-3"/>
                    <h1 class="absolute username-profile mt-4 text-white text-4xl font-black font-sans italic uppercase">
                        {{ user.username }}
                    </h1>
                </div>
            </div>
            <div class="profile-main-infos">
                <div>
                    <span v-for="(profile, index) in userProfilesTypes" v-bind:key="profile.value" class="font-black text-2xl text-main">
                    {{ profile.label }}{{ index + 1 !== userProfilesTypes.length ? ', ' : ' '}}
                </span>
                </div>
                <div class="musics-container flex px-3 py-2 text-grey-dark my-4 px-10 -mx-10">
                    <div class="uppercase font-thin text-white justify-left flex flex-col items-start align-center pr-4 border-r-2 border-ym-light-black">
                        <span class="block">Genres</span>
                        <span class="block">Musicaux</span>
                    </div>
                    <ul class="chips pl-4 flex flex-wrap justify-left items-center">
                        <li v-for="music in userMusicsTypes" v-bind:key="music.value">
                            {{ music.label }}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="profile-secondary-infos text-left my-4">
                <div v-on:click="showInfos = !showInfos" class="flex justify-between items-center text-white">
                    <h2 class="title-infos uppercase font-black italic text-2xl my-0 py-0">Infos</h2>
                    <i v-show="!showInfos" class="fas fa-chevron-right"></i>
                    <i v-show="showInfos" class="fas fa-chevron-down"></i>
                </div>
                <div v-show="showInfos" class="transition-all flex flex-row lg:flex-col w-full flex-wrap">
                    <div class="mb-4 w-full">
                        <span class="italic font-thin text-sm text-white">Nom</span>
                        <div>
                            <span class="font-bold text-xl text-white">{{ user.lastname}}</span>
                        </div>
                    </div>
                    <div class="mb-4 w-full">
                        <span class="italic font-thin text-sm text-white">Prénom</span>
                        <div>
                            <span class="font-bold text-xl text-white">{{ user.firstname}}</span>
                        </div>
                    </div>
                    <div class="mb-4 w-full">
                        <span class="italic font-thin text-sm text-white">Âge</span>
                        <div>
                            <span class="font-bold text-xl text-white">{{ getAge(user.birthday) }} ans</span>
                        </div>
                    </div>
                    <div class="mb-4 w-full">
                        <span class="italic font-thin text-sm text-white">Ville/Pays</span>
                        <div>
                            <span class="font-bold text-xl text-white">{{ user.location }}</span>
                        </div>
                    </div>
                    <div class="mb-4 w-full">
                        <span class="italic font-thin text-sm text-white">E-mail : </span>
                        <div>
                            <span v-if="showEmail" class="font-bold text-lg text-white">{{ user.email }}</span>
                            <button v-else v-on:click="displayEmail" class="uppercase text-sm italic font-bold w-auto btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-main hover:bg-main text-white font-normal py-2 px-4 rounded">Voir</button>
                        </div>
                    </div>
            </div>
        </div>
            <template v-if="!isAuthUser">
                <div class="flex justify-center w-100">
                    <button class="max-w-56 w-full mr-0 sm:mr-2 uppercase rounded-full border-3 border-solid border-main italic font-bold mt-4 btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline text-main font-normal py-2 px-6">
                        Contacter
                        <i class="fas fa-paper-plane text-xl text-main"></i>
                    </button>
                </div>
                <div class="flex justify-center w-100">
                    <button class="max-w-56 w-full ml-0 sm:ml-2 uppercase rounded-full border-3 border-solid border-main italic font-bold mt-4 btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline text-main font-normal py-2 px-6">
                        {{ user.likes }}
                        <i class="fas fa-thumbs-up text-xl text-main"/>
                    </button>
                </div>
            </template>
        </div>
        <div class="profile-content w-full lg:w-3/4">
            <div class="w-full order-1 py-2 px-8 bg-ym-black lg:w-3/6 lg:order-2 text-left">
                <h2 class="text-main uppercase font-black italic text-2xl mb-1">Description</h2>
                <p class="text-white text-lg font-thin mb-4">{{ user.description }}</p>
            </div>
            <div class="w-full order-3 py-2 px-8 bg-ym-black lg:w-1/6 lg:order-3 text-left">
                <div>
                    <h2 class="text-main uppercase font-black italic text-2xl">Réseaux sociaux</h2>
                   <div class="flex py-4">
                       <div v-if="user.facebookLink" class="text-center px-4">
                           <a :href="user.facebookLink" class="text-center">
                               <img src="../../assets/icons/facebook.png" class="icons-social mx-auto my-2" alt="logo facebook">
                               <span class="text-white">Facebook</span>
                           </a>
                       </div>
                       <div v-if="user.twitterLink" class="text-center px-4">
                           <a :href="user.twitterLink" class="text-center">
                               <img src="../../assets/icons/twitter.svg" class="icons-social mx-auto my-2" alt="logo twitter">
                               <span class="text-white">Twitter</span>
                           </a>
                       </div>
                       <div v-if="user.instagramLink" class="text-center px-4">
                           <a :href="user.instagramLink" class="text-center">
                               <img src="../../assets/icons/instagram.png" class="icons-social mx-auto my-2" alt="logo instagram">
                               <span class="text-white">Instagram</span>
                           </a>
                       </div>
                       <div v-if="user.youtubeLink" class="text-center px-4">
                           <a :href="user.youtubeLink" class="text-center">
                               <img src="../../assets/icons/youtube.png" class="icons-social mx-auto my-2" alt="logo youtube">
                               <span class="text-white">YouTube</span>
                           </a>
                       </div>
                   </div>
                    <h2 class="text-main uppercase font-black italic text-2xl">Streaming</h2>
                    <div class="flex py-4">
                        <div v-if="user.spotifyLink" class="text-center px-4">
                            <a :href="user.spotifyLink" class="text-center">
                                <img src="../../assets/icons/spotify.png" class="icons-social mx-auto my-2" alt="logo spotify">
                                <span class="text-white">Spotify</span>
                            </a>
                        </div>
                        <div v-if="user.appleMusicLink" class="text-center px-4">
                            <a :href="user.appleMusicLink" class="text-center">
                                <img src="../../assets/icons/applemusic.png" class="icons-social mx-auto my-2" alt="logo applemusic">
                                <span class="text-white">Apple Music</span>
                            </a>
                        </div>
                        <div v-if="user.deezerLink" class="text-center px-4">
                            <a :href="user.deezerLink" class="text-center">
                                <img src="../../assets/icons/deezer.png" class="icons-social mx-auto my-2" alt="logo deezer">
                                <span class="text-white">Deezer</span>
                            </a>
                        </div>
                        <div v-if="user.soundcloudLink" class="text-center px-4">
                            <a :href="user.soundcloudLink" class="text-center">
                                <img src="../../assets/icons/soundcloud.png" class="icons-social mx-auto my-2" alt="logo soundcloud">
                                <span class="text-white">SoundCloud</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import moment from 'moment'
    import { mapState } from 'vuex'
    import ProfilesTypes from '../../store/constants/ProfilesTypes'
    import MusicsType from '../../store/constants/MusicsTypes'

    export default {
        name: "ShowProfile",
        data () {
            return {
                user: {},
                isAuthUser: false,
                constProfilesTypes: ProfilesTypes,
                constMusicsTypes: MusicsType,
                userBanner: require('../../assets/images/default-banner.png'),
                showEmail: false,
                showInfos: false
            }
        },
        computed: {
            ...mapState({
                authUser: state => state.User.user,
                is_login: state => state.User.is_login
            }),
            imageProfile: function () {
                return this.user.profilePicture ?
                    'data:'+ this.user.profilePicture.contentType +';base64,'+ this.user.profilePicture.picture
                    : require('../../assets/images/default-profile.jpg')
            },
            userProfilesTypes: function () {
                //  Get translate profiles types
                return this.constProfilesTypes.filter( profile =>{
                    if (this.user.profilesTypes && this.user.profilesTypes.includes(profile.value)) {
                        profile.checked = true
                        return profile
                    }
                })
            },
            userMusicsTypes: function () {
                //  Get translate musics types
                return this.constMusicsTypes.filter( music => {
                    if (this.user.musicsTypes && this.user.musicsTypes.includes(music.value)) {
                        music.checked = true
                        return music
                    }
                })
            }
        },
        mounted () {
            // Checks if the authenticated user, if it is, is the same as the user you want to see
            if (this.is_login) this.isAuthUser = this.authUser._id === this.$route.params.id
            // If not make a call api to get user
            if (!this.isAuthUser) this.getUser()
            else this.user = this.authUser
        },
        methods: {
            goToSetting: function () {
                this.$router.push({name:'Profile.setting'})
            },
            getUser: function () {
                // Call api to get user by user Id
                Vue.prototype.$http.get('http://localhost:6985/api/users/'+this.$route.params.id)
                    .then(res => {
                        // Init user
                        this.user = res.data.data
                    })
                    .catch(() => {
                        //Todo: catch error
                    })
            },
            displayEmail: function () {
                // Show email of user
                this.showEmail = true
            },
            getAge: function (date) {
                return moment().diff(moment(date),'year')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .username-profile {
        bottom: -1.25rem;
    }
    div.musics-container {
        background-color: #343434;
    }
    .setting-btn {
        right: 0;
        top: -1rem;
        color: #919191;
    }
    .title-infos {
        color: #919191;
    }
    ul.chips {
        li {
            display: inline-block;
            padding: .25rem .5rem;
            border-radius: 100px;
            font-weight: 800;
            font-size: .8rem;
            margin: .7rem .2rem;
            background-color: #7149F9;
            color: white;
        }
    }
</style>