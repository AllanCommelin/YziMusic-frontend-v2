import Vue from "vue";

const state = {
    tracks: [],
    playingTrack: null,
    play: false
}

const getters = {
    getTracks: state => state.tracks,
    getPlayingTrack: state => state.playingTrack,
}

const mutations = {
    SET_TRACKS (state, tracks) {
        state.tracks = tracks
        state.tracks.forEach(track => track.isCurrent = false)
    },
    SET_CURRENT_TRACK (state) {
        // Reset is Current
        state.tracks.forEach(track => track.isCurrent = false)
        // Search current playing tracks
        const currentTrackIdx = state.tracks.findIndex(track => track._id === state.playingTrack.track._id)
        state.tracks[currentTrackIdx].isCurrent = true;
    },
    SET_PLAY (state) {
        state.play = true
        // Play audio track
        state.playingTrack.audio.play()
    },
    SET_PAUSE (state) {
        state.play = false
        state.playingTrack.audio.pause()
    },
    RESET_PLAYING_TRACK (state) {
        state.play = false
        state.playingTrack = null
    },
    SET_PLAYING_TRACK (state, playingTrack) {
        // Get track by track id
        if (!state.playingTrack) {
            // If we haven't playingTrack
            state.playingTrack = {
                track: playingTrack,
                audio: new Audio('data:'+ playingTrack.contentType +';base64,'+playingTrack.audio),
            }
        } else {
            // If we have playingTrack
            state.playingTrack.track = playingTrack
            state.playingTrack.audio.src = 'data:'+ playingTrack.contentType +';base64,'+playingTrack.audio
        }
    }
}

const actions = {
    setTracks: ({commit}, payload) => {
        commit('SET_TRACKS', payload)
        if (state.playingTrack) commit('SET_CURRENT_TRACK')
    },
    setPlay: ({commit}) => {
        commit('SET_PLAY')
        commit('SET_CURRENT_TRACK')
    },
    setPause: ({commit}) => {
        commit('SET_PAUSE')
    },
    setCurrentTrack: ({commit}) => {
        commit('SET_CURRENT_TRACK')
    },
    playForward: (store) => {
       store.commit('SET_CURRENT_TRACK')
        let newCurrentTrack = null
        const currentTrackIdx = state.tracks.findIndex(track => track.isCurrent)
        if (currentTrackIdx - 1 < 0) {
            // If current track is the first track => get the last track
            newCurrentTrack = state.tracks[state.tracks.length - 1]
        } else {
            // Get forward track
            newCurrentTrack = state.tracks[currentTrackIdx - 1]
        }
        if (newCurrentTrack) {
            store.dispatch('setPlayingTrack', newCurrentTrack._id)
        }
    },
    playBackward: (store) => {
       store.commit('SET_CURRENT_TRACK')
        let newCurrentTrack = null
        const currentTrackIdx = state.tracks.findIndex(track => track.isCurrent)
        if (currentTrackIdx + 1 === state.tracks.length) {
            // If current track is the last track => get the first track
            newCurrentTrack = state.tracks[0]
        } else {
            // Get next track
            newCurrentTrack = state.tracks[currentTrackIdx + 1]
        }
        if (newCurrentTrack) {
            store.dispatch('setPlayingTrack', newCurrentTrack._id)
        }
    },
    resetPlayingTrack: ({commit}) => {
        commit('RESET_PLAYING_TRACK')
    },
    setPlayingTrack: ({commit}, trackId) => {
        Vue.prototype.$http.get('http://localhost:6985/api/tracks/'+trackId)
            .then(res => {
                commit('SET_PLAYING_TRACK', res.data.data)
                commit('SET_CURRENT_TRACK')
                commit('SET_PLAY')
            })
            .catch(() => {
                //Todo: catch error
            })

    }
}

const tracks = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
export default tracks;