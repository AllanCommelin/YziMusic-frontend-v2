import Vue from 'vue'
import router from "@/router";

const state = {
    user: {
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        password: '',
        profilesTypes: [],
        musicsTypes: [],
        description: '',
        location: '',
        birthday: '',
        facebookLink: '',
        twitterLink: '',
        instagramLink: '',
        youtubeLink: '',
        spotifyLink: '',
        deezerLink: '',
        appleMusicLink: '',
        soundcloudLink: '',
        banished: false,
        likes: [],
        profilePicture: null,
        creationDate: null,
        role: ''
    },
    is_login: false,
    pendingUser: false,
}

const getters = {
    getUser: state => state.user,
    getIsLogin: state => state.is_login,
}

const mutations = {
    SET_USER (state, user) {
        state.user = user
    },
    SET_USER_FIELD (state, payload) {
      Object.keys(payload).forEach(field => {
          state.user[field] = payload[field]
      })
    },
    SET_USER_TRACK (state, payload) {
        state.user.tracks.push(payload)
    },
    SET_IS_LOG_IN_TRUE (state) {
        state.is_login = true
        localStorage.setItem(process.env.VUE_APP_AUTH_USER, true)
    },
    SET_IS_LOG_IN_FALSE (state) {
        state.is_login = false
        localStorage.removeItem(process.env.VUE_APP_AUTH_USER)
    },
    SET_PENDING_USER_TRUE (state) {
        state.pendingUser = true
    },
    SET_PENDING_USER_FALSE (state) {
        state.pendingUser = false
    }
}

const actions = {
    setUserField: ({commit}, payload) => {
        commit('SET_USER_FIELD', payload)
    },
    setUserTrack: ({commit}, payload) => {
        commit('SET_USER_TRACK', payload)
    },
    loadUser: function (store) {
        store.commit('SET_PENDING_USER_TRUE')
        Vue.prototype.$http.get('http://localhost:6985/auth/me')
            .then(res => {
                store.commit('SET_USER_FIELD', res.data.data)
                store.commit('SET_IS_LOG_IN_TRUE')
            })
        store.commit('SET_PENDING_USER_FALSE')
    },
    logInUser: function (store, {email, password}) {
        store.commit('INIT_ERROR')
        if(!store.state.pendingUser) {
            store.commit('SET_PENDING_USER_TRUE')
            Vue.prototype.$http.post('http://localhost:6985/auth/login', {
                email: email,
                password: password
            }).then(res => {
                    store.commit('SET_USER_FIELD', res.data.data.user)
                    store.commit('SET_IS_LOG_IN_TRUE')
                })
            store.commit('SET_PENDING_USER_FALSE')
        }
    },
    logOutUser: function (store) {
        store.commit('SET_IS_LOG_IN_FALSE')
        store.commit('SET_USER', {})
    },
    registerUser: function (store) {
        store.commit('INIT_ERROR')
        store.commit('SET_USER_FIELD', {creationDate: new Date()})
        store.commit('SET_USER_FIELD', {likes: []})
        store.commit('SET_USER_FIELD', {profilePicture: null})
        store.commit('SET_USER_FIELD', {banished: false})
        store.commit('SET_USER_FIELD', {role: 'user'})
        if (!store.state.pendingUser) {
            Vue.prototype.$http.post('http://localhost:6985/auth/register', store.state.user).catch(() => {
                router.push({name:'Home'})
            })
            store.commit('SET_PENDING_USER_FALSE')
        }
    },
}

const user = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
export default user;
