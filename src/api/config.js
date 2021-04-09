import axios from 'axios'
import store from '../store'
import router from '../router'

const successHandler = (response) => {
    if(response.config.method !== 'get') {
        store.dispatch('Utils/snackTrue', {content: "Succès", type: "success", timeout: 2000})
    }
    return response
}

const errorHandler = (error) => {
    const errorValues = []
    console.log('err', error.response)
    switch (error.response.status) {
        case 401:
            store.dispatch('User/logOutUser')
            store.dispatch('Utils/snackTrue', {content: error.response.data.message, type: "error"})
            if (router.currentRoute.name !== 'Login') {
                router.push({name:'Login'})
            }
            break;
        default:
            store.dispatch('Utils/snackTrue', {content: "Une erreur est survenue avec le serveur !", type: "error"})
    }
    if(error.response.statusText) {
        Object.values(error.response.message).forEach(values => {
            values.forEach(value => {
                if(!errorValues.includes(value)) errorValues.push(value)
            })
        })
    }
    return Promise.reject({ ...error, errorsDisplay: errorValues })
}

const instance = axios.create({
    baseUrl: 'http://localhost:6985',
    withCredentials: true,
    headers: {'Content-Type': 'application/json'},
})

instance.interceptors.response.use(
    response => successHandler(response),
    error => errorHandler(error),
)

export default instance