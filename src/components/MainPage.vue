<template>
  <div class="transactions-wrap flex-col container-custom">
    <BaseFilters :filters="filters" @filterAction="onFilter" />
    <div class="transactions__table flex-col justify-between">
      <el-scrollbar>
        <el-table :data="transData" @sort-change="onSort" stripe border>
          <el-table-column prop="id" label="Id" width="140" />
          <el-table-column prop="date" label="Date" width="160" sortable="custom" />
          <el-table-column prop="type" label="Type" width="140" />
          <el-table-column prop="amount" label="Amount" sortable="custom" width="250" />
          <el-table-column prop="description" label="Description" width="fit" />
        </el-table>
      </el-scrollbar>
    </div>

    <div class="pagination">
      <el-pagination
        layout="prev, pager, next"
        :total="totalCount"
        @change="moveToPage"
        class="justify-center"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import transactions from '@/api/transactions'
import BaseFilters, { FilterObj } from '@/components/base/BaseFilters.vue'

const filters: FilterObj[] = [
  {
    name: 'transactionDate',
    type: 'dateRange',
    rule: 'btw',
    filterBy: 'date',
  },
  {
    name: 'transactionType',
    type: 'select',
    rule: 'eq',
    filterBy: 'type',
    options: [
      { label: 'expense', value: 'expense' },
      { label: 'income', value: 'income' },
    ],
  },
]

const currentPage = ref(1)
const totalCount = ref(0)
let searchQuery = {}
const transData = ref(null)

async function getData(page = 1, config = {}) {
  const limit = { _limit: 10 }
  const res = await transactions.getAll({
    params: { _page: currentPage.value, ...limit, ...searchQuery, ...config },
  })
  transData.value = res?.data
  totalCount.value = isNaN(+res?.headers?.['x-total-count']) ? 0 : +res?.headers?.['x-total-count']
}
async function onFilter(assembledFilter) {
  searchQuery = assembledFilter
  await getData(1)
}
async function onSort({ order, prop }: { order?: string; prop?: string } = {}) {
  if (!order || !prop) return
  order = order === 'descending' ? 'desc' : 'asc'
  console.log(order)
  searchQuery = { ...searchQuery, _sort: prop, _order: order }
  await getData(1, searchQuery)
}

async function moveToPage(page) {
  currentPage.value = page
  await getData(page)
}
await getData(currentPage.value)
</script>

<style scoped></style>
