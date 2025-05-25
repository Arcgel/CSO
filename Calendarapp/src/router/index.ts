import DashboardView from '@/views/DashboardView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginView,
    },
    {
      path: '/Register',
      name: 'Register',
      component: RegisterView,
    },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: DashboardView,
    },
  ],
})

export default router
