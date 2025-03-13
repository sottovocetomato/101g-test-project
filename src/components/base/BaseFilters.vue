<template>
  <el-row>
    <el-col
      v-for="(filter, ind) in filters"
      :key="`${filter.type}-${ind}`"
      :span="filter?.span || 6"
    >
      <el-date-picker
        v-if="filter?.type === 'dateRange'"
        v-model="filtersModel[filter.name]"
        type="daterange"
        range-separator="-"
        value-format="YYYY-MM-DD"
        start-placeholder="От"
        end-placeholder="До"
        @change="(value) => composeFilter(filter, value)"
      />
      <el-select
        v-if="filter.type === 'select'"
        v-model="filtersModel[filter.name]"
        :placeholder="filter?.placeholder || 'Выберите опцию'"
        @change="(value) => composeFilter(filter, value)"
      >
        <el-option
          v-for="item in filter.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-col>
    <el-button @click="onFilter">Filter</el-button>
  </el-row>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'

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
const loaded = ref(false)

const filtersModel = ref({})

const assembledFilter = ref({})

function composeFilter(filter, value) {
  console.log(value, 'value')
  if (filter.rule.toLowerCase() === 'btw') {
    assembledFilter.value[`${filter.filterBy}_gte`] = value[0]
    assembledFilter.value[`${filter.filterBy}_lte`] = value[1]
  }
  if (filter.rule.toLowerCase() === 'eq') {
    assembledFilter.value[filter.filterBy] = value
  }
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
</script>

<style scoped></style>
