<template>
  <div class="filters-wrap">
    <el-row>
      <el-col :span="21">
        <el-row>
          <el-col
            v-for="(filter, ind) in filters"
            :key="`${filter.type}-${ind}`"
            :span="filter?.span || 7"
          >
            <el-date-picker
              v-if="filter.type === 'dateRange'"
              v-model="filtersModel[filter.name]"
              type="daterange"
              range-separator="-"
              value-format="YYYY-MM-DD"
              start-placeholder="От"
              end-placeholder="До"
              @change="composeFilter(filter, $event)"
              class="w-4/5 mr-1"
              size="large"
            />
            <el-select
              v-if="filter.type === 'select'"
              v-model="filtersModel[filter.name]"
              :placeholder="filter?.placeholder || 'Выберите опцию'"
              @change="composeFilter(filter, $event)"
              class="w-4/5 mr-1"
              size="large"
            >
              <el-option
                v-for="item in filter.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-button
              type="danger"
              :icon="Close"
              circle
              @click="clearFilter(filter)"
              size="small"
            />
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="3">
        <div class="filters-wrap-controls flex-row justify-end">
          <el-button type="danger" size="large" @click="clearAllFilters">Clear All</el-button>
          <el-button type="primary" size="large" @click="onFilter">Filter</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue'

import { Close } from '@element-plus/icons-vue'

export type AssembledFilter = Record<string, string | number | undefined>

const emit = defineEmits<{
  filterAction: [assembledFilter: AssembledFilter]
}>()

export interface FilterObj {
  name: string
  type: 'dateRange' | 'select'
  filterBy: string
  rule: 'btw' | 'eq'
  span?: number
  placeholder?: string
  options?: { label: string; value: string }[]
}

export interface FilterProps {
  filters: FilterObj[]
}

const { filters } = defineProps<FilterProps>()

const filtersModel = ref<Record<string, any>>({})

let assembledFilter: AssembledFilter = {}

//Можно сделать фильтрацию сразу при выборе значения в фильтре или при очистке, но это не всегда удобно
//для пользователя и создаст дополнительные запросы к серверу.
function composeFilter(filter: FilterObj, value: any) {
  if (filter.rule.toLowerCase() === 'btw' && Array.isArray(value)) {
    assembledFilter[`${filter.filterBy}_gte`] = value[0]
    assembledFilter[`${filter.filterBy}_lte`] = value[1]
  }
  if (filter.rule.toLowerCase() === 'eq' && !Array.isArray(value)) {
    assembledFilter[filter.filterBy] = value
  }
}
function clearAllFilters() {
  filtersModel.value = {}
  for (const key in assembledFilter) {
    assembledFilter[key] = undefined
  }
  onFilter()
}
function clearFilter(filter?: FilterObj) {
  if (!filter) return
  filtersModel.value[filter?.name] = ''
  if (filter?.rule?.toLowerCase() === 'btw') {
    assembledFilter[`${filter.filterBy}_gte`] = undefined
    assembledFilter[`${filter.filterBy}_lte`] = undefined
  }
  assembledFilter[filter.filterBy] = undefined
}
function onFilter() {
  emit('filterAction', assembledFilter)
}
</script>

<style scoped></style>
