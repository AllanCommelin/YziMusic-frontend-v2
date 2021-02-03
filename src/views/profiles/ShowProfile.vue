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
        <div class="mt-96 h-16 container">
            <p>Like</p>
        </div>
        <div class="flex justify-between flex-col lg:flex-row">
            <div class="infos py-2 px-8 bg-ym-black order-2 w-full lg:w-1/6 lg:order-1">
                <h2 class="text-main uppercase font-black italic text-2xl">Profil</h2>
                <div class="flex flex-row lg:flex-col">
                    <div class="w-1/2 lg:w-full">
                        <span class="italic font-thin text-sm text-white">Type(s)</span>
                        <div>
                            <span class="font-bold text-xl text-white">
                                test,
                            </span>
                            <span class="font-bold text-xl text-white">
                                test 2
                            </span>
                        </div>
                    </div>
                    <div class="w-1/2 lg:w-full">
                        <span class="italic font-thin text-sm text-white">Style(s)</span>
                        <div>
                            <span class="font-bold text-xl text-white">
                                test 3,
                            </span>
                            <span class="font-bold text-xl text-white">
                                test 4
                            </span>
                            <span class="font-bold text-xl text-white">
                                test 5
                            </span>
                        </div>
                    </div>
                </div>
                <h2 class="text-main uppercase font-black italic text-2xl">Infos</h2>
                <div class="flex flex-row lg:flex-col w-full flex-wrap">
                    <div class="w-2/5 lg:w-full">
                        <span class="italic font-thin text-sm text-white">Nom</span>
                        <div>
                            <span class="font-bold text-xl text-white">{{ user.lastname}}</span>
                        </div>
                    </div>
                    <div class="w-2/5 lg:w-full">
                        <span class="italic font-thin text-sm text-white">Prénom</span>
                        <div>
                            <span class="font-bold text-xl text-white">{{ user.firstname}}</span>
                        </div>
                    </div>
                    <div class="w-1/5 lg:w-full">
                        <span class="italic font-thin text-sm text-white">Âge</span>
                        <div>
                            <span class="font-bold text-xl text-white">Age</span>
                        </div>
                    </div>
                    <div class="w-1/2 lg:w-full">
                        <span class="italic font-thin text-sm text-white">Ville/Pays</span>
                        <div>
                            <span class="font-bold text-xl text-white">{{ user.location }}</span>
                        </div>
                    </div>
                    <div class="w-1/2 lg:w-full">
                        <span class="italic font-thin text-sm text-white">E-mail : </span>
                        <div>
                            <span v-if="showEmail" class="font-bold text-lg text-white">{{ user.email }}</span>
                            <button v-else v-on:click="displayEmail" class="uppercase text-sm italic font-bold w-auto btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-main hover:bg-main text-white font-normal py-2 px-4 rounded">Voir</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full order-1 py-2 px-8 bg-ym-black lg:w-3/6 lg:order-2">
                <h2 class="text-main uppercase font-black italic text-2xl">Description</h2>
                <p class="text-white text-lg font-thin">{{ user.description }}</p>
            </div>
            <div class="w-full order-3 py-2 px-8 bg-ym-black lg:w-1/6 lg:order-3">
                <h2 class="text-main uppercase font-black italic text-2xl">Réseaux sociaux</h2>
            </div>
            <div class="w-full order-3 py-2 px-8 bg-ym-black lg:w-1/6 lg:order-3">
                <h2 class="text-main uppercase font-black italic text-2xl">Streaming</h2>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'

    export default {
        name: "ShowProfile",
        data () {
            return {
                user: null,
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
                        this.user = res.data.data
                    })
                    .catch(() => {
                        //Todo: catch error
                    })
            },
            displayEmail: function () {
                // Show email of user
                this.showEmail = true
            }
        }
    }
</script>

<style scoped>

</style>