import vuex from 'vuex'
import auth from '@/modules/auth/store'
import property from '@/modules/properties/store'

export default new vuex.Store({
    modules: {
        auth,
        property
    },
})
