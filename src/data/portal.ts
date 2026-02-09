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
