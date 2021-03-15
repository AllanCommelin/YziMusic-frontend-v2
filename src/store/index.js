
import Vue from 'vue'
import Vuex from 'vuex'
import User from './modules/users'
import Tracks from './modules/tracks'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        User,
        Tracks
    }
})