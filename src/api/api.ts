import axios from 'axios'
import type { CreateAxiosDefaults, AxiosRequestConfig } from 'axios'

const options = {
  baseURL: 'http://localhost:4000/',
  headers: {
    Accept: 'application/json',
  },
} as CreateAxiosDefaults

const AxiosInstance = axios.create(options)

AxiosInstance.interceptors.response.use(
  (resp) => {
    return resp
  },
  (resp) => {
    return Promise.reject(resp?.response?.data?.message || 'Неизвестная ошибка')
  }
)

const api = (axios) => ({
  get: (url, config, body?) => axios.get(url, config, body),
  post: (url, body, config?) => axios.post(url, body, config),
  patch: (url, body, config?) => axios.patch(url, body, config),
  delete: (url, config?) => axios.delete(url, config),
})

export default api(AxiosInstance)
