<template>
    <div>
        <ul>
            <template v-if="tracks.length > 0">
            <li v-for="track in tracks" v-bind:key="track.id"
                class="px-4 py-2 bg-white font-bold text-black rounded my-4 flex items-center justify-between">
                <span>{{ track.name | capitalize }}</span>
                <div class="text-lg">
                    <button v-on:click="deleteTrack(track._id)" class="bg-main hover:bg-main-light text-gray-800 font-bold p-3 rounded inline-flex items-center mr-4">
                        <i class="far fa-trash-alt text-white"></i>
                    </button>
                    <button class="bg-main hover:bg-main-light text-gray-800 font-bold p-3 rounded inline-flex items-center mr-4">
                        <i class="fas fa-play text-white"></i>
                    </button>
                </div>
            </li>
            </template>
            <template v-else>
                <span>Aucun projet pour le moment !</span>
            </template>
        </ul>
    </div>
</template>

<script>
    import Vue from "vue";

    export default {
        name: "TracksSettings",
        data () {
            return {
                tracks: []
            }
        },
        filters: {
            capitalize: function (value) {
                if (!value) return ''
                value = value.toString()
                return value.charAt(0).toUpperCase() + value.slice(1)
            }
        },
        mounted() {
            this.getTracksOfUser()
        },
        methods: {
            getTracksOfUser: function () {
                // Call api to get all tracks of auth user
                Vue.prototype.$http.get('http://localhost:6985/api/tracks')
                    .then(res => {
                        this.tracks = res.data.data
                    })
                    .catch(() => {
                        //Todo: catch error
                    })
            },
            deleteTrack: function (id) {
                // Call api to delete track by id for auth user
                Vue.prototype.$http.delete('http://localhost:6985/api/tracks/'+id)
                    .then(res => {
                        console.log(res)
                        //Todo: Sucess alert
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