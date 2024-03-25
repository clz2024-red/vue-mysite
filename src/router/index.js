import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/main/MainView.vue'
import LoginFormView from '@/views/user/LoginFormView.vue'

const routes = [
  {
    path: '/',
    name: '/',
    component: MainView
  },
  {
    path: '/user/loginform',
    name: '/user/loginform',
    component: LoginFormView
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
