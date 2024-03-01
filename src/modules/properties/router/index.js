import store from '@/store'

const Property = () => import('../views/Property.vue')
const Properties = () => import('../views/Properties.vue')
const PropertiesForm = () => import('../views/PropertiesForm.vue')

function canEditProperty(route) {
    const propertyId = route.params.id;
    const user = store.getters['user'];

    return store.dispatch('getProperty', propertyId).then(property => {
        if (property.user_id !== user.id) {
            return { path: '/properties', query: { permission: 'denied' } };
        }
    }).catch(error => {
        console.error('Erro ao buscar imóvel:', error);
        return { path: '/properties', query: { error: 'getProperty' } };
    });
}

export default [
    {
        path: '',
        component: () => import('@/templates/Dashboard.vue'),
        children: [
            {
                path: '/properties',
                name: 'properties',
                component: Properties,
            },
            {
                path: '/properties/add',
                name: 'propertiesAdd',
                component: PropertiesForm,
                meta: { requiresAuth: true }
            },
            {
                path: '/properties/:id',
                name: 'propertiesEdit',
                component: PropertiesForm,
                beforeEnter: (to, from) => canEditProperty(to).then(redirectObj => {
                    if (redirectObj) {
                        return { path: redirectObj.path, query: redirectObj.query };
                    }
                }),
                meta: { requiresAuth: true }
            },
            {
                path: '/property/:id',
                name: 'propertiesShow',
                component: Property,
            },
        ],
    },
]
