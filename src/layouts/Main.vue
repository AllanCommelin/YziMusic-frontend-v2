<template>
    <div class="main bg-ym-black relative">
        <nav class="flex items-center justify-between flex-wrap bg-ym-black p-6 fixed w-full z-10 top-0">
            <div class="flex items-center flex-shrink-0 text-white mr-6">
                <button class="text-white no-underline hover:text-white hover:no-underline" v-on:click="goTo('Home')">
                    <img class="h-5" src="../assets/images/logo.svg" alt="YziMusic logo"/>
                </button>
            </div>
            <div class="block lg:hidden">
                <button v-on:click="toggleNav"
                        class="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white">
                    <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                    </svg>
                </button>
            </div>
            <div :class="['w-full flex-grow lg:flex lg:items-center lg:w-auto lg:block pt-6 lg:pt-0', !navToggle ? 'hidden' :'']"
                 v-on:click="toggleNav">
                <ul class="list-reset lg:flex justify-end flex-1 items-center">
                    <li class="mr-3 flex">
                        <button class="btn-icon-link" v-on:click="goTo('Home')">
                            <img src="../assets/icons/home.svg" alt="pictogramme accueil" aria-hidden="true">
                            <span>Accueil</span>
                        </button>
                        <template v-if="!is_login">
                            <button class="btn-icon-link" v-on:click="goTo('Login')">
                                <img src="../assets/icons/badge.svg" alt="pictogramme connexion" aria-hidden="true">
                                <span>Connexion</span>
                            </button>
                            <button class="btn-icon-link" v-on:click="goTo('Register')">
                                <img src="../assets/icons/person.svg" alt="pictogramme inscription" aria-hidden="true">
                                <span>Inscription</span>
                            </button>
                        </template>
                        <template v-else>
                            <button v-on:click="goTo('Profile.me')">Mon profil</button>
                            <button v-on:click="logout">Déconnexion</button>
                        </template>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="relative">
            <div class="min-h-3/4 mx-auto bg-ym-black py-10 px-10">
                <router-view />
                <trackPlayer/>
            </div>
        </div>
        <div class="absolute bottom-0 h-20 flex items-center justify-between flex-wrap bg-ym-black p-6 w-full z-10">
            <p class="text-white">YziMusic</p>
            <p class="text-white">Allan Commelin</p>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import trackPlayer from '@/components/trackPlayer'

    export default {
        name: "Main",
        components: {
            trackPlayer
        },
        data () {
            return {
                navToggle: false
            }
        },
        computed: {
            ...mapState({
                user: state => state.User.user,
                is_login: state => state.User.is_login
            })
        },
        methods: {
            ...mapActions({
                logOutUser: 'User/logOutUser'
            }),
            toggleNav () {
                // Show or hidden mobile nav
                this.navToggle = !this.navToggle
            },
            goTo: function (name) {
                this.$router.push({name:name})
            },
            logout () {
                this.logOutUser()
            }
        }
    }
</script>

<style lang="scss">
    input[type='button'] {
        &:disabled {
            background-color: #a0aec0;
            color: #edf2f7;
        }
    }
</style>