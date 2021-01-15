import Vue from 'vue';
import VueRouter from 'vue-router';
import MainLayout from '@/layouts/Main.vue'
import defaultRoutes from '@/router/default';
import authRoutes from '@/router/auth';

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
            ]
        }
    ]
})

export default router;