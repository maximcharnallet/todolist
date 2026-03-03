import { createRouter, createWebHistory } from 'vue-router'

import Accueil from '@/components/Accueil.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'

const routes = [
  {
    path: '/',
    component: Login,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/accueil',
    component: Accueil,
  },
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
})

export default router
