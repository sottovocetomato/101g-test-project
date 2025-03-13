<template>
  <div class="main-wrap">
    <el-row>
      <el-col :span="6">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="-"
          value-format="YYYY-MM-DD"
          start-placeholder="От"
          end-placeholder="До"
        />
      </el-col>

      <el-button @click="onFilter">Filter</el-button>
    </el-row>

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
