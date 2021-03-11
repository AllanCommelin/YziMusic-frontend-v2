<template>
    <div class="flex flex-wrap justify-between text-ym-grey">
        <div class="sm:w-1/2 w-full sm:pr-2 text-left my-2">
            <label for="spotify">Spotify</label>
            <input v-model="spotifyLink" class="input" id="spotify" name="spotifyLink"/>
        </div>
        <div class="sm:w-1/2 w-full sm:pl-2 text-left my-2">
            <label for="deezer">Deezer</label>
            <input v-model="deezerLink" class="input" id="deezer" name="deezerLink"/>
        </div>
        <div class="sm:w-1/2 w-full sm:pr-2 text-left my-2">
            <label for="applemusic">Apple Music</label>
            <input v-model="appleMusicLink" class="input" id="applemusic" name="appleMusicLink"/>
        </div>
        <div class="sm:w-1/2 w-full sm:pl-2 text-left my-2">
            <label for="soundcloud">Soundcloud</label>
            <input v-model="soundcloudLink" class="input" id="soundcloud" name="soundcloudLink"/>
        </div>
        <div class="mt-10 mb-16 w-full flex justify-center">
            <button class="btn-yzi" v-on:click="updateUser">Sauvegarder</button>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import Vue from "vue";

    export default {
        name: "StreamingSettings",
        data () {
            return {
                spotifyLink: null,
                deezerLink: null,
                appleMusicLink: null,
                soundcloudLink: null,
            }
        },
        computed: {
            ...mapState({
                user: state => state.User.user
            }),
        },
        mounted() {
            this.spotifyLink = this.user.spotifyLink,
            this.deezerLink = this.user.deezerLink,
            this.appleMusicLink = this.user.appleMusicLink,
            this.soundcloudLink = this.user.soundcloudLink

        },
        methods: {
            updateUser: function () {
                let updateData = {
                    spotifyLink: this.spotifyLink,
                    deezerLink: this.deezerLink,
                    appleMusicLink: this.appleMusicLink,
                    soundcloudLink: this.soundcloudLink,
                }
                // TODO: Put this function in user's module
                Vue.prototype.$http.put('http://localhost:6985/api/users/' + this.user._id, updateData)
                    .then(res => {
                        console.log('Update success', res)
                        //todo: Display Alert success
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