import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as dashboardService from '../services/dashboardService'

type DataStatus = 'idle' | 'loading' | 'success' | 'error'

/**
 * Dashboard 数据状态管理 Store
 * 管理各模块数据的加载状态和缓存
 */
export const useDashboardStore = defineStore('dashboard', () => {
  // ==================== 状态 ====================
  const portalData = ref<Awaited<ReturnType<typeof dashboardService.getPortalData>> | null>(null)
  const overallData = ref<Awaited<ReturnType<typeof dashboardService.getOverallData>> | null>(null)
  const adminData = ref<Awaited<ReturnType<typeof dashboardService.getAdminData>> | null>(null)
  const hrData = ref<Awaited<ReturnType<typeof dashboardService.getHrData>> | null>(null)
  const financeData = ref<Awaited<ReturnType<typeof dashboardService.getFinanceData>> | null>(null)
  const treasuryData = ref<Awaited<ReturnType<typeof dashboardService.getTreasuryData>> | null>(null)
  const investmentData = ref<Awaited<ReturnType<typeof dashboardService.getInvestmentData>> | null>(null)
  const assetData = ref<Awaited<ReturnType<typeof dashboardService.getAssetData>> | null>(null)
  const operationData = ref<Awaited<ReturnType<typeof dashboardService.getOperationData>> | null>(null)
  const keyProjectsData = ref<Awaited<ReturnType<typeof dashboardService.getKeyProjectsData>> | null>(null)

  // 加载状态
  const status = ref<Record<string, DataStatus>>({
    portal: 'idle',
    overall: 'idle',
    admin: 'idle',
    hr: 'idle',
    finance: 'idle',
    treasury: 'idle',
    investment: 'idle',
    asset: 'idle',
    operation: 'idle',
    keyProjects: 'idle'
  })

  // 错误信息
  const errors = ref<Record<string, string | null>>({
    portal: null,
    overall: null,
    admin: null,
    hr: null,
    finance: null,
    treasury: null,
    investment: null,
    asset: null,
    operation: null,
    keyProjects: null
  })

  // 最后更新时间
  const lastUpdated = ref<Record<string, Date | null>>({
    portal: null,
    overall: null,
    admin: null,
    hr: null,
    finance: null,
    treasury: null,
    investment: null,
    asset: null,
    operation: null,
    keyProjects: null
  })

  // ==================== 计算属性 ====================
  const isLoading = computed(() =>
    Object.values(status.value).some(s => s === 'loading')
  )

  const hasError = computed(() =>
    Object.values(status.value).some(s => s === 'error')
  )

  // ==================== Actions ====================

  // 通用加载函数
  async function loadModule<T>(
    moduleName: string,
    fetcher: () => Promise<T>,
    setter: (data: T) => void
  ) {
    status.value[moduleName] = 'loading'
    errors.value[moduleName] = null

    try {
      const data = await fetcher()
      setter(data)
      status.value[moduleName] = 'success'
      lastUpdated.value[moduleName] = new Date()
    } catch (e) {
      status.value[moduleName] = 'error'
      errors.value[moduleName] = e instanceof Error ? e.message : '加载失败'
    }
  }

  // 各模块加载方法
  const loadPortal = () => loadModule(
    'portal',
    dashboardService.getPortalData,
    (data) => { portalData.value = data }
  )

  const loadOverall = () => loadModule(
    'overall',
    dashboardService.getOverallData,
    (data) => { overallData.value = data }
  )

  const loadAdmin = () => loadModule(
    'admin',
    dashboardService.getAdminData,
    (data) => { adminData.value = data }
  )

  const loadHr = () => loadModule(
    'hr',
    dashboardService.getHrData,
    (data) => { hrData.value = data }
  )

  const loadFinance = () => loadModule(
    'finance',
    dashboardService.getFinanceData,
    (data) => { financeData.value = data }
  )

  const loadTreasury = () => loadModule(
    'treasury',
    dashboardService.getTreasuryData,
    (data) => { treasuryData.value = data }
  )

  const loadInvestment = () => loadModule(
    'investment',
    dashboardService.getInvestmentData,
    (data) => { investmentData.value = data }
  )

  const loadAsset = () => loadModule(
    'asset',
    dashboardService.getAssetData,
    (data) => { assetData.value = data }
  )

  const loadOperation = () => loadModule(
    'operation',
    dashboardService.getOperationData,
    (data) => { operationData.value = data }
  )

  const loadKeyProjects = () => loadModule(
    'keyProjects',
    dashboardService.getKeyProjectsData,
    (data) => { keyProjectsData.value = data }
  )

  // 加载所有数据
  const loadAll = async () => {
    await Promise.all([
      loadPortal(),
      loadOverall(),
      loadAdmin(),
      loadHr(),
      loadFinance(),
      loadTreasury(),
      loadInvestment(),
      loadAsset(),
      loadOperation(),
      loadKeyProjects()
    ])
  }

  // 清除缓存
  const clearCache = () => {
    portalData.value = null
    overallData.value = null
    adminData.value = null
    hrData.value = null
    financeData.value = null
    treasuryData.value = null
    investmentData.value = null
    assetData.value = null
    operationData.value = null
    keyProjectsData.value = null

    Object.keys(status.value).forEach(key => {
      status.value[key] = 'idle'
      errors.value[key] = null
      lastUpdated.value[key] = null
    })
  }

  return {
    // 数据
    portalData,
    overallData,
    adminData,
    hrData,
    financeData,
    treasuryData,
    investmentData,
    assetData,
    operationData,
    keyProjectsData,
    // 状态
    status,
    errors,
    lastUpdated,
    isLoading,
    hasError,
    // Actions
    loadPortal,
    loadOverall,
    loadAdmin,
    loadHr,
    loadFinance,
    loadTreasury,
    loadInvestment,
    loadAsset,
    loadOperation,
    loadKeyProjects,
    loadAll,
    clearCache
  }
})
