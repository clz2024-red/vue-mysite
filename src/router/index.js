import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/main/MainView.vue'
import LoginFormView from '@/views/user/LoginFormView.vue'
import ModifyFormView from '@/views/user/ModifyFormView.vue'

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
  {
    path: '/user/modifyform',
    name: '/user/modifyform',
    component: ModifyFormView
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
