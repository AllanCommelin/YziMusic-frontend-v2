import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'
// TMP POC
import Upload from '@/components/imageUpload.vue'

const authRoutes = [
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    // TMP ROUTE FOR POC
    {
        path: '/auth/user/upload',
        name: 'upload',
        component: Upload
    },
]

export default authRoutes