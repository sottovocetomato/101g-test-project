import api from './api'
import type { AxiosRequestConfig } from 'axios'

const transactions = {
  getAll: async (config: AxiosRequestConfig) => await api.get('/transactions', config),
}

export default transactions
