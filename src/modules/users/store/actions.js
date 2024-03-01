import userService from '../service/user-service'

export default {
    async userEdit({ commit }, user) {
        try {
            const response = await userService.edit(user)
            if (response.data) {
                commit('setUser', response.data)
            }
        } catch (error) {
            console.error('Error during user edit:', error)
            throw error
        }
    },

    async getUserProperties({ commit }, payload = { filter: '' }) {
        try {
            const response = await userService.getUserProperties(payload.filter)
            if (response.data) {
                commit('setUserProperties', response.data)
            }
        } catch (error) {
            console.error('Error during get user properties:', error)
            throw error
        }
    },

    async getUserComments({ commit }, payload = { filter: '' }) {
        try {
            const response = await userService.getUserComments(payload.filter)
            if (response.data) {
                commit('setUserComments', response.data)
            }
        } catch (error) {
            console.error('Error during get user comments:', error)
            throw error
        }
    },
}
