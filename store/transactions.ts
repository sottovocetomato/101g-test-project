import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Transaction } from '@/types'

export const useTransactionsStore = defineStore('counter', () => {
  const transactionsData = ref([])
  function setTransactions(data: Transaction[]) {
    if (!data) return
    transactionsData.value = data
  }
  return { transactionsData, setTransactions }
})
