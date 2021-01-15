import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'

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
]

export default authRoutes