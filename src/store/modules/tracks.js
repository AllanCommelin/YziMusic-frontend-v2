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
    },
    SET_PLAY (state) {
        state.play = true
        state.playingTrack.audio.play()
    },
    SET_PAUSE (state) {
        state.play = false
        state.playingTrack.audio.pause()
    },
    SET_PLAYING_TRACK (state, playingTrack) {
        state.playingTrack = {
            track: playingTrack,
            audio: new Audio('data:'+ playingTrack.contentType +';base64,'+playingTrack.audio),
        }
    }
}

const actions = {
    setTracks: ({commit}, payload) => {
        commit('SET_TRACKS', payload)
    },
    setPlay: ({commit}) => {
        commit('SET_PLAY')
    },
    setPause: ({commit}) => {
        commit('SET_PAUSE')
    },
    setPlayingTrack: ({commit}, payload) => {
        commit('SET_PLAYING_TRACK', payload)
        commit('SET_PLAY')
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
