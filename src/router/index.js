import { createRouter, createWebHistory } from 'vue-router'
import TwitterTrends from '../pages/TwitterTrends.vue'
import GetDayTrends from '../pages/GetDayTrends.vue'
import NotFound from '../pages/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TwitterTrends
    },
    {
      path: '/getdaytrends',
      name: 'getdaytrends',
      component: GetDayTrends
    },
  ]
})

export default router