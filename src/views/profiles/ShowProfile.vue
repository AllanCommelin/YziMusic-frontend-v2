<template>
    <div class="mb-16">
        <div class="mb-40 sm:mb-72">
            <div class="absolute bg-center bg-cover flex items-center justify-center top-0 left-0 right-0 bg-gray-400 h-40 sm:h-72" v-bind:style="{ backgroundImage: 'url('+userBanner+')' }">
                <div class="absolute -bottom-22 flex flex-col justify-center">
                    <img src="../../assets/images/default-profile.jpg" alt="profile"
                         class="h-52 rounded-full border-solid border-main border-7 -mt-3"/>
                </div>
                <h1 class="absolute -bottom-25 text-white text-3xl font-black font-sans uppercase">
                    {{ user.username }}
                </h1>
            </div>
        </div>
        <div class="mt-64 sm:mt-96 mb-12 container flex justify-center flex-col sm:flex-row">
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

        </div>
        <div class="flex justify-between flex-col lg:flex-row">
            <div class="infos py-2 px-8 bg-ym-black order-2 w-full lg:w-1/6 lg:order-1 text-left">
                <h2 class="text-main uppercase font-black italic text-2xl mb-1">Profil</h2>
                <div class="flex flex-row lg:flex-col">
                    <div class="w-1/2 mb-4 lg:w-full">
                        <span class="italic font-thin text-sm text-white">Type(s)</span>
                        <div v-for="(profile, index) in userProfilesTypes" v-bind:key="profile">
                            <span class="font-bold text-xl text-white">
                                {{ profile}} {{ index + 1 !== userProfilesTypes.length ? ',' : ''}}
                            </span>
                        </div>
                    </div>
                    <div class="w-1/2 mb-4 lg:w-full">
                        <span class="italic font-thin text-sm text-white">Style(s)</span>
                        <div>
                            <span v-for="(music, index) in userMusicsTypes" v-bind:key="music" class="font-bold text-xl text-white">
                                {{ music }} {{ index + 1 !== userMusicsTypes.length ? ',' : ''}}
                            </span>
                        </div>
                    </div>
                </div>
                <h2 class="text-main uppercase font-black italic text-2xl mb-1">Infos</h2>
                <div class="flex flex-row lg:flex-col w-full flex-wrap">
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
            <div class="w-full order-1 py-2 px-8 bg-ym-black lg:w-3/6 lg:order-2 text-left">
                <h2 class="text-main uppercase font-black italic text-2xl mb-1">Description</h2>
                <p class="text-white text-lg font-thin mb-4">{{ user.description }}</p>
            </div>
            <div class="w-full order-3 py-2 px-8 bg-ym-black lg:w-1/6 lg:order-3 text-left">
                <div>
                    <h2 class="text-main uppercase font-black italic text-2xl">Réseaux sociaux</h2>
                    <!--Réseaux sociaux-->
                    <h2 class="text-main uppercase font-black italic text-2xl">Streaming</h2>
                    <!--Streamings-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import moment from 'moment'
    import ProfilesTypes from '../../store/constants/ProfilesTypes'
    import MusicsType from '../../store/constants/MusicsTypes'

    export default {
        name: "ShowProfile",
        data () {
            return {
                user: {},
                userProfilesTypes: [],
                userMusicsTypes: [],
                constProfilesTypes: ProfilesTypes,
                constMusicsTypes: MusicsType,
                userBanner: require('../../assets/images/default-banner.png'),
                showEmail: false
            }
        },
        mounted () {
            // this.$route.params.id
            this.getUser()
        },
        methods: {
            getUser: function () {
                // Call api to get user by user Id
                Vue.prototype.$http.get('http://localhost:6985/api/users/'+this.$route.params.id)
                    .then(res => {
                        console.log(res.data)
                        // Init user
                        this.user = res.data.data
                        // Get label of each profile and music type
                        this.getProfilesType();
                        this.getMusicsType();
                    })
                    .catch(() => {
                        //Todo: catch error
                    })
            },
            displayEmail: function () {
                // Show email of user
                this.showEmail = true
            },
            getProfilesType: function () {
                //  Get translate profiles types
                if(this.user.profilesTypes && Object.keys(this.user.profilesTypes).length !== 0) {
                    this.userProfilesTypes = this.user.profilesTypes.map((type) => {
                        const { label } = this.constProfilesTypes.find(profile => profile.value === type)
                        return label
                    })
                }
            },
            getMusicsType: function () {
                //  Get translate musics types
                if(this.user.musicsTypes && Object.keys(this.user.musicsTypes).length !== 0) {
                    this.userMusicsTypes = this.user.musicsTypes.map((type) => {
                        const { label } = this.constMusicsTypes.find(music => music.value === type)
                        return label
                    })
                }
            },
            getAge: function (date) {
                return moment().diff(moment(date),'year')
            }
        }
    }
</script>

<style scoped>

</style>