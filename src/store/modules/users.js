import Vue from 'vue'

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
        likes: 0,
        profilePicture: null,
        creationDate: null,
    },
    is_login: false,
    errorLogin: false,
    pendingUser: false,
}

const getters = {
    getUser: state => state.user,
    getIsLogin: state => state.is_login,
}

const mutations = {
    setUser (state, user) {
        state.user = user
    },
    setUserField (state, payload) {
      Object.keys(payload).forEach(field => {
          state.user[field] = payload[field]
      })
    },
    setError (state, error) {
        state.errorLogin = error ? error : 'Une erreur est survenue'
    },
    initError (state) {
        state.errorLogin = false
    },
    setIsLogInTrue (state) {
        state.is_login = true
    },
    setIsLogInFalse (state) {
        state.is_login = false
    },
    setPendingUserTrue (state) {
        state.pendingUser = true
    },
    setPendingUserFalse (state) {
        state.pendingUser = false
    }
}

const actions = {
    SET_USER_FIELD: ({commit}, payload) => {
        commit('setUserField', payload)
    },
    loadUser: function (store) {
        store.commit('setPendingUserTrue')
        Vue.prototype.$http.get('http://localhost:6985/auth/me')
            .then(res => {
                store.commit('setUserField', res.data.data)
                store.commit('setIsLogInTrue')
            })
            .catch(() => {})
        store.commit('setPendingUserFalse')
    },
    logInUser: function (store, {email, password}) {
        store.commit('initError')
        if(!store.state.pendingUser) {
            store.commit('setPendingUserTrue')
            Vue.prototype.$http.post('http://localhost:6985/auth/login', {
                email: email,
                password: password
            })
                .then(res => {
                    store.commit('setUserField', res.data.data.user)
                    store.commit('setIsLogInTrue')
                })
                .catch(() => {
                    store.dispatch('errorUser')
                })
            store.commit('setPendingUserFalse')
        }
    },
    logOutUser: function (store) {
        store.commit('setIsLogInFalse')
        store.commit('setUser', {})
    },
    registerUser: function (store) {
        store.commit('initError')
        store.commit('setUserField', {creationDate: new Date()})
        if (!store.state.pendingUser) {
            Vue.prototype.$http.post('http://localhost:6985/auth/register', store.state.user)
                .then(res => {
                    //TODO: redirect to login screen with alert sucess
                    console.log(`User ${res.data.user.username} is register . Go to login`)
                })
                .catch(() => {
                    store.dispatch('errorUser')
                })
            store.commit('setPendingUserFalse')
        }
    },
    errorUser (store, error = null) {
        store.commit('setError', error)
        setTimeout(function () {
            store.commit('initError')
        }, 300000)
    }
}

const user = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
export default user;
