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
import layouts from '@/layouts/layouts'
const layout = shallowRef('div')
const router = useRouter()

router.afterEach((to) => {
  if (to?.meta?.layout === undefined) return
  layout.value = layouts[to.meta.layout] || 'div'
})
provide('app:layout', layout)
</script>
<style scoped></style>
