<template>
    <div>
        <div class="absolute bg-center bg-cover flex items-center justify-center top-0 left-0 right-0 bg-gray-400 h-40 sm:h-72" v-bind:style="{ backgroundImage: 'url('+homeBanner+')' }">
            <div class="flex justify-center mx-6 lg:mx-auto w-full max-w-4xl">
                <label for="search" hidden>Recherche</label>
                <input v-model="search" id="search" v-on:keyup.enter="researchUsers" class="input --light --search" type="text" name="search" placeholder="Pseudo, nom, prénom">
                <button class="btn-search" v-on:click="researchUsers">
                    <img class="h-auto" src="../../assets/icons/searching.svg" alt="Icône loupe recherche">
                </button>
            </div>
        </div>
        <div class="mt-40 flex flex-wrap sm:mt-72 mb-16">
            <div class="w-full">
                <h2 class="relative text-left font-black uppercase italic text-5xl shadow-title title--outline mb-4">
                    Résultats
                </h2>
                <div class="scrollable-cards">
                    <template v-if="searchUsers && searchUsers.length > 0">
                        <div class="card-user" v-for="user in searchUsers" :key="user._id">
                            <UserCard :user="user" />
                        </div>
                    </template>
                    <template v-else>
                        <div class="flex justify-center">
                            <span class="text-white">Aucun résultat !</span>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserCard from "@/components/UserCard";
import Vue from "vue";

export default {
    name: "SearchProfile",
    components: {
        UserCard
    },
    data () {
        return {
            homeBanner: require('../../assets/images/home-banner.png'),
            search: null,
            searchUsers: []
        }
    },
    methods: {
        researchUsers: function () {
            // Call api to search users
            Vue.prototype.$http.get(`${process.env.VUE_APP_API_URL}/api/users/search?search=${this.search}`)
                .then(res => {
                    this.searchUsers = res.data.data
                })
                .catch(() => {
                    //Todo: catch error
                })
        }
    }
}
</script>

<style scoped>

</style>