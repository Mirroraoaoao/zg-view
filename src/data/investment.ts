export const investmentData = {
  hierarchy: {
    l1: ['核心投资指标', '投资指标趋势与对标分析', '投后运营与效益']
  },
  // L1: 核心投资指标
  core: {
    availablePropertyArea: '420 万㎡',
    fundInvestmentTotal: '￥ 120 亿',
    equityProjectCount: '16 项',
    fundProjectCount: '8 项',
    roi: '12.6%'
  },
  // L1: 投资指标趋势与对标分析
  exitAnalysis: {
    annualExitCount: 5,
    annualExitDetails: [
      { name: '项目A - 股权退出', amount: '￥ 3.2 亿', type: '股权转让' },
      { name: '项目B - 基金到期', amount: '￥ 1.8 亿', type: '基金到期' },
      { name: '项目C - IPO退出', amount: '￥ 5.6 亿', type: 'IPO' },
      { name: '项目D - 回购退出', amount: '￥ 2.1 亿', type: '回购' },
      { name: '项目E - 协议转让', amount: '￥ 1.5 亿', type: '协议转让' }
    ],
    annualExitRevenueTotal: '￥ 14.2 亿',
    annualExitRevenueDetails: [
      { name: '项目A - 股权退出', revenue: '￥ 0.8 亿' },
      { name: '项目B - 基金到期', revenue: '￥ 0.3 亿' },
      { name: '项目C - IPO退出', revenue: '￥ 2.4 亿' },
      { name: '项目D - 回购退出', revenue: '￥ 0.5 亿' },
      { name: '项目E - 协议转让', revenue: '￥ 0.2 亿' }
    ]
  },
  // L1: 投后运营与效益
  postInvestment: {
    listedCompanyMarketValue: '￥ 860 亿',
    annualDividend: '￥ 6.8 亿'
  },
  // 市值趋势
  marketValueTrend: {
    labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
    values: [520, 580, 650, 720, 790, 860]
  }
}
