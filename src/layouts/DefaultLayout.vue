<template>
  <el-container :direction="'vertical'" class="layout-container">
    <BaseHeader />
    <el-main>
      <slot />
    </el-main>
    <BaseFooter />
  </el-container>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import BaseHeader from '@/components/base/BaseHeader.vue'
import BaseFooter from '@/components/base/BaseFooter.vue'

const route = useRoute()

const router = useRouter()

console.log(route, 'ROUTE')
</script>

<style scoped></style>
