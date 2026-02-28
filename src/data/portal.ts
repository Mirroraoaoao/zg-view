export const portalData = {
  header: {
    title: '集团数据驾驶舱',
    subtitle: '企业经营全景态势一屏统览',
    status: '数据同步正常'
  },
  hero: {
    name: 'overall',
    title: '集团营收数据',
    subtitle: '集团核心经营成果总览',
    badge: '核心入口',
    metrics: [
      { label: '总营收', value: '￥ 1,452 亿' },
      { label: '境外营收', value: '￥ 186 亿' },
      { label: '利润总额', value: '￥ 328.5 亿' },
      { label: '净利润', value: '￥ 210.4 亿' },
      { label: '负债总额', value: '￥ 1,025 亿' },
      { label: '资产负债率', value: '48.7%' },
      { label: '经营性现金流净额', value: '￥ 86.5 亿' },
      { label: '净资产收益率（年化）', value: '19.5%' },
      { label: '营业现金比率', value: '6.0%' }
    ]
  },
  heroCharts: {
    trend: {
      labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
      revenue: [145, 168, 172, 185, 178, 192, 205, 207],
      profit:  [28,  33,  35,  40,  37,  43,  48,  51],
      debt:    [98, 102, 105, 108, 104, 107, 112, 115],
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
      desc: '融资结构与成本管理',
      metrics: [
        { label: '年度融资计划已完成额', value: '￥ 210 亿' },
        { label: '年度融资计划剩余额度', value: '￥ 90 亿' },
        { label: '银行贷款余额', value: '180' },
        { label: '债券余额', value: '60' },
        { label: '信托余额', value: '30' },
        { label: '融资租赁余额', value: '20' },
        { label: '其他融资余额', value: '10' },
        { label: '长期融资占比', value: '58%' },
        { label: '短期融资占比', value: '42%' },
      ],
      treasuryChart: {
        planTotal: 300,
        planDone: 210,
        loanBreakdown: [
          { name: '银行贷款', value: 180 },
          { name: '债券', value: 60 },
          { name: '信托', value: 30 },
          { name: '融资租赁', value: 20 },
          { name: '其他', value: 10 },
        ],
        longTermRatio: 58,
      },
    },
    {
      name: 'investment',
      title: '投资运营',
      tag: '投资',
      desc: '投资规模与上市公司市值',
      metrics: [
        { label: '可售房产面积总量', value: '312 万㎡' },
        { label: '基金投资总额', value: '￥ 120 亿' },
        { label: '股权项目总数量', value: '14 项' },
        { label: '基金项目总数量', value: '10 项' },
        { label: '投资回报率（ROI）', value: '8.6%' },
        { label: '控股上市公司市值', value: '￥ 860 亿' },
        { label: '年度分红', value: '￥ 12 亿' }
      ],
      marketCapTrend: {
        labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
        values: [720, 745, 780, 810, 796, 830, 855, 860],
      },
    },
    {
      name: 'operation',
      title: '业务数据',
      tag: '招商',
      desc: '招商增量与风险量化',
      metrics: [
        { label: '合作区重大项目新招引', value: '6 项' },
        { label: '合作区重大项目累计招引', value: '10 项' },
        { label: '珠海市重大项目新招引', value: '4 项' },
        { label: '珠海市重大项目累计招引', value: '8 项' },
        { label: '合作区招引企业税收贡献', value: '￥ 20 亿' },
        { label: '珠海招引企业税收贡献', value: '￥ 22 亿' },
        { label: '诉讼项目数量', value: '7 项' }
      ],
      operationChart: {
        // 新招引 vs 累计招引（合作区 / 珠海市）
        recruit: [
          { name: '合作区', current: 6, total: 10 },
          { name: '珠海市', current: 4, total: 8 },
        ],
        // 税收贡献
        taxContrib: [
          { name: '合作区', value: 20 },
          { name: '珠海市', value: 22 },
        ],
      },
    },
    {
      name: 'asset',
      title: '资产管理',
      tag: '运营',
      desc: '房产销售去化与物业租赁',
      metrics: [
        { label: '可售房产面积总量', value: '420 万㎡' },
        { label: '年度房产销售额', value: '￥ 68 亿' },
        { label: '年度累计租金收入', value: '￥ 18 亿' },
        { label: '物业总体出租率', value: '85%' }
      ],
      assetChart: {
        occupancyRate: 85,   // 物业出租率 %
      },
    }
  ],
  rightModules: [
    {
      name: 'projects',
      title: '重点项目',
      tag: '调度',
      desc: '年度重点项目进度管理',
      metrics: [
        { label: '年度重点任务数量', value: '48 项' },
        { label: '已办结数量', value: '30 项' }
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
        { label: '督办事项完成率', value: '85%' }
      ],
      chart: null
    }
  ]
}
