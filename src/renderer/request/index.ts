import axios from 'axios'
import { message } from 'antd'

const Axios = axios.create({
    timeout: 50000
})

Axios.interceptors.response.use(response => {
    return Promise.resolve(response.data)
}, error => {
    const errorData = error?.response?.data?.message
    message.error(errorData || '请求出错')
    return Promise.reject(error)
})

export default Axios;