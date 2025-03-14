<template>
  <Suspense>
    <component :is="layout">
      <RouterView />
    </component>
  </Suspense>
</template>

<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { provide, shallowRef } from 'vue'
import type { Component } from 'vue'
import layouts from '@/layouts/layouts'
const layout = shallowRef<Component | string>('div')
const router = useRouter()

router.afterEach((to) => {
  if (to?.meta?.layout === undefined) return
  const metaLayout = to?.meta?.layout as string
  layout.value = layouts[metaLayout] || 'div'
})
provide('app:layout', layout)
</script>
<style scoped></style>
