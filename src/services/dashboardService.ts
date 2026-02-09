/**
 * Dashboard 数据服务层
 * 封装数据获取逻辑，解耦视图层与数据源
 * 当前使用 mock 数据，后续可替换为 API 调用
 */

import { portalData } from '../data/portal'
import { overallData } from '../data/general'
import { adminData } from '../data/admin'
import { hrData } from '../data/hr'
import { financeData } from '../data/finance'
import { treasuryData } from '../data/treasury'
import { investmentData } from '../data/investment'
import { assetData } from '../data/asset'
import { operationData } from '../data/project'
import { keyProjectsData } from '../data/keyProjects'

// ==================== Portal 首页 ====================
export const getPortalData = async () => {
  // 当前：返回 mock 数据
  // 未来：替换为 API 调用
  return portalData
}

// ==================== 综合看板 ====================
export const getOverallData = async () => {
  return overallData
}

// ==================== 行政管理 ====================
export const getAdminData = async () => {
  return adminData
}

// ==================== 人力资源 ====================
export const getHrData = async () => {
  return hrData
}

// ==================== 财务管理 ====================
export const getFinanceData = async () => {
  return financeData
}

// ==================== 资金分析 ====================
export const getTreasuryData = async () => {
  return treasuryData
}

// ==================== 投资管理 ====================
export const getInvestmentData = async () => {
  return investmentData
}

// ==================== 资产管理 ====================
export const getAssetData = async () => {
  return assetData
}

// ==================== 经营管控 ====================
export const getOperationData = async () => {
  return operationData
}

// ==================== 重点项目 ====================
export const getKeyProjectsData = async () => {
  return keyProjectsData
}

// ==================== 批量获取 ====================
export const getAllDashboardData = async () => {
  const [
    portal,
    overall,
    admin,
    hr,
    finance,
    treasury,
    investment,
    asset,
    operation,
    keyProjects
  ] = await Promise.all([
    getPortalData(),
    getOverallData(),
    getAdminData(),
    getHrData(),
    getFinanceData(),
    getTreasuryData(),
    getInvestmentData(),
    getAssetData(),
    getOperationData(),
    getKeyProjectsData()
  ])

  return {
    portal,
    overall,
    admin,
    hr,
    finance,
    treasury,
    investment,
    asset,
    operation,
    keyProjects
  }
}
