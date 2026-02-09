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
    { name: '制造板块', value: '15.2 万' },
    { name: '服务板块', value: '18.6 万' },
    { name: '投资板块', value: '22.4 万' }
  ],
  // 各版块人效比
  efficiencyBySegment: [
    { name: '制造板块', value: '98.5 万/人' },
    { name: '服务板块', value: '112.3 万/人' },
    { name: '投资板块', value: '156.8 万/人' }
  ],
  // 干部管理 - 党员占比
  partyMember: {
    ratio: '72%',
    total: 9003
  },
  // 职级分布 - 各版块板主企业
  cadreDistribution: [
    { level: '各版块板主企业企业负责人人数', manufacturing: 12, service: 8, investment: 6 },
    { level: '各版块板主企业中层正职人数', manufacturing: 28, service: 22, investment: 18 },
    { level: '各版块板主企业中层副职人数', manufacturing: 36, service: 28, investment: 24 }
  ],
  // 产业人才结构
  talentStructure: [
    { value: 32, name: '产业人才', color: '#36f1cd' },
    { value: 28, name: '技术人才', color: '#5accff' },
    { value: 24, name: '管理人才', color: '#f8c547' },
    { value: 16, name: '其他', color: '#6a7b96' }
  ]
}
