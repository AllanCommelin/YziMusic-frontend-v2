import axios from 'axios'
import store from '../store'
import router from '../router'

const successHandler = (response) => {
    return response
}

const errorHandler = (error) => {
    const errorValues = []
    switch (error.response.status) {
        case 401:
            store.dispatch('User/logOutUser')
            if (router.currentRoute.name !== 'Login') {
                router.push({name:'Login'})
            }
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