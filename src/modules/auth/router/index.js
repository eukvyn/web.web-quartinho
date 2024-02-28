const Login = () => import('./../views/Login.vue')
const Register = () => import('./../views/Register.vue')

export default [
    {
        path: '',
        children: [
            {
                path: '/login',
                name: 'login',
                component: Login,
            },
            {
                path: '/register',
                name: 'register',
                component: Register,
            },
        ],
    },
]
