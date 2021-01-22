import Vue from 'vue'
import store from '../store'

export default {
    // TODO adpate this
    verifyUser: async () => {
        const userId = localStorage.getItem('id-yzimusic')
        await Vue.prototype.$http.get(`http://127.0.0.1:8000/api/users/${userId}`)
            .then(response => {
                store.dispatch('user/loadUser', response.data)
                return Promise.resolve()
            }).catch((err) => {
                if (err.response.status === 401) store.dispatch('users/errorUser', 'Session expirée, veuillez-vous reconnecter')
                return Promise.reject()
            })
    }
}