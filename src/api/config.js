import axios from 'axios'

const instance = axios.create({
    baseUrl: 'http://localhost:6985',
    withCredentials: true,
    headers: {'Content-Type': 'application/json'},
})

export default instance