import axios from 'axios'
// import { Message, MessageBox } from 'element-ui'
import { getToken } from '@/utils/cache';

const service = axios.create({
    baseURL: "",
    timeout: 5000,
    // method: 'POST'
})

service.interceptors.request.use(

    (config) => {
        let token = getToken()
        config.headers['authorization'] = 'Bearer ' + token
        return config
    },
    (error) => {
        return Promise.reject(error)
    })

service.interceptors.response.use(
    (response) => {
        const res = response.data
        return res
    },
    (error) => {
        return Promise.reject(error)
    })

export default service