import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Transaction } from '@/types'

export const useTransactionsStore = defineStore('counter', () => {
  const transactionsData = ref<Transaction[]>([])
  function setTransactions(data: Transaction[]) {
    if (!data) return
    transactionsData.value = data
  }
  return { transactionsData, setTransactions }
})
