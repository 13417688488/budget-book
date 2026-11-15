import App from '@/App.vue'
import Budget from '@/components/Budget.vue'
import Home from '@/components/Home.vue'
import Monthly from '@/components/Monthly.vue'
import Record from '@/components/Record.vue'
import Search from '@/components/Search.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/record',
      component: Record,
    },
    {
      path: '/monthly',
      component: Monthly,
    },
    {
      path: '/budget',
      component: Budget,
    },
    {
      path: '/search',
      component: Search,
    },
  ],
})

export default router
