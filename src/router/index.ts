import { createRouter, createWebHistory } from 'vue-router'
import Portal from '../views/Portal.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'portal',
      component: Portal
    },
    {
      path: '/overall',
      name: 'overall',
      component: () => import('../views/GeneralDetail.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminDetail.vue')
    },
    {
      path: '/finance',
      name: 'finance',
      component: () => import('../views/FinanceDetail.vue')
    },
    {
      path: '/treasury',
      name: 'treasury',
      component: () => import('../views/TreasuryDetail.vue')
    },
    {
      path: '/investment',
      name: 'investment',
      component: () => import('../views/InvestmentDetail.vue')
    },
    {
      path: '/hr',
      name: 'hr',
      component: () => import('../views/HumanResourceDetail.vue')
    },
    {
      path: '/asset',
      name: 'asset',
      component: () => import('../views/AssetDetail.vue')
    },
    {
      path: '/operation',
      name: 'operation',
      component: () => import('../views/ProjectDetail.vue')
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/KeyProjectsDetail.vue')
    }
  ]
})

export default router
