import './assets/main.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import TreeTable from 'primevue/treetable'
import Column from 'primevue/column'
import Aura from '@primeuix/themes/aura'
import App from './App.vue'

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})
app.component('TreeTable', TreeTable)
app.component('Column', Column)
app.mount('#app')
