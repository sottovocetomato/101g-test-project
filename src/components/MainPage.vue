<template>
  <div class="main-wrap">
    <BaseFilters :filters="filters" />
    <el-scrollbar>
      <el-table :data="transData">
        <el-table-column prop="id" label="Id" width="140" />
        <el-table-column prop="date" label="Date" width="120" />
        <el-table-column prop="type" label="Type" />
        <el-table-column prop="amount" label="Amount" />
        <el-table-column prop="description" label="Description" />
      </el-table>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import transactions from '@/api/transactions'
import BaseFilters, { FilterObj } from '@/components/base/BaseFilters.vue'

const filters: FilterObj[] = [
  {
    type: 'dateRange',
    rule: 'btw',
    filterBy: 'date',
  },
  {
    type: 'select',
    rule: 'eq',
    filterBy: 'type',
    options: [
      { label: 'expense', value: 'expense' },
      { label: 'income', value: 'income' },
    ],
  },
]

const reqConfig = { _limit: 10 }
const transData = ref(null)
const dateRange = ref('')

async function getData(page = 1, config) {
  const data = (await transactions.getAll({ params: { ...config } }))?.data
  transData.value = data
}
async function onFilter() {
  console.log(dateRange.value, 'dateRange')
  let conf = {
    ...reqConfig,
    date_gte: dateRange.value[0],
    date_lte: dateRange.value[1],
    _sort: 'date',
    _order: 'asc',
  }
  await getData(1, conf)
}
await getData(1, reqConfig)
</script>

<style scoped></style>
