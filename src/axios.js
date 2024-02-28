import axios from 'axios'
import store from '@/store'

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
})

axiosClient.interceptors.request.use(
    config => {
        config.headers.Authorization = `Bearer ${store.state.auth.token}`
        return config
    },
    error => {
           if (error.response.status === 401){
              window.location.replace('/properties');
           }
        console.log(error)
        return Promise.reject(error)
    },
)

axiosClient.interceptors.response.use(
    response => {
        return response
    },
    error => {
          if (error.response.status === 401){
             window.location.replace('/properties');
          }
        console.log(error)
        return Promise.reject(error)
    },
)

export default axiosClient
