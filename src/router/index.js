import Vue from 'vue';
/*import store from '@/store'*/
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

/*router.beforeEach(async (to, from, next) => {
    // Si la route nécessite d'être login
    if (to.matched.some(route => route.meta.requiresAuth)) {
        // Si déjà login et set dans le store
        if (store.state.User.is_login) {
            return next()
        } else {
            // Si il y a un token dans le localStorage mais que le user n'est pas dans le store
            try {
                await store.dispatch('User/loadUser')
                    .then(() => {
                        next()
                    }).catch(() => {
                        next('/login')
                    })
            } catch (e) {
                return next('/login')
            }
        }
        // Si la route ne nécessite pas d'être login, mais qu'il y a un token dans le localStorage
    } else {
        if (store.state.User.is_login) {
            return next()
        } else {
            await store.dispatch('User/loadUser')
        }
        return next()
    }
})*/

export default router;