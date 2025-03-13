import api from './api'

const transactions = {
  getAll: async (config?: object) => await api.get('/transactions', config),
  // getAllFiltered: async (data?: object | [], config?: object) =>
  //   await api.get('/transactions/filter', data, config),
  getById: async (id: number | string, config?: object) =>
    await api.get(`/transactions/${id}`, config),
}

export default transactions
