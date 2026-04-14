import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createPinia } from 'pinia'
import Box from './components/box.vue'
import Converter from './components/converter.vue'
import Graphic from './components/historyGraphic.vue'
import Rates from './components/rates.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/rates', component: Rates, name: 'rates' },
    { path: '/converter', component: Converter, name: 'converter' },
    { path: '/graphic', component: Graphic, name: 'graphic' },
    { path: '/:catchAll(.*)', redirect: { name: 'converter' } }
  ]
})

const pinia = createPinia()
const app = createApp(Box)

app.use(router)
app.use(pinia)

app.mount('#app')
