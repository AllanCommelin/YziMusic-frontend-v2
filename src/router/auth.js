import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'
// TMP POC
import ImageUpload from '@/components/imageUpload.vue'
import TrackUpload from '@/components/trackUpload.vue'

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
        path: '/auth/user/upload/picture',
        name: 'Upload.picture',
        component: ImageUpload
    },
    {
        path: '/auth/user/upload/track',
        name: 'Upload.track',
        component: TrackUpload
    }
]

export default authRoutes