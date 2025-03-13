import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { layout: 'DefaultLayout' },
      component: () => import('../components/MainPage.vue'),
    },
  ],
})

export default router
