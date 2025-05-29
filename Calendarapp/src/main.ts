import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VCalendar from 'v-calendar'
import 'v-calendar/style.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import { setupCalendar, Calendar, DatePicker } from 'v-calendar'
import 'v-calendar/style.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(setupCalendar, {})
app.use(createPinia())
app.use(VCalendar, {})
app.use(router)

app.mount('#app')
