import { createRouter, createWebHistory } from 'vue-router'
import AuthRoutes from '../modules/auth/router/index.js'
import PropertiesRoutes from '../modules/properties/router/index.js'

const NotFound = () => import('../components/errors/NotFound.vue')

const routes = [
    { path: '', redirect: '/properties' },
    ...AuthRoutes,
    ...PropertiesRoutes,
    { path: '/:pathMatch(.*)*', name: 'notFound', component: NotFound },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
