import './assets/main.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Column from 'primevue/column'
import Aura from '@primeuix/themes/aura'
import App from './App.vue'
import { DataTable, InputText, Message, Paginator } from 'primevue'

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Paginator', Paginator)
app.component('InputText', InputText)
app.component('Message', Message)
app.mount('#app')
