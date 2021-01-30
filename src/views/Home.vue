<template>
    <div>
        <div class="absolute bg-center bg-cover flex items-center justify-center top-0 left-0 right-0 bg-gray-400 h-40 sm:h-72" v-bind:style="{ backgroundImage: 'url('+homeBanner+')' }">
            <span class="font-black text-6xl text-white">YziMusic</span>
        </div>
        <div class="mt-40 flex flex-wrap sm:mt-72 mb-16">
            <h2 class="text-left font-black text-main text-3xl">Populaires</h2>
            <div class="scrollable-cards">
                <div class="card-user" v-for="user in mostLikedUsers" :key="user._id">
                    <UserCard :user="user" />
                </div>
            </div>
            <h2 class="text-left font-black text-main text-3xl">Nouveaux</h2>
            <div class="scrollable-cards">
                <div class="card-user" v-for="user in mostRecentUsers" :key="user._id">
                    <UserCard :user="user" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapState } from 'vuex'
    import UserCard from '../components/UserCard'

    export default {
        name: "Home",
        components: {
            UserCard
        },
        data () {
            return {
                homeBanner: require('../assets/images/home-banner.png'),
                mostLikedUsers: [],
                mostRecentUsers: []
            }
        },
        computed: {
            ...mapState({
                user: state => state.User.user,
                is_login: state => state.User.is_login
            })
        },
        mounted () {
            this.getMostLikedUsers()
            this.getMostRecentUsers()
        },
        methods: {
            getMostRecentUsers: function () {
                // Call api to get 10 most recent users
                Vue.prototype.$http.get('http://localhost:6985/api/users/most/recent')
                    .then(res => {
                        this.mostRecentUsers = res.data.data
                    })
                    .catch(() => {
                        //Todo: catch error
                    })
            },
            getMostLikedUsers: function () {
                // Call api to get 10 most liked users
                Vue.prototype.$http.get('http://localhost:6985/api/users/most/liked')
                    .then(res => {
                        this.mostLikedUsers = res.data.data
                    })
                    .catch(() => {
                        //Todo: catch error
                    })
            }
        }
    }
    </script>

<style lang="scss" scoped>
    .scrollable-cards {
        margin-left: -2.5rem;
        margin-right: -2.5rem;
        overflow-x: scroll;
        overflow-y: hidden;
        white-space: nowrap;

        .card-user {
            display: inline-block;
            padding: 0 1rem;
            &:first-of-type {
                padding-left: 2.5rem;
            }
            &:last-of-type {
                padding-right: 2.5rem;
            }
        }
    }
</style>