<template>
    <div>
        <ul>
            <li v-for="track in tracks" v-bind:key="track.id">
                {{ track.name }}
            </li>
        </ul>
    </div>
</template>

<script>
    import Vue from "vue";

    export default {
        name: "TracksSettings",
        data () {
            return {
                tracks: [
                    {
                        "@context": "http://schema.org",
                        "@type": "AudioObject",
                        "_id": "603a57fd1f68139516a1df72",
                        "user_id": "60047effcdebf77e116fc7ab",
                        "name": "gyuki-drill-beat.mp3",
                        "contentType": "audio/mpeg",
                    },
                    {
                        "@context": "http://schema.org",
                        "@type": "AudioObject",
                        "_id": "603a57fd1f68139516a1df73",
                        "user_id": "60047effcdebf77e116fc7ab",
                        "name": "gyuki-trap-beat.mp3",
                        "contentType": "audio/mpeg",
                    }
                ]
            }
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
        }
    }
</script>

<style scoped>

</style>