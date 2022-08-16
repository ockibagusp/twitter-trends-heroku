import { createRouter, createWebHistory } from 'vue-router'
import CopydanPaste from '../pages/CopydanPaste.vue'
import GetDayTrends from '../pages/GetDayTrends.vue'
import NotFound from '../pages/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CopydanPaste
    },
    {
      path: '/getdaytrends',
      name: 'getdaytrends',
      component: GetDayTrends
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Not Found',
      component: NotFound
    }
  ]
})

export default router