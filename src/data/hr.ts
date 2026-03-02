export const hrData = {
  hierarchy: {
    l1: ['人员情况', '产业人才结构', '人力成本预算执行情况', '干部管理'],
    cadreManagementL2: ['集团中层干部基本情况', '职级分布']
  },
  summary: [
    { label: '集团总人数', value: '12,504' },
    { label: '各版块总人数', value: '8,256' },
    { label: '各上市公司总人数', value: '4,248' },
    { label: '党员占比', value: '72%' }
  ],
  // 各版块人均工资
  salaryBySegment: [
    { name: '产业科技板块', value: '18.6 万' },
    { name: '金融资本板块', value: '22.4 万' },
    { name: '城市开发板块', value: '16.8 万' },
    { name: '建筑工程板块', value: '15.2 万' },
    { name: '物业资管板块', value: '14.5 万' },
    { name: '跨境贸易板块', value: '19.3 万' },
    { name: '跨境文旅板块', value: '17.1 万' },
    { name: '跨境人力板块', value: '16.0 万' }
  ],
  // 各版块人效比
  efficiencyBySegment: [
    { name: '产业科技板块', value: '112.3 万/人' },
    { name: '金融资本板块', value: '156.8 万/人' },
    { name: '城市开发板块', value: '98.5 万/人' },
    { name: '建筑工程板块', value: '88.2 万/人' },
    { name: '物业资管板块', value: '76.4 万/人' },
    { name: '跨境贸易板块', value: '134.6 万/人' },
    { name: '跨境文旅板块', value: '105.7 万/人' },
    { name: '跨境人力板块', value: '92.1 万/人' }
  ],
  // 干部管理 - 党员占比
  partyMember: {
    ratio: '72%',
    total: 9003
  },
  // 职级分布 - 八大板块
  cadreDistribution: [
    { level: '各版块板主企业企业负责人人数', industryTech: 12, financeCapital: 8, cityDev: 6, construction: 10, propertyAsset: 7, crossBorderTrade: 5, crossBorderTourism: 4, crossBorderHR: 3 },
    { level: '各版块板主企业中层正职人数', industryTech: 28, financeCapital: 22, cityDev: 18, construction: 24, propertyAsset: 16, crossBorderTrade: 12, crossBorderTourism: 10, crossBorderHR: 8 },
    { level: '各版块板主企业中层副职人数', industryTech: 36, financeCapital: 28, cityDev: 24, construction: 30, propertyAsset: 20, crossBorderTrade: 15, crossBorderTourism: 12, crossBorderHR: 10 }
  ],
  // 产业人才结构
  talentStructure: [
    { value: 32, name: '产业人才', color: '#36f1cd' },
    { value: 28, name: '技术人才', color: '#5accff' },
    { value: 24, name: '管理人才', color: '#f8c547' },
    { value: 16, name: '其他', color: '#6a7b96' }
  ]
}
