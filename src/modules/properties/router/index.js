const Property = () => import('../views/Property.vue')
const Properties = () => import('../views/Properties.vue')
const PropertiesForm = () => import('../views/PropertiesForm.vue')

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
            },
            {
                path: '/properties/:id',
                name: 'propertiesEdit',
                component: PropertiesForm,
            },
            {
                path: '/property/:id',
                name: 'propertiesShow',
                component: Property,
            },
        ],
    },
]
