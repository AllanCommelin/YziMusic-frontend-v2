
import Vue from 'vue'
import Vuex from 'vuex'
import User from './modules/users'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        User,
    }
})