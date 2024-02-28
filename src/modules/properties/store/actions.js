import propertyService from '../service/property-service'

export default {
    async addProperty({ commit }, property) {
        try {
            const response = await propertyService.add(property)
            if (response.data) {
                commit('setProperty', response.data)
                return response.data
            }
        } catch (error) {
            console.error('Error during add property:', error)
            throw error
        }
    },

    async editProperty({ commit }, { property, id }) {
        try {
            const response = await propertyService.edit(property, id)
            if (response.data) {
                commit('setProperty', response.data)
                return response.data
            }
        } catch (error) {
            console.error('Error during edit property:', error)
            throw error
        }
    },

    async getProperty({ commit }, propertyId) {
        try {
            const response = await propertyService.get(propertyId)
            if (response.data) {
                commit('setProperty', response.data)
                return response.data
            }
        } catch (error) {
            console.error('Error during get property:', error)
            throw error
        }
    },

    async getPropertyComments({ commit }, { propertyId, filter = '' }) {
        try {
            const response = await propertyService.getComments(propertyId, filter);
            if (response.data) {
                commit('setPropertyComments', response.data)
                return response.data
            }
        } catch (error) {
            console.error('Error during get property comments:', error)
            throw error
        }
    },

    async addPropertyComment({ dispatch }, { comment, propertyId }) {
        try {
            const response = await propertyService.addComment(comment, propertyId)
            if (response.data) {
                dispatch('getPropertyComments', { propertyId })
                return response.data
            }
        } catch (error) {
            console.error('Error during add property comment:', error)
            throw error
        }
    },

    async deletePropertyComment({ dispatch }, comment) {
        try {
            const response = await propertyService.deleteComment(comment.id)
            if (response.data) {
                dispatch('getPropertyComments', { propertyId: comment.property_id })
                return response.data
            }
        } catch (error) {
            console.error('Error during delete property comment:', error)
            throw error
        }
    },

    async getProperties({ commit }, payload = { filter: '' }) {
        try {
            const response = await propertyService.index(payload.filter)
            if (response.data) {
                commit('setProperties', response.data)
                return response.data
            }
        } catch (error) {
            console.error('Error during get properties:', error)
            throw error
        }
    }
}
