import axios from 'axios'
import type { CreateAxiosDefaults, AxiosRequestConfig, AxiosInstance } from 'axios'

type RequestBody = Record<string, any>

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

const api = (axios: AxiosInstance) => ({
  get: (url: string, config: AxiosRequestConfig, body?: RequestBody) => axios.get(url, config),
  post: (url: string, body: RequestBody) => axios.post(url, body),
  patch: (url: string, body: RequestBody) => axios.patch(url, body),
  delete: (url: string) => axios.delete(url),
})

export default api(AxiosInstance)
