<template>
  <div class="transactions-wrap flex-col container-custom">
    <BaseFilters :filters="filters" @filterAction="onFilter" />
    <div class="transactions__table-wrap" v-loading="loading">
      <el-scrollbar>
        <el-table
          :data="transactionsData"
          @sort-change="onSort"
          stripe
          border
          class="transactions__table"
        >
          <el-table-column prop="id" label="Id" width="140" />
          <el-table-column prop="date" label="Date" width="160" sortable="custom" />
          <el-table-column prop="type" label="Type" width="140" />
          <el-table-column prop="amount" label="Amount" sortable="custom" width="250">
            <template #default="scope">
              <span style="margin-left: 10px">{{ currencyFormat(scope.row.amount) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="description" label="Description" width="fit" />
        </el-table>
      </el-scrollbar>
    </div>

    <div class="pagination">
      <el-pagination
        layout="prev, pager, next"
        :total="totalCount"
        v-model:current-page="currentPage"
        @change="getData"
        class="justify-center"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import transactions from '@/api/transactions'
import BaseFilters from '@/components/base/BaseFilters.vue'
import type { AssembledFilter } from '@/components/base/BaseFilters.vue'
import type { FilterObj } from '@/components/base/BaseFilters.vue'
import { currencyFormat } from '@/helpers/currencyFormat'
import { useTransactionsStore } from '../../store/transactions'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'

const store = useTransactionsStore()
const { transactionsData } = storeToRefs(store)
const { setTransactions } = store

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

const loading = ref(false)
const currentPage = ref(1)
const totalCount = ref(0)
let searchQuery = {}

onMounted(async () => {
  await getData()
})

//В данном случае не вижу смысла использовать стейт менеджер, так как наши данные используются только на этой странице.
//Я бы сохранил данные в локальной переменной transData и передал бы её в таблицу.
//Но представим, что у нас есть еще страница, которая использует эти данные, и нам нужно хранить их в сторе.

// const transData = ref(null)

async function getData(page?: number, config = {}) {
  try {
    loading.value = true
    const limit = { _limit: 10 }
    const res = await transactions.getAll({
      params: { _page: page || currentPage.value, ...limit, ...searchQuery, ...config },
    })
    // transData.value = res?.data
    setTransactions(res?.data)
    totalCount.value = isNaN(+res?.headers?.['x-total-count'])
      ? 0
      : +res?.headers?.['x-total-count']
    loading.value = false
  } catch (e) {
    throw new Error(`Error while fetching data: ${e}`)
  }
}

//В компоненте BaseFilters собирается объект фильтра, который затем передаётся в запрос на сервер.
//Объект обрабатывается axios и превращается в query параметры, необходимые для фильтрации
//по правилам из документации json-server. Фильтры можно сочетать.
async function onFilter(assembledFilter: AssembledFilter) {
  searchQuery = { ...searchQuery, ...assembledFilter }
  await getFilteredData()
}

//Сортировка использует встроенную в таблицу от ElementUI функцию сортировки и эвент sort-change.
//Получаем данные о сортировке в эвенте и отправляем запрос на сервер.
async function onSort({ order, prop }: { order?: string; prop?: string } = {}) {
  if (!order || !prop) return
  order = order === 'descending' ? 'desc' : 'asc'
  searchQuery = { ...searchQuery, _sort: prop, _order: order }
  await getFilteredData()
}

//Если у нас первая страница, то напрямую вызываем фетч, если находимся на иной странице, то сбрасываем её на первую
//и пагинатор вызовет фетч самостоятельно
async function getFilteredData() {
  if (currentPage.value === 1) {
    await getData()
  } else {
    currentPage.value = 1
  }
}
</script>

<style scoped></style>
