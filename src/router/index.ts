import { createRouter, createWebHistory } from 'vue-router'
import Portal from '../views/Portal.vue'
import OverallDashboard from '../views/GeneralDetail.vue'
import AdminDetail from '../views/AdminDetail.vue'
import FinanceDetail from '../views/FinanceDetail.vue'
import TreasuryDetail from '../views/TreasuryDetail.vue'
import InvestmentDetail from '../views/InvestmentDetail.vue'
import HumanResourceDetail from '../views/HumanResourceDetail.vue'
import AssetDetail from '../views/AssetDetail.vue'
import OperationDetail from '../views/ProjectDetail.vue'
import KeyProjectsDetail from '../views/KeyProjectsDetail.vue'

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
      component: OverallDashboard
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminDetail
    },
    {
      path: '/finance',
      name: 'finance',
      component: FinanceDetail
    },
    {
      path: '/treasury',
      name: 'treasury',
      component: TreasuryDetail
    },
    {
      path: '/investment',
      name: 'investment',
      component: InvestmentDetail
    },
    {
      path: '/hr',
      name: 'hr',
      component: HumanResourceDetail
    },
    {
      path: '/asset',
      name: 'asset',
      component: AssetDetail
    },
    {
      path: '/operation',
      name: 'operation',
      component: OperationDetail
    },
    {
      path: '/projects',
      name: 'projects',
      component: KeyProjectsDetail
    }
  ]
})

export default router
