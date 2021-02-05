import axios from 'axios'

const instance = axios.create({
    baseUrl: 'http://localhost:6985',
})

export default instance