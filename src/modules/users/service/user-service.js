import axiosClient from '@/axios'

const edit = async user => {
    return await axiosClient.post('/user', user)
}

const getUserProperties = async filter => {
    const config = {
        params: {},
    }
    if (filter) {
        config.params.filter = filter
    }
    return await axiosClient.get('/user/properties', config)
}

const getUserComments = async filter => {
    const config = {
        params: {},
    }
    if (filter) {
        config.params.filter = filter
    }
    return await axiosClient.get('/user/comments', config)
}

export default {
    edit,
    getUserProperties,
    getUserComments
}
