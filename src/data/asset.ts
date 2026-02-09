export const assetData = {
  hierarchy: {
    l1: '物业资产盘活',
    l2: ['资产去化', '资产运营']
  },
  // 资产运营 - 出租率相关
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
  // 物业资产盘活 - 房产销售
  sales: {
    annualAmount: '￥ 68 亿',
    annualArea: '86 万㎡',
    availableArea: '420 万㎡',
    completionRate: '68%'
  }
}
