export const overallData = {
  hierarchy: {
    l1: ['集团营收数据', '经营目标达成率(不含重点工作，只计算经济指标)']
  },
  operating: {
    metrics: [
      { label: '总营收', value: '￥ 1,452 亿', trend: '+6.4%', trendType: 'up', section: '营收与利润' },
      { label: '境外营收', value: '￥ 186 亿', trend: '+4.2%', trendType: 'up', section: '营收与利润' },
      { label: '利润总额', value: '￥ 328.5 亿', trend: '+15%', trendType: 'up', section: '营收与利润' },
      { label: '净利润', value: '￥ 210.4 亿', trend: '+9%', trendType: 'up', section: '营收与利润' },
      { label: '负债总额', value: '￥ 1,025 亿', trend: '+3.2%', trendType: 'up', section: '营收与利润' },
      { label: '资产负债率', value: '48.7%', trend: '-1.2%', trendType: 'down', section: '营收与利润' },
      { label: '经营性现金流净额', value: '￥ 86.5 亿', trend: '+5.1%', trendType: 'up', section: '营收与利润' },
      { label: '人效比', value: '116.1 万/人', trend: '+2.1%', trendType: 'up', section: '营收与利润' },
      { label: '珠琴澳三地特色产业集群总产值', value: '￥ 860 亿', trend: '+7.2%', trendType: 'up', section: '贡献与产值' },
      { label: '新兴产业规模', value: '￥ 420 亿', trend: '+9.6%', trendType: 'up', section: '贡献与产值' },
      { label: '累计GDP贡献值（分板块）', value: '￥ 980 亿', trend: '+5.8%', trendType: 'up', section: '贡献与产值' },
      { label: '税收贡献（分板块）', value: '￥ 37.2 亿', trend: '+6.2%', trendType: 'up', section: '贡献与产值' },
      { label: '带动社会消费品零售额', value: '￥ 260 亿', trend: '+4.5%', trendType: 'up', section: '贡献与产值' },
      { label: '生产性服务占比', value: '36.5%', trend: '+1.2%', trendType: 'up', section: '贡献与产值' },
      { label: '费用压降情况（人力成本）', value: '-4.2%', trend: '+0.6%', trendType: 'up', section: '费用压降' },
      { label: '费用压降情况（期间费用）', value: '-3.5%', trend: '+0.5%', trendType: 'up', section: '费用压降' },
      { label: '费用压降情况（预结算审核压降金额）', value: '￥ 2.8 亿', trend: '+12%', trendType: 'up', section: '费用压降' }
    ],
    trend: {
      labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      values: [108, 115, 118, 125, 120, 128, 122, 130, 126, 132, 128, 200]
    }
  },
  annualCompletion: {
    group: [
      { label: '经营目标达成率', value: 86 }
    ],
    subsidiaries: [] as Array<{ label: string; value: number }>,
    note: '经营目标达成率 86%，需关注现金流与费用压降节奏。'
  },
  assetScale: {
    total: '￥ 980 亿',
    growth: '同比 +5.8%',
    increase: '新兴产业规模 ￥ 420 亿',
    categories: [
      { name: '产业科技板块', value: 18, color: '#5accff' },
      { name: '金融资本板块', value: 16, color: '#36f1cd' },
      { name: '城市开发板块', value: 14, color: '#f8c547' },
      { name: '建筑工程板块', value: 13, color: '#7cf29a' },
      { name: '物业资管板块', value: 12, color: '#ff6b6b' },
      { name: '跨境贸易板块', value: 11, color: '#c78aff' },
      { name: '跨境文旅板块', value: 9, color: '#ff9f43' },
      { name: '跨境人力板块', value: 7, color: '#6a7b96' }
    ],
    tags: ['产业科技 ￥ 176 亿', '金融资本 ￥ 157 亿', '城市开发 ￥ 137 亿', '建筑工程 ￥ 127 亿', '物业资管 ￥ 118 亿', '跨境贸易 ￥ 108 亿', '跨境文旅 ￥ 88 亿', '跨境人力 ￥ 69 亿'],
    trend: {
      labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
      values: [620, 680, 720, 800, 900, 980]
    }
  },
  investment: {
    progress: [
      { label: '人力成本压降', value: 82 },
      { label: '期间费用压降', value: 78 },
      { label: '预结算审核压降金额', value: 75 }
    ],
    kpis: [
      { label: '经营性现金流净额', value: '￥ 86.5 亿' },
      { label: '人效比', value: '116.1 万/人' }
    ]
  },
  fundStatus: {
    summary: [
      { label: '税收贡献（分板块）', value: '￥ 37.2 亿', tone: 'normal' },
      { label: '带动社会消费品零售额', value: '￥ 260 亿', tone: 'up' },
      { label: '生产性服务占比', value: '36.5%', tone: 'up' },
      { label: '累计GDP贡献值（分板块）', value: '￥ 980 亿', tone: 'normal' }
    ],
    flow: {
      labels: ['税收贡献（分板块）', '带动社会消费品零售额', '生产性服务占比'],
      values: [37.2, 260, 36.5]
    }
  },
  hrStatus: {
    summary: [
      { label: '珠琴澳三地特色产业集群总产值', value: '￥ 860 亿' },
      { label: '新兴产业规模', value: '￥ 420 亿' },
      { label: '累计GDP贡献值（分板块）', value: '￥ 980 亿' }
    ],
    talent: [
      { value: 36, name: '珠海', color: '#5accff' },
      { value: 28, name: '琴澳', color: '#36f1cd' },
      { value: 22, name: '澳门', color: '#f8c547' },
      { value: 14, name: '其他', color: '#6a7b96' }
    ]
  }
}
