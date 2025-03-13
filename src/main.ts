import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import ru from 'element-plus/es/locale/lang/ru'
import App from './App.vue'
import router from '@/router'

const app = createApp(App)

app.use(router)
app.use(ElementPlus, {
  locale: ru,
})
app.use(createPinia())
app.mount('#app')
