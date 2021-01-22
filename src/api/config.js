import axios from 'axios'

const instance = axios.create({
    baseUrl: 'http://localhost:6985',
})

instance.interceptors.request.use(function (config) {
    //todo: Get name of token in .Env
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default instance