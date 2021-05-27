<template>
    <div v-if="playingTrack" class="fixed bottom-0 left-0 right-0 flex-col items-center px-4 py-2 bg-main z-50">
        <div class="absolute top-0 right-0 p-1 cursor-pointer text-white" v-on:click="toReset">x</div>
        <div class="flex justify-center items-center text-white text-sm">
            <span class="font-bold">{{ playingTrack.track.name }} </span> - {{ playingTrack.track.user.username }}
        </div>
        <div class="flex justify-center items-center my-1">
            <button v-on:click="toPlayForward" class="mx-1 border-1 border-white hover:text-white hover:text-white text-white font-bold rounded-full flex justify-center items-center h-6 w-6">
                <i class="fas fa-backward icons-player"></i>
            </button>
            <button v-on:click="toPause" v-if="play" class="mx-1 border-1 text-white hover:text-white hover:text-white text-white font-bold rounded-full flex justify-center items-center h-6 w-6">
                <i class="fas fa-pause icons-player"></i>
            </button>
            <button v-on:click="toPlay" v-else class="mx-1 border-1 text-white hover:text-white hover:text-white text-white font-bold rounded-full flex justify-center items-center h-6 w-6">
                <i class="fas fa-play icons-player"></i>
            </button>
            <button v-on:click="toPlayBackward" class="mx-1 border-1 botext-white hover:text-white hover:text-white text-white font-bold rounded-full flex justify-center items-center h-6 w-6">
                <i class="fas fa-forward icons-player"></i>
            </button>
        </div>
        <div>
            <div class="progress" ref="progress">
                <div class="progress__top">
                    <div class="progress__time text-white font-500 text-sm">{{ currentTime }}</div>
                    <div class="progress__duration text-white font-bold text-sm">{{ duration }}</div>
                </div>
                <div class="progress__bar" @click="clickProgress">
                    <div class="progress__current bg-ym-blue" :style="{ width : barWidth }"></div>
                </div>
            </div>
            <div v-cloak></div>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex";
export default {
    name: "trackPlayer",
    data () {
        return {
            circleLeft: null,
            barWidth: null,
            duration: null,
            currentTime: null,
        }
    },
    watch: {
        play: function () {
            if (this.play) {
                let vm = this
                this.playingTrack.audio.ontimeupdate = function() {
                    vm.generateTime();
                };
                this.playingTrack.audio.onloadedmetadata = function() {
                    vm.generateTime();
                };
            }
        }
    },
    computed: {
        ...mapState({
            tracks: state => state.Tracks.tracks,
            playingTrack: state => state.Tracks.playingTrack,
            play: state => state.Tracks.play,
        }),
    },
    methods: {
        toReset: function () {
            this.toPause()
            this.$store.dispatch('Tracks/resetPlayingTrack')
        },
        toPause: function () {
            this.$store.dispatch('Tracks/setPause')
        },
        toPlay: function () {
            this.$store.dispatch('Tracks/setPlay')
        },
        toPlayForward: function () {
            this.$store.dispatch('Tracks/playForward')
        },
        toPlayBackward: function () {
            this.$store.dispatch('Tracks/playBackward')
        },
        generateTime: function () {
            // Get width of progress bar
            let width = (100 / this.playingTrack.audio.duration) * this.playingTrack.audio.currentTime;
            this.barWidth = width + "%";
            this.circleLeft = width + "%";
            //  Get minutes and second of duration time
            let durmin = Math.floor(this.playingTrack.audio.duration / 60);
            let dursec = Math.floor(this.playingTrack.audio.duration - durmin * 60);
            //  Get minutes and second of current time
            let curmin = Math.floor(this.playingTrack.audio.currentTime / 60);
            let cursec = Math.floor(this.playingTrack.audio.currentTime - curmin * 60);
            if (durmin < 10) durmin = "0" + durmin;
            if (dursec < 10) dursec = "0" + dursec;
            if (curmin < 10) curmin = "0" + curmin;
            if (cursec < 10) cursec = "0" + cursec;
            this.duration = durmin + ":" + dursec;
            this.currentTime = curmin + ":" + cursec;
        },
        updateBar(x) {
            let progress = this.$refs.progress;
            let maxDuration = this.playingTrack.audio.duration;
            let position = x - progress.offsetLeft;
            let percentage = (100 * position) / progress.offsetWidth;
            if (percentage > 100) {
                percentage = 100;
            }
            if (percentage < 0) {
                percentage = 0;
            }
            this.barWidth = percentage + "%";
            this.circleLeft = percentage + "%";
            this.playingTrack.audio.currentTime = (maxDuration * percentage) / 100;
            this.toPlay()
        },
        clickProgress(e) {
            this.toPause()
            this.updateBar(e.pageX);
        },
    }
}
</script>

<style lang="scss" scoped>
[v-cloak] {
    display: none;
}
[v-cloak] > * {
    display: none;
}
.progress {
    width: 100%;
    margin-top: -15px;
    user-select: none;
    &__top {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
    }
    &__duration {
        opacity: 0.8;
    }
    &__time {
        margin-top: 2px;
        opacity: 0.8;
    }
}
.progress__bar {
    height: 6px;
    width: 100%;
    cursor: pointer;
    background-color: #d0d8e6;
    display: inline-block;
    border-radius: 10px;
}
.progress__current {
    height: inherit;
    width: 0%;
    border-radius: 10px;
}
.album-info {
    color: #71829e;
    flex: 1;
    padding-right: 60px;
    user-select: none;
    @media screen and (max-width: 576px), (max-height: 500px)  {
        padding-right: 30px;
    }
    &__name {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 12px;
        line-height: 1.3em;
        @media screen and (max-width: 576px), (max-height: 500px) {
            font-size: 18px;
            margin-bottom: 9px;
        }
    }
    &__track {
        font-weight: 400;
        font-size: 20px;
        opacity: 0.7;
        line-height: 1.3em;
        min-height: 52px;
        @media screen and (max-width: 576px), (max-height: 500px)  {
            font-size: 18px;
            min-height: 50px;
        }
    }
}
.icons-player {
    font-size: .5rem;
}

.button:focus {
    outline: none;
}
</style>