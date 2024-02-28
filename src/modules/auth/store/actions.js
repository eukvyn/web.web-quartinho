import authService from '../service/auth-service'

export default {
    async register({ commit }, user) {
        try {
            const response = await authService.register(user)
            if (response.data && response.data.token) {
                // axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
                commit('setUser', response.data.user)
                commit('setToken', response.data.token)
            }
        } catch (error) {
            console.error('Error during register:', error)
            throw error
        }
    },
    async login({ commit }, user) {
        try {
            const response = await authService.login(user)
            if (response.data && response.data.token) {
                // axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
                commit('setUser', response.data.user)
                commit('setToken', response.data.token)
            }
        } catch (error) {
            console.error('Error during login:', error)
            throw error
        }
    },
    logout({ commit }) {
        commit('logout')
    },
}
