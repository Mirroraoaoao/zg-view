export const operationData = {
  hierarchy: {
    l1: ['产业招商', '风险应对', '投资情况', '人力', '资金情况', '资产运营情况']
  },
  // 产业招商
  investment: {
    hengqin: {
      newProjects: 6,
      totalProjects: 18,
      taxContribution: '￥ 20 亿'
    },
    zhuhai: {
      newProjects: 6,
      totalProjects: 18,
      taxContribution: '￥ 22 亿'
    },
    industrialOutput: '￥ 860 亿',
    newSignedArea: {
      park: '18 万㎡',
      factory: '15 万㎡',
      office: '12 万㎡'
    }
  },
  // 风险应对
  risk: {
    lawsuitCount: 7,
    investmentLoss: '￥ 2.8 亿',
    assetImpairment: '￥ 1.5 亿',
    safetyRisk: '3 项'
  },
  // 投资情况
  fixedAssetInvestment: {
    completed: '￥ 210 亿',
    rate: '68%'
  },
  // 人力（业务口径）
  hrBusiness: {
    perCapitaOutput: '116.1 万',
    headcount: '12,504'
  },
  // 资金情况
  fundStatus: {
    overall: '稳健',
    financing: '推进中',
    comprehensiveFinancingCostRate: '4.2%',
    interestBearingDebt: '￥ 620 亿'
  },
  // 资产运营情况
  assetOperations: {
    projectSales: [
      { name: '滨海新城项目', sold: '12.5 万㎡', rate: '78%' },
      { name: '科技园二期', sold: '8.2 万㎡', rate: '65%' },
      { name: '商业中心', sold: '6.8 万㎡', rate: '72%' }
    ],
    revitalizedAssets: '￥ 46 亿'
  }
}
