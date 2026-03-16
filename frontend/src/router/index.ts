import { createRouter, createWebHistory } from 'vue-router'

import Accueil from '@/components/Accueil.vue'
import Login from '@/components/components.auth/Login.vue'
import Register from '@/components/components.auth/Register.vue'
import Logbook from '@/components/components.logbook/Logbook.vue'
import Task from '@/components/components.task/Task.vue'

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
    children: [
      {
        path: 'task',
        component: Task,
      },
      {
        path: 'logbook',
        component: Logbook,
      },

    ],
  },
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
})

export default router
