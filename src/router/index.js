import Vue from 'vue';
import store from '@/store'
import VueRouter from 'vue-router';
import MainLayout from '@/layouts/Main.vue'
import defaultRoutes from '@/router/default';
import authRoutes from '@/router/auth';
import profilesRoutes from '@/router/profiles';
import adminRoutes from "@/router/admin";

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes: [
        {
            component: MainLayout,
            path: '',
            meta: {
                title: 'YziMusic',
            },
            children: [
                ...defaultRoutes,
                ...authRoutes,
                ...adminRoutes,
                ...profilesRoutes,
            ]
        }
    ],
    scrollBehavior () {
        return { x: 0, y: 0 }
    }
})

router.beforeEach(async (to, from, next) => {
    // Check if user has Api Token
    let hasApiToken = localStorage.getItem(process.env.VUE_APP_AUTH_USER)
    // If the route requires authentication
    if (to.matched.some(route => route.meta.requiresAuth)) {
        // If user is already log
        if (store.state.User.is_login) {
            return next()
        } else if (hasApiToken) {
            // If there is a token in the Cookies but the user is not in the Store
            await store.dispatch('User/loadUser')
                .then(() => {
                    next()
                }).catch(() => {
                    next('/login')
                })
        }
        return next('/login')
    } else { // If the route does not require a login, but there is a token in Cookies
        if (store.getters['User/getIsLogin']) {
            return next()
        } else if(hasApiToken) {
            await store.dispatch('User/loadUser')
        }
        return next()
    }
})

export default router;