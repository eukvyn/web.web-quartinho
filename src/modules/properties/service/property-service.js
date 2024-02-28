import axiosClient from '@/axios'

const add = async property => {
    return await axiosClient.post('/properties', property)
}

const edit = async (property, id) => {
    return await axiosClient.post(`/properties/${id}`, property)
}

const get = async propertyId => {
    return await axiosClient.get(`/properties/${propertyId}`)
}

const index = async filter => {
    const config = {
        params: {},
    }
    if (filter) {
        config.params.filter = filter
    }
    return await axiosClient.get('/properties', config)
}

const getComments = async (propertyId, filter) => {
    const config = {
        params: {},
    }
    if (filter) {
        config.params.filter = filter
    }
    return await axiosClient.get(`/properties/${propertyId}/comments`, config)
}

const addComment = async (comment, propertyId) => {
    return await axiosClient.post(`/properties/${propertyId}/comments`, comment)
}

const deleteComment = async (commentId) => {
    return await axiosClient.delete(`/comments/${commentId}`)
}

export default {
    add,
    edit,
    get,
    index,
    getComments,
    addComment,
    deleteComment
}
