// import axiosClient from '@/axios'
import axios from 'axios'

const register = async user => {
    return await axios.post('/register', user, { baseURL: import.meta.env.VITE_APP_API_URL })
}

const login = async user => {
    return await axios.post('/login', user, { baseURL: import.meta.env.VITE_APP_API_URL })
}

export default {
    register,
    login,
}
