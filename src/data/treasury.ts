export const treasuryData = {
  hierarchy: {
    l1: '融资管理',
    l2: ['融资进度', '融资成本与结构管理']
  },
  // L1: 融资管理 / L2: 融资进度
  financing: {
    planTotal: '￥ 320 亿',
    planRemaining: '￥ 110 亿',
    planCompleted: '￥ 210 亿',
    // L3: 融资余额
    balances: {
      bankLoan: '￥ 180 亿',
      bond: '￥ 90 亿',
      trust: '￥ 50 亿',
      financingLease: '￥ 35 亿',
      other: '￥ 12 亿'
    }
  },
  // L2: 融资成本与结构管理
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
