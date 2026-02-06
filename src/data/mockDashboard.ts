export const portalData = {
  header: {
    title: '集团数据驾驶舱',
    subtitle: '企业经营全景态势一屏统览',
    status: '数据同步正常'
  },
  hero: {
    name: 'overall',
    title: '经营数据',
    subtitle: '集团核心经营成果总览',
    badge: '核心入口',
    metrics: [
      { label: '总营收', value: '￥ 1,452 亿' },
      { label: '境外营收', value: '￥ 186 亿' },
      { label: '利润总额', value: '￥ 328.5 亿' },
      { label: '净利润', value: '￥ 210.4 亿' },
      { label: '负债总额', value: '￥ 1,025 亿' },
      { label: '资产负债率', value: '48.7%' },
      { label: '经营性现金流净额', value: '￥ 86.5 亿' }
    ]
  },
  heroCharts: {
    trend: {
      labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
      values: [145, 168, 172, 185, 178, 192, 205, 207],
      color: '#5accff',
      areaColor: 'rgba(90, 204, 255, 0.18)'
    }
  },
  leftModules: [
    {
      name: 'finance',
      title: '财务管理',
      tag: '一利五率',
      desc: '财务报表核心数据与考核',
      metrics: [
        { label: '利润总额', value: '￥ 328.5 亿' },
        { label: '资产负债率', value: '48.7%' },
        { label: '净资产收益率（年化）', value: '19.5%' },
        { label: '营业现金比率', value: '6.0%' }
      ],
      chart: null
    },
    {
      name: 'treasury',
      title: '资金分析',
      tag: '融资',
      desc: '融资计划执行与成本结构',
      metrics: [
        { label: '年度融资计划总额', value: '￥ 320 亿' },
        { label: '年度融资计划剩余额度', value: '￥ 110 亿' },
        { label: '集团综合融资成本率', value: '4.2%' },
        { label: '负债期限结构', value: '长58%/短42%' }
      ],
      chart: null
    },
    {
      name: 'investment',
      title: '投资运营',
      tag: '投资',
      desc: '投资规模与上市公司市值',
      metrics: [
        { label: '投资总额', value: '￥ 120 亿' },
        { label: '项目总数量', value: '24 项' },
        { label: '控股上市公司市值', value: '￥ 860 亿' }
      ],
      chart: null
    },
    {
      name: 'projects',
      title: '重点项目',
      tag: '调度',
      desc: '年度重点项目进度管理',
      metrics: [
        { label: '重点项目数量', value: '待明细' },
        { label: '重点项目完成率', value: '62%' }
      ],
      chart: null
    }
  ],
  rightModules: [
    {
      name: 'asset',
      title: '资产管理',
      tag: '运营',
      desc: '房产销售去化与物业租赁',
      metrics: [
        { label: '物业总体出租率', value: '85%' },
        { label: '年度房产销售额', value: '￥ 68 亿' },
        { label: '年度房产销售面积', value: '86 万㎡' },
        { label: '可售房产面积', value: '420 万㎡' }
      ],
      chart: null
    },
    {
      name: 'operation',
      title: '业务数据',
      tag: '招商',
      desc: '招商增量与风险量化',
      metrics: [
        { label: '合作区/珠海市重大项目招引', value: '18 项' },
        { label: '合作区招引企业税收贡献', value: '￥ 20 亿' },
        { label: '诉讼项目数量', value: '7 项' },
        { label: '珠海招引企业税收贡献', value: '￥ 22 亿' }
      ],
      chart: null
    },
    {
      name: 'hr',
      title: '人力资源',
      tag: '组织',
      desc: '人员规模与干部统计',
      metrics: [
        { label: '集团总人数', value: '12,504' },
        { label: '各版块总人数', value: '8,256' },
        { label: '各上市公司总人数', value: '4,248' },
        { label: '党员占比', value: '72%' }
      ],
      chart: null
    },
    {
      name: 'admin',
      title: '行政管理',
      tag: '督办',
      desc: '领导行程与督办执行',
      metrics: [
        { label: '督办事项完成率', value: '85%' },
        { label: '三会议召开次数', value: '36 次' }
      ],
      chart: null
    }
  ]
}

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
      { label: '战略新兴产业规模', value: '￥ 420 亿', trend: '+9.6%', trendType: 'up', section: '贡献与产值' },
      { label: '累计GDP贡献值（分板块）', value: '￥ 980 亿', trend: '+5.8%', trendType: 'up', section: '贡献与产值' },
      { label: '税收贡献（分板块）', value: '￥ 37.2 亿', trend: '+6.2%', trendType: 'up', section: '贡献与产值' },
      { label: '带动社会消费品零售额', value: '￥ 260 亿', trend: '+4.5%', trendType: 'up', section: '贡献与产值' },
      { label: '生产性服务占比', value: '36.5%', trend: '+1.2%', trendType: 'up', section: '贡献与产值' },
      { label: '费用压降情况（人力成本）', value: '-4.2%', trend: '+0.6%', trendType: 'up', section: '费用压降' },
      { label: '费用压降情况（财务费用）', value: '-3.1%', trend: '+0.4%', trendType: 'up', section: '费用压降' },
      { label: '费用压降情况（采购费用）', value: '-5.6%', trend: '+0.9%', trendType: 'up', section: '费用压降' },
      { label: '费用压降情况（工程建设成本）', value: '-2.8%', trend: '+0.3%', trendType: 'up', section: '费用压降' },
      { label: '费用压降情况（其他期间费用）', value: '-3.7%', trend: '+0.5%', trendType: 'up', section: '费用压降' }
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
    increase: '战略新兴产业规模 ￥ 420 亿',
    categories: [
      { name: '制造板块', value: 38, color: '#5accff' },
      { name: '服务板块', value: 34, color: '#36f1cd' },
      { name: '投资板块', value: 28, color: '#f8c547' }
    ],
    tags: ['制造板块 ￥ 372 亿', '服务板块 ￥ 333 亿', '投资板块 ￥ 275 亿'],
    trend: {
      labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
      values: [620, 680, 720, 800, 900, 980]
    }
  },
  investment: {
    progress: [
      { label: '人力成本压降', value: 82 },
      { label: '财务费用压降', value: 76 },
      { label: '采购费用压降', value: 84 },
      { label: '工程建设成本压降', value: 72 },
      { label: '其他期间费用压降', value: 78 }
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
      { label: '战略新兴产业规模', value: '￥ 420 亿' },
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

export const adminData = {
  hierarchy: {
    l1: ['领导行程', '督办事项完成率', '三会议召开次数']
  },
  // 督办事项完成率
  supervision: {
    completionRate: '85%'
  },
  // 三会议召开次数
  meeting: {
    total: '36 次',
    detail: {
      partyCommittee: 12,
      executiveOffice: 14,
      special: 10
    }
  },
  // 领导行程
  schedule: {
    list: [
      { time: '09:00', leader: '董事长', agenda: '季度经营会', location: '总部' },
      { time: '11:00', leader: '总经理', agenda: '重点项目调度', location: '视频会议' },
      { time: '14:30', leader: '财务总监', agenda: '预算执行复盘', location: '财务中心' },
      { time: '16:00', leader: '人力总监', agenda: '人才盘点会', location: '人力中心' }
    ]
  }
}

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
      { label: '营业收入', value: '￥ 1,452 亿' },
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

export const investmentData = {
  hierarchy: {
    l1: ['核心投资指标', '投后运营与效益'],
    l2: ['投资核心指标看板', '投资公司管理']
  },
  // 核心投资指标
  core: {
    investmentTotal: '￥ 120 亿',
    projectCount: '24 项',
    listedCompanyMarketValue: '￥ 860 亿'
  },
  // 市值趋势
  marketValueTrend: {
    labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
    values: [520, 580, 650, 720, 790, 860]
  }
}

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

export const keyProjectsData = {
  hierarchy: {
    l1: ['集团年度重点项目清单', '重点项目完成率']
  },
  // 重点项目数量
  projectCount: {
    label: '重点项目数量（待明细）',
    value: '待明细',
    note: '待接入经营调度系统后明确'
  },
  // 重点项目完成率
  completionRate: {
    value: 62,
    label: '重点项目完成率'
  }
}
