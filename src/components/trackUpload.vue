<template>
<!-- POC-->
    <div>
        <span>Track upload</span>
        <input type="file" v-on:change="onFileChange">
        <button v-on:click="onUploadFile" :disabled="!selectedTrack">Upload</button>
        <div>
            Mes tracks :
            <ul>
                <li v-for="track in tracks" v-bind:key="track._id" v-on:click="getTrack(track._id)">
                    {{ track.name }}
                </li>
            </ul>
        </div>
        <div>
            <h2>Lecteur</h2>
            <audio
                v-if="track"
                controls
                :src="formatTrack">
                Your browser does not support the
                <code>audio</code> element.
            </audio>
        </div>
        <div class="test">
            <button v-on:click="play">LECTEUR</button>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex";
import Vue from "vue";

export default {
    name: "trackUpload",
    data () {
        return {
            selectedTrack: "",
            tracks: [],
            track: null,
            audio: null
        }
    },
    computed: {
        ...mapState({
            authUser: state => state.User.user,
            is_login: state => state.User.is_login
        }),
        formatTrack: function () {
            return this.track ?
                'data:'+ this.track.contentType +';base64,'+this.track.audio
                : ''
        },
    },
    mounted () {
        this.getTracksOfUser()
    },
    methods: {
        play: function () {
            this.audio.play()
        },
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
        getTrack: function (trackId) {
            Vue.prototype.$http.get('http://localhost:6985/api/tracks/'+trackId)
                .then(res => {
                    this.track = res.data.data
                    this.audio = new Audio(this.formatTrack)
                })
                .catch(() => {
                    //Todo: catch error
                })
        },
        onFileChange(e) {
            const selectedFile = e.target.files[0]; // accessing file
            this.selectedTrack = selectedFile;
        },
        onUploadFile() {
            const formData = new FormData();
            formData.append("track", this.selectedTrack);  // appending file

            // sending file to the backend
            Vue.prototype.$http.post('http://localhost:6985/api/tracks/upload/', formData)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
}
</script>

<style scoped>

</style>