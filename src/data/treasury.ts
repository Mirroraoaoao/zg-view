export const treasuryData = {
  hierarchy: {
    l1: '融资管理',
    l2: ['融资进度', '融资成本与结构管理']
  },
  // 融资管理
  financing: {
    planTotal: '￥ 320 亿',
    planRemaining: '￥ 110 亿',
    planCompleted: '￥ 210 亿',
    channels: {
      bankLoan: { amount: '￥ 180 亿', ratio: '56%' },
      bond: { amount: '￥ 90 亿', ratio: '28%' },
      trust: { amount: '￥ 50 亿', ratio: '16%' }
    }
  },
  // 融资成本与结构管理
  cost: {
    overallRate: '4.2%',
    termStructure: {
      longTerm: '58%',
      shortTerm: '42%'
    },
    costTrend: {
      labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
      values: [4.5, 4.3, 4.2, 4.1, 4.2, 4.2]
    }
  }
}
