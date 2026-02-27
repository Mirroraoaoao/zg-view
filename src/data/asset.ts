export const assetData = {
  hierarchy: {
    l1: '物业资产盘活',
    l2: ['资产去化', '资产运营']
  },
  // L2: 资产运营
  rental: {
    overall: '85%',
    byType: [
      { label: '办公物业出租率', value: '86%' },
      { label: '厂房物业出租率', value: '82%' },
      { label: '商业物业出租率', value: '78%' },
      { label: '公寓物业出租率', value: '88%' }
    ],
    area: {
      rentable: '680 万㎡',
      rented: '578 万㎡'
    },
    income: '￥ 4.2 亿'
  },
  // L2: 资产去化
  sales: {
    availableArea: '420 万㎡',
    annualArea: '86 万㎡',
    annualAmount: '￥ 68 亿',
    annualTarget: '￥ 100 亿',
    completionRate: '68%',
    // L3: 其他去化方式完成额
    otherDisposal: {
      bulkTransaction: '￥ 12.5 亿',
      landReturn: '￥ 8.2 亿',
      assetSecuritization: '￥ 5.6 亿'
    }
  }
}
