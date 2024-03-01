const UserProfile = () => import('../views/UserProfile.vue')
const UserProperties = () => import('../views/UserProperties.vue')
const UserComments = () => import('../views/UserComments.vue')

export default [
    {
        path: '',
        component: () => import('@/templates/Dashboard.vue'),
        meta: { requiresAuth: true },
        children: [
            {
                path: '/user/profile',
                name: 'userProfile',
                component: UserProfile,
            },
            {
                path: '/user/properties',
                name: 'userProperties',
                component: UserProperties,
            },
            {
                path: '/user/comments',
                name: 'userComments',
                component: UserComments,
            },
        ],
    },
]
