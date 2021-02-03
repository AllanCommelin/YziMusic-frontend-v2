import Vue from 'vue';
import VueRouter from 'vue-router';
import MainLayout from '@/layouts/Main.vue'
import defaultRoutes from '@/router/default';
import authRoutes from '@/router/auth';
import profilesRoutes from '@/router/profiles';

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes: [
        {
            component: MainLayout,
            path: '',
            children: [
                ...defaultRoutes,
                ...authRoutes,
                ...profilesRoutes,
            ]
        }
    ]
})

export default router;