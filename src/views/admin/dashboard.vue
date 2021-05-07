<template>
    <div>
        <div class="flex flex-wrap">
            <div class="w-full">
                <h2 class="relative text-left font-black uppercase italic text-5xl shadow-title title--outline mb-4">Dashboard</h2>
                <div class="flex gap-6 justify-center sm:justify-between flex-wrap sm:flex-no-wrap">
                    <div class="py-4 px-8 shadow-lg rounded-lg bg-ym-light-black">
                        <p class="text-sm text-white">Nombre d'utilisateurs</p>
                        <span class="text-3xl font-black text-main">{{ stats.users }}</span>
                    </div>
                    <div class="py-4 px-8 shadow-lg rounded-lg bg-ym-light-black">
                        <p class="text-sm text-white">Nombre de beatmakers</p>
                        <span class="text-3xl font-black text-main">{{ stats.beatmakers }}</span>
                    </div>
                    <div class="py-4 px-8 shadow-lg rounded-lg bg-ym-light-black">
                        <p class="text-sm text-white">Nombre de chanteurs</p>
                        <span class="text-3xl font-black text-main">{{ stats.singers }}</span>
                    </div>
                    <div class="py-4 px-8 shadow-lg rounded-lg bg-ym-light-black">
                        <p class="text-sm text-white">Nombre de musiciens</p>
                        <span class="text-3xl font-black text-main">{{ stats.musicians }}</span>
                    </div>
                </div>
                <div>
                    <div class="bg-white shadow-md rounded mt-6 mb-16">
                        <table class="w-full table-auto">
                            <thead>
                            <tr class="bg-ym-light-black text-main uppercase text-sm leading-normal">
                                <th class="py-3 px-6 text-left"></th>
                                <th class="py-3 px-6 text-left">Pseudo</th>
                                <th class="py-3 px-6 text-left">Email</th>
                                <th class="py-3 px-6 text-left">Profiles</th>
                                <th class="py-3 px-6 text-center">Likes</th>
                                <th class="py-3 px-6 text-center">Projets</th>
                                <th class="py-3 px-6 text-center">Actions</th>
                            </tr>
                            </thead>
                            <tbody class="text-gray-600 text-sm font-light">
                            <tr v-for="user in users" v-bind:key="user._id" class="border-b border-gray-200 bg-ym-lighter-black text-white hover:bg-ym-light-black">
                                <td class="py-3 px-6 text-left whitespace-nowrap">
                                    <div class="flex items-center">
                                        <img class="w-12 h-12 rounded-full" :src="user.profilePicture ? 'data:'+ user.profilePicture.contentType +';base64,'+ user.profilePicture.picture : require('../../assets/images/default-profile.jpg')" alt="photo de profile"/>
                                    </div>
                                </td>
                                <td class="py-3 px-6 font-medium text-left">
                                    <div class="flex items-center">
                                        <span>{{ user.username }}</span>
                                    </div>
                                </td>
                                <td class="py-3 px-6 font-medium">
                                    <div class="flex items-center">
                                        <a class="hover:text-ym-blue hover:underline" :href="'mailto:'+ user.email">{{ user.email }}</a>
                                    </div>
                                </td>
                                <td class="py-3 px-6 font-medium">
                                    <div class="flex-col text-left">
                                        <div v-for="profile in user.profilesTypes" v-bind:key="profile" class="my-2">
                                            <span class="bg-main text-white py-1 px-3 rounded-full text-xs">
                                                {{ constProfilesTypes.find(type => type.value === profile).label }}
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td class="py-3 px-6 font-medium">
                                    <div class="flex items-center justify-center">
                                        <span class="font-bold">{{ user.likes.length }}</span>
                                    </div>
                                </td>
                                <td class="py-3 px-6 font-medium">
                                    <div class="flex items-center justify-center">
                                        <span class="font-bold">{{ user.tracks.length }}</span>
                                    </div>
                                </td>
                                <td class="py-3 px-6 text-center">
                                    <div class="flex item-center justify-center">
                                        <router-link :to="{name: 'Profile.show', params: { id: user._id }}" class="w-4 mr-2 transform hover:text-ym-blue hover:scale-110">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.469,8.924l-2.414,2.413c-0.156,0.156-0.408,0.156-0.564,0c-0.156-0.155-0.156-0.408,0-0.563l2.414-2.414c1.175-1.175,1.175-3.087,0-4.262c-0.57-0.569-1.326-0.883-2.132-0.883s-1.562,0.313-2.132,0.883L9.227,6.511c-1.175,1.175-1.175,3.087,0,4.263c0.288,0.288,0.624,0.511,0.997,0.662c0.204,0.083,0.303,0.315,0.22,0.52c-0.171,0.422-0.643,0.17-0.52,0.22c-0.473-0.191-0.898-0.474-1.262-0.838c-1.487-1.485-1.487-3.904,0-5.391l2.414-2.413c0.72-0.72,1.678-1.117,2.696-1.117s1.976,0.396,2.696,1.117C17.955,5.02,17.955,7.438,16.469,8.924 M10.076,7.825c-0.205-0.083-0.437,0.016-0.52,0.22c-0.083,0.205,0.016,0.437,0.22,0.52c0.374,0.151,0.709,0.374,0.997,0.662c1.176,1.176,1.176,3.088,0,4.263l-2.414,2.413c-0.569,0.569-1.326,0.883-2.131,0.883s-1.562-0.313-2.132-0.883c-1.175-1.175-1.175-3.087,0-4.262L6.51,9.227c0.156-0.155,0.156-0.408,0-0.564c-0.156-0.156-0.408-0.156-0.564,0l-2.414,2.414c-1.487,1.485-1.487,3.904,0,5.391c0.72,0.72,1.678,1.116,2.696,1.116s1.976-0.396,2.696-1.116l2.414-2.413c1.487-1.486,1.487-3.905,0-5.392C10.974,8.298,10.55,8.017,10.076,7.825"></path>
                                            </svg>
                                        </router-link>
                                        <button v-on:click="openModal(user.username, user._id)" class="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div v-if="modal.visible" class="h-screen w-full fixed flex top-0 left-0 right-0 bottom-0 items-center justify-center bg-modal">
                            <div class="bg-white py-4 px-8 shadow-lg rounded-lg max-w-lg max-h-full text-center">
                                <div class="mb-4">
                                    <h3 class="text-ym-black font-bold text-2xl">
                                        Souhaitez-vous définitivement supprimer le profil de
                                        <span class="text-ym-blue font-black">{{ modal.username }}</span> ?
                                    </h3>
                                </div>
                                <p class="mb-8">
                                    Attention, cette action est irréversible et définitive
                                </p>
                                <div class="flex justify-around">
                                    <button class="flex-no-shrink text-white py-2 px-4 rounded bg-ym-blue" v-on:click="modal.visible = false">Annuler</button>
                                    <button v-on:click="deleteUser" class="flex-no-shrink text-white py-2 px-4 rounded bg-red-500">Oui, je veux le supprimer</button>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import ProfilesTypes from "@/store/constants/ProfilesTypes";
import {mapState} from "vuex";

export default {
    name: "dashboard",
    data () {
        return {
            stats: {
                'users': 0,
                'beatmakers': 0,
                'singers': 0,
                'musicians': 0,
            },
            users: [],
            constProfilesTypes: ProfilesTypes,
            modal: {
                visible: false,
                username: null,
                userToDelete: null,
            }
        }
    },
    computed: {
        ...mapState({
            user: state => state.User.user,
        })
    },
    mounted() {
        if (this.user.role !== 'admin') this.$router.push({name:'Home'})
        this.getStats()
        this.getUsers()
    },
    methods: {
        getUsers: function () {
            // Call api to get all users
            Vue.prototype.$http.get(process.env.VUE_APP_API_URL+'/api/users/')
                .then(res => {
                    this.users = res.data.data
                })
                .catch(() => {
                    //Todo: catch error
                })
        },
        getStats: function () {
            // Call api to get users stats
            Vue.prototype.$http.get(process.env.VUE_APP_API_URL+'/api/users/stats')
                .then(res => {
                    this.stats.users = res.data.data.users
                    this.stats.beatmakers = res.data.data.beatmakers
                    this.stats.singers = res.data.data.singers
                    this.stats.musicians = res.data.data.musicians
                })
                .catch(() => {
                    //Todo: catch error
                })
        },
        openModal: function (username, id) {
            this.modal.visible = true
            this.modal.username = username
            this.modal.userToDelete = id
        },
        deleteUser: function () {
            Vue.prototype.$http.delete(process.env.VUE_APP_API_URL+'/api/users/'+ this.modal.userToDelete)
                .then(() => {
                    this.getStats()
                    this.getUsers()
                    this.closeModal()
                })
                .catch(() => {
                    //Todo: catch error
                })
        },
        closeModal: function () {
            this.modal.visible = false
            this.modal.username = null
            this.modal.userToDelete = null
        }
    }
}
</script>

<style scoped>
    .bg-ym-lighter-black {
        background-color: #3C3C3C;
    }
    .bg-modal {
        background-color: rgba(15, 15, 15, .9);
    }
</style>