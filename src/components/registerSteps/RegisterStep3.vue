<template>
    <div>
        <h2 class="text-3xl mb-6 font-bold text-white">Streaming et social</h2>
        <h2 class="text-3xl mb-6 font-bold text-white">Vos liens</h2>
        <h3 class="text-xl text-ym-blue font-bold mb-4">Réseaux sociaux</h3>
        <form class="flex flex-wrap text-ym-grey">
            <div class="grid gap-4 grid-cols-2 w-full">
                <label for="facebook">Facebook</label>
                <input v-model="facebookLink" class="input" id="facebook" name="facebookLink"/>
                <label for="twitter">Twitter</label>
                <input v-model="twitterLink" class="input" id="twitter" name="twitterLink"/>
                <label for="instagram">Instagram</label>
                <input v-model="instagramLink" class="input" id="instagram" name="instagramLink"/>
                <label for="youtube">Youtube</label>
                <input v-model="youtubeLink" class="input" id="youtube" name="youtubeLink"/>
            </div>
        </form>
        <h3 class="text-xl text-ym-blue font-bold my-4">Streaming</h3>
        <div class="flex flex-wrap text-ym-grey">
            <div class="grid gap-4 grid-cols-2 w-full">
                <label for="spotify">Spotify</label>
                <input v-model="spotifyLink" class="input" id="spotify" name="spotifyLink"/>
                <label for="deezer">Deezer</label>
                <input v-model="deezerLink" class="input" id="deezer" name="deezerLink"/>
                <label for="applemusic">Apple Music</label>
                <input v-model="appleMusicLink" class="input" id="applemusic" name="appleMusicLink"/>
                <label for="soundcloud">Soundcloud</label>
                <input v-model="soundcloudLink" class="input" id="soundcloud" name="soundcloudLink"/>
            </div>
        </div>
        <div class="mt-10 w-full flex justify-center">
            <button class="btn-yzi" v-on:click="previous()">Retour</button>
            <button class="btn-yzi" v-on:click="next()">Suivant</button>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: "RegisterStep3",
        data() {
            return {
               facebookLink: '',
               twitterLink: '',
               instagramLink: '',
               youtubeLink: '',
               spotifyLink: '',
               deezerLink: '',
               appleMusicLink: '',
               soundcloudLink: '',
            }
        },
        computed: {
            ...mapState({
                user: state => state.User.user
            }),
        },
        created () {
            /* Get data if it already on store (ex step 2 to 1)*/
            this.facebookLink = this.user.facebookLink ? this.user.facebookLink :''
            this.twitterLink = this.user.twitterLink ? this.user.twitterLink :''
            this.instagramLink = this.user.instagramLink ? this.user.instagramLink :''
            this.youtubeLink = this.user.youtubeLink ? this.user.youtubeLink :''
            this.spotifyLink = this.user.spotifyLink ? this.user.spotifyLink :''
            this.deezerLink = this.user.deezerLink ? this.user.deezerLink :''
            this.appleMusicLink = this.user.appleMusicLink ? this.user.appleMusicLink :''
            this.soundcloudLink = this.user.soundcloudLink ? this.user.soundcloudLink :''
        },
        methods: {
            next () {
                this.$store.dispatch('User/SET_USER_FIELD', {
                    facebookLink: this.facebookLink,
                    twitterLink: this.twitterLink,
                    instagramLink: this.instagramLink,
                    youtubeLink: this.youtubeLink,
                    spotifyLink: this.spotifyLink,
                    deezerLink: this.deezerLink,
                    appleMusicLink: this.appleMusicLink,
                    soundcloudLink: this.soundcloudLink,
                })
                this.$emit('increment')
            },
            previous() {
                this.$emit('decrement')
            },
        }
    }
</script>

<style scoped>

</style>