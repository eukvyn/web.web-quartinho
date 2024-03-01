import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import PropertiesRoutes from '../modules/properties/router/index.js'
import UsersRoutes from '../modules/users/router/index.js'

const NotFound = () => import('../components/errors/NotFound.vue')

const routes = [
    { path: '', redirect: '/properties' },
    ...UsersRoutes,
    ...PropertiesRoutes,
    { path: '/:pathMatch(.*)*', name: 'notFound', component: NotFound },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const isAuthenticated = !!store.state.auth.token
    if (requiresAuth && !isAuthenticated) {
        next({ name: 'properties', query: { redirect: to.fullPath, loginModal: 'open' } })
    } else {
        next()
    }
})

export default router
