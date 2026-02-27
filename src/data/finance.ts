export const financeData = {
  hierarchy: {
    l1: '核心财务总览',
    l2: ['一利五率', '社会效益类']
  },
  core: {
    metrics: [
      { label: '资产总额', value: '￥ 2,105 亿' },
      { label: '负债总额', value: '￥ 1,025 亿' },
      { label: '净资产', value: '￥ 1,080 亿' },
      { label: '总营业收入', value: '￥ 1,452 亿' },
      { label: '成本费用（不含财务费用）', value: '￥ 1,105 亿' },
      { label: '净利润', value: '￥ 210.4 亿' },
      { label: '经营性现金流量净额', value: '￥ 86.5 亿' },
      { label: '从业人数', value: '12,504' },
      { label: '职工薪酬总额', value: '￥ 96 亿' },
      { label: '带息负债总额', value: '￥ 620 亿' },
      { label: '财务费用', value: '￥ 18.6 亿' }
    ]
  },
  trend: {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
    revenue: [220, 235, 248, 256, 242, 251],
    profit: [30, 34, 36, 38, 35, 37]
  },
  benchmark: {
    labels: ['利润总额', '资产负债率', '营业现金比率', '净资产收益率（年化）', '研发（R&D）经费投入强度', '年化全员劳动生产率'],
    values: [328.5, 48.7, 6.0, 19.5, 3.8, 116.1]
  },
  budget: {
    execution: [
      { label: '已交税费总额', value: 78, display: '￥ 37.2 亿' },
      { label: '工业生产总值', value: 72, display: '￥ 860 亿' },
      { label: '固定资产投资额', value: 68, display: '￥ 210 亿' }
    ],
    chart: {
      labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
      values: [520, 610, 680, 750, 820, 860]
    },
    tags: ['税费贡献同比 +6.2%', '工业产值同比 +7.2%', '固定资产投资完成率 68%']
  }
}
