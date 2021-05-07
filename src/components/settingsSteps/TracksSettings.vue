<template>
    <div>
        <modalUploadTrack v-show="showModalUploadTrack" @close="showModalUploadTrack = false"/>
        <button v-on:click="showModalUploadTrack = true" class="block mx-auto my-6 bg-main text-white px-6 py-4 rounded font-semibold hover:bg-main-light">
            Ajouter un projet musical
            <i class="fas fa-upload"></i>
        </button>
        <ul>
            <template v-if="tracks.length > 0">
            <li v-for="track in tracks" v-bind:key="track.id"
                class="px-4 py-2 bg-white font-bold text-black rounded my-4 flex items-center justify-between">
                <span>{{ track.name | capitalize }}</span>
                <div class="text-lg">
                    <button v-on:click="deleteTrack(track._id)" class="bg-main hover:bg-main-light text-gray-800 font-bold p-3 rounded inline-flex items-center mr-4">
                        <i class="far fa-trash-alt text-white"></i>
                    </button>
                    <button v-if="play && playingTrack.track._id === track._id" @click="pauseTrack" class="bg-main hover:bg-main-light text-gray-800 font-bold p-3 rounded inline-flex items-center mr-4">
                        <i class="fas fa-pause text-white"></i>
                    </button>
                    <button v-else-if="!play && playingTrack && playingTrack.track._id === track._id" @click="playTrack()" class="bg-main hover:bg-main-light text-gray-800 font-bold p-3 rounded inline-flex items-center mr-4">
                        <i class="fas fa-play text-white"></i>
                    </button>
                    <button v-else @click="playTrack(track._id)" class="bg-main hover:bg-main-light text-gray-800 font-bold p-3 rounded inline-flex items-center mr-4">
                        <i class="fas fa-play text-white"></i>
                    </button>
                </div>
            </li>
            </template>
            <template v-else>
                <li class="px-4 py-2 bg-white font-bold text-black rounded my-4 flex items-center justify-between">
                    <span>Aucun projet pour le moment !</span>
                </li>
            </template>
        </ul>
    </div>
</template>

<script>
    import Vue from "vue";
    import modalUploadTrack from "@/components/upload/modalUploadTrack";
    import {mapState} from "vuex";

    export default {
        name: "TracksSettings",
        components: {
            modalUploadTrack
        },
        data () {
            return {
                tracks: [],
                showModalUploadTrack: false
            }
        },
        computed: {
            ...mapState({
                user: state => state.User.user,
                playingTrack: state => state.Tracks.playingTrack,
                play: state => state.Tracks.play,
            })
        },
        filters: {
            capitalize: function (value) {
                if (!value) return ''
                value = value.toString()
                return value.charAt(0).toUpperCase() + value.slice(1)
            }
        },
        mounted() {
            this.tracks = this.user.tracks
        },
        methods: {
            playTrack: async function (trackId = null) {
                await this.$store.dispatch('Tracks/setTracks', {tracks: this.tracks, trackId: trackId}).then(() => {
                    if (trackId) {
                        // If we haven't already playing track
                        // Set playing track
                        this.$store.dispatch('Tracks/setPlayingTrack', trackId)

                    } else {
                        // We have track, set play
                        this.$store.dispatch('Tracks/setPlay')
                    }
                })
            },
            pauseTrack: function () {
                this.$store.dispatch('Tracks/setPause')
            },
            deleteTrack: function (id) {
                // Call api to delete track by id for auth user
                Vue.prototype.$http.delete(process.env.VUE_APP_API_URL+'/api/tracks/'+id)
                    .then(() => {
                        // Delete track by id of local tracks
                        this.tracks.splice(this.tracks.findIndex(track => track._id === id), 1);
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