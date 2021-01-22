import Vue from 'vue'
//import userApi from '@/api/user'

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
    loadUser: function (store, user) {
        store.commit('setUser', user)
        store.commit('setIsLogInTrue')
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
                    //TODO: set data and redirect to home screen
                    console.log(`User ${res.data.user.username} is register. Go to home`)
                })
                .catch(() => {
                    store.dispatch('errorUser')
                })
            store.commit('setPendingUserFalse')
        }
    },
    logOutUser: function (store) {
        localStorage.removeItem('token')
        store.commit('setUser', {})
        store.commit('setIsLogInFalse')
    },
    registerUser: function (store) {
        store.commit('initError')
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
        }, 3000)
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
