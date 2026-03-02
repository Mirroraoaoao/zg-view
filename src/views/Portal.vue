<template>
  <div class="portal">
    <div class="portal-top-decor" :style="{ backgroundImage: `url(${topDecorSecondary})` }" aria-hidden="true">
      <div class="portal-top-decor-center" :style="{ backgroundImage: `url(${topDecorPrimary})` }"></div>
    </div>
    <div class="portal-bottom-decor left" :style="{ backgroundImage: `url(${bottomDecor})` }" aria-hidden="true"></div>
    <div class="portal-bottom-decor right" :style="{ backgroundImage: `url(${bottomDecor})` }" aria-hidden="true"></div>

    <header class="portal-header">
      <div class="time-box header-left">
        <div class="time-main">{{ dateTimeText }}</div>
      </div>
      <div class="brand brand-center">
        <div class="brand-plate">
          <img class="brand-logo" :src="brandLogoAlt" alt="LOGO" />
          <div class="brand-title">{{ headerTitle }}</div>
        </div>
        <div class="brand-sub">{{ headerSubtitle }}</div>
      </div>
      <div class="header-side header-right">
        <div class="status status-inline">
          <span class="status-dot"></span>
          {{ header.status }}
        </div>
      </div>
    </header>

    <main class="portal-layout">
      <!-- ══ 左侧：经营数据 C1 ══ -->
      <section class="panel-card panel-left" role="region" aria-label="经营数据">
        <div class="panel-header">
          <span class="panel-label">经营数据</span>
          <span class="panel-badge">C1</span>
          <span class="panel-desc">战略与资本管理</span>
        </div>

        <!-- 第一行：核心KPI，分三组展示 -->
        <div
          class="kpi-row"
          role="button"
          tabindex="0"
          @click="go('overall')"
          @keydown.enter="go('overall')"
          @keydown.space.prevent="go('overall')"
        >
          <!-- 组一：营收（总营收突出 + 境外营收） -->
          <div class="kpi-group kpi-group-revenue">
            <!-- 总营收：大字突出，带图标 -->
            <div class="kpi-hero-item">
              <div class="kpi-hero-lbl">
                <Income class="kpi-hero-icon" theme="filled" :size="14" fill="#5accff" />
                {{ kpiGroups[0][0].label }}
              </div>
              <div class="kpi-hero-val">{{ kpiGroups[0][0].display }}</div>
            </div>
            <!-- 境外营收 -->
            <div class="kpi-item kpi-item-sub">
              <Globe class="kpi-item-icon" theme="outline" :size="16" fill="#a6bad2" />
              <div class="kpi-body">
                <div class="kpi-lbl">{{ kpiGroups[0][1].label }}</div>
                <div class="kpi-val">{{ kpiGroups[0][1].display }}</div>
              </div>
            </div>
          </div>

          <div class="kpi-group-divider"></div>

          <!-- 组二：利润总额、净利润、负债总额、现金流净额 -->
          <div class="kpi-group kpi-group-profit">
            <div v-for="metric in kpiGroups[1]" :key="metric.label" class="kpi-item">
              <component
                :is="kpiIconMap[metric.label]"
                class="kpi-item-icon"
                theme="outline"
                :size="16"
                :fill="kpiIconColor[metric.label] ?? '#a6bad2'"
              />
              <div class="kpi-body">
                <div class="kpi-lbl">{{ metric.label }}</div>
                <div class="kpi-val">{{ metric.display }}</div>
              </div>
            </div>
          </div>

          <div class="kpi-group-divider"></div>

          <!-- 组三：资产负债率、净资产收益率、现金比率（仪表盘） -->
          <div class="kpi-group kpi-group-ratio">
            <div v-for="metric in kpiGroups[2]" :key="metric.label" class="kpi-item kpi-item-gauge">
              <div class="kpi-gauge-chart">
                <BaseChart :options="metric.gaugeOption" :ariaLabel="metric.label" />
              </div>
              <div class="kpi-body">
                <div class="kpi-lbl">{{ metric.label }}</div>
                <div class="kpi-val" :style="{ color: metric.gaugeColor }">{{ metric.display }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 内容区：4列×2行 网格 -->
        <div class="content-row">

          <!-- 格1-2：投资运营（跨2列，第1行） -->
          <div class="content-cell cell-invest">
            <div class="mg-title">{{ rightColModules[0].title }}</div>
            <div class="invest-body">
              <div class="invest-metrics">
                <!-- 普通指标（排除ROI） -->
                <template v-for="m in rightColModules[0].metrics" :key="m.label">
                  <div v-if="m.label !== '投资回报率（ROI）'" class="mg-item">
                    <span class="mg-label">{{ m.label }}</span>
                    <span class="mg-value">{{ m.value }}</span>
                  </div>
                </template>
                <!-- ROI 弧形仪表：固定在底部，与长期融资占比同款 -->
                <div class="mg-item invest-roi treasury-arc-row" style="align-items: center;justify-content: center;">
                  <div class="treasury-arc-chart" style="margin:0 20px">
                    <BaseChart :options="roiGaugeOption" ariaLabel="投资回报率（ROI）" />
                  </div>
                  <div class="treasury-arc-label">投资回报率<br/>（ROI）</div>
                </div>
              </div>
              <div v-if="marketCapOption" class="invest-chart">
                <div class="invest-chart-label">控股市值走势</div>
                <BaseChart :options="marketCapOption" ariaLabel="控股上市公司市值趋势" />
              </div>
            </div>
          </div>

          <!-- 格3-4：营收月度趋势（跨2列，第1行） -->
          <div class="content-cell cell-trend">
            <div class="chart-title">营收月度趋势</div>
            <div class="chart-body chart-body-sm">
              <BaseChart :options="heroTrendOption" ariaLabel="营收趋势折线图" />
            </div>
          </div>

          <!-- 格7-8：资金分析（第2行跨2列，2×2图表网格） -->
          <div class="content-cell cell-treasury">
            <div class="mg-title">{{ leftColModules[1].title }}</div>
            <div class="treasury-chart-grid">
              <!-- 图表2：融资余额构成 -->
              <div class="treasury-chart-cell">
                <div class="treasury-chart-label">融资余额构成（亿）</div>
                <BaseChart v-if="loanBreakdownOption" :options="loanBreakdownOption" ariaLabel="融资余额构成" />
              </div>
              <!-- 图表1：年度融资计划进度 -->
              <div class="treasury-chart-cell">
                <div class="treasury-chart-label">年度融资计划总额</div>
                <BaseChart v-if="planProgressOption" :options="planProgressOption" ariaLabel="年度融资计划进度" />
              </div>
              <!-- 图表4：负债期限结构 -->
              <div class="treasury-chart-cell">
                <div class="treasury-chart-label">负债期限结构</div>
                <BaseChart v-if="debtStructureOption" :options="debtStructureOption" ariaLabel="负债期限结构" />
              </div>
            </div>
          </div>

          <!-- 格6：资产管理（第2行第2列） -->
          <div class="content-cell cell-asset">
            <div class="mg-title">{{ rightColModules[2].title }}</div>
            <div class="asset-grid">
              <!-- 前3项文字 KPI 卡片 -->
              <div v-for="m in rightColModules[2].metrics.slice(0, 3)" :key="m.label" class="asset-kpi-card">
                <div class="asset-kpi-lbl">{{ m.label }}</div>
                <div class="asset-kpi-val">{{ m.value }}</div>
              </div>
              <!-- 出租率大仪表 -->
              <div v-if="occupancyOption" class="asset-gauge-card" style="padding:5px 0">
                <BaseChart :options="occupancyOption" ariaLabel="物业出租率" />
                <div class="asset-gauge-caption">物业出租率</div>
              </div>
            </div>
          </div>

          <!-- 格5：业务数据（第2行第1列，招引图表 + KPI卡片） -->
          <div class="content-cell cell-operation">
            <div class="mg-title">{{ rightColModules[1].title }}</div>
            <!-- 招引条形图（前4项） -->
            <div v-if="recruitBarOption" class="operation-bar-chart">
              <BaseChart :options="recruitBarOption" ariaLabel="重大项目招引情况" />
            </div>
            <!-- 后3项：mg-item 行式展示 -->
            <div class="operation-mg-list">
              <div
                v-for="m in rightColModules[1].metrics.slice(4)"
                :key="m.label"
                class="mg-item"
              >
                <span class="mg-label">{{ m.label }}</span>
                <span
                  class="mg-value"
                  :style="m.label === '诉讼项目数量' ? { color: 'var(--accent-rose)' } : {}"
                >{{ m.value }}</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- ══ 右侧：非经营数据 C2 ══ -->
      <section class="panel-card panel-right" role="region" aria-label="非经营数据">
        <div class="panel-header">
          <span class="panel-label">非经营数据</span>
          <span class="panel-badge">C2</span>
          <span class="panel-desc">资源与运营管理</span>
        </div>

        <!-- 上方：2×2 大数字卡片 -->
        <div class="right-grid">
          <div v-for="item in bigKpis" :key="item.label" class="big-kpi-card">
            <div class="big-kpi-accent" :style="{ background: item.color }"></div>
            <div class="big-kpi-icon">
              <component :is="item.icon" :size="24" :stroke-width="3" theme="outline" />
            </div>
            <div class="big-kpi-body">
              <div class="big-kpi-label">{{ item.label }}</div>
              <div class="big-kpi-value">{{ item.value }}</div>
            </div>
          </div>

          <!-- 下方：两个横向仪表盘卡片 -->
          <div v-for="item in gaugeItems" :key="item.label" class="gauge-card">
            <div class="gauge-chart">
              <BaseChart :options="item.option" :ariaLabel="item.label" />
            </div>
            <div class="gauge-info">
              <div class="gauge-label">{{ item.label }}</div>
              <div class="gauge-value" :style="{ color: item.color }">{{ item.value }}</div>
              <div class="gauge-sub">{{ item.sub }}</div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <nav class="portal-nav" aria-label="模块导航">
      <button
        v-for="(item, index) in navItems"
        :key="item.name"
        :ref="el => setNavRef(index, el)"
        class="nav-item"
        type="button"
        @click="go(item.name)"
        @keydown.right.prevent="focusNav(index, 1)"
        @keydown.left.prevent="focusNav(index, -1)"
      >
        <span class="nav-icon">{{ item.icon }}</span>
        <span class="nav-label">{{ item.label }}</span>
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseChart from '../components/BaseChart.vue'
import { Checklist, CheckOne, Peoples, EveryUser, Income, Globe, TrendingUp, IncomeOne, Bill, CycleArrow } from '@icon-park/vue-next'
import topDecorPrimary from '../assets/images/portal/portal-top-decor-center.webp'
import topDecorSecondary from '../assets/images/portal/portal-top-decor-bg.png'
import bottomDecor from '../assets/images/portal/portal-bottom-decor.png'
import brandLogoAlt from '../assets/images/portal/brand-logo-alt.png'
import { portalData } from '../data/mockDashboard'
import { useResponsiveScale } from '../composables/useResponsiveScale'
import { useCountUp } from '../composables/useCountUp'
import { createGradient, getBaseAxisConfig, getBaseGridConfig, getBaseTooltipConfig, getChartColors } from '../utils/chartTheme'
import { formatMetricText, parseMetricText } from '../utils/metricFormat'

const router = useRouter()
const now = ref(new Date())
const { scaleNumber, scaleFloat } = useResponsiveScale()
let timer = 0

const navItems = [
  { name: 'overall',    label: '经营数据', icon: '核心' },
  { name: 'finance',    label: '财务管理', icon: '财务' },
  { name: 'treasury',   label: '资金分析', icon: '资金' },
  { name: 'investment', label: '投资运营', icon: '投资' },
  { name: 'projects',   label: '重点项目', icon: '项目' },
  { name: 'asset',      label: '资产管理', icon: '资产' },
  { name: 'operation',  label: '业务数据', icon: '业务' },
  { name: 'hr',         label: '人力资源', icon: '人力' },
  { name: 'admin',      label: '行政管理', icon: '行政' },
]

const navRefs: Record<number, HTMLButtonElement | null> = {}
const setNavRef = (index: number, el: any) => { navRefs[index] = el as HTMLButtonElement | null }
const focusNav = (currentIndex: number, direction: number) => {
  const nextIndex = (currentIndex + direction + navItems.length) % navItems.length
  const nextEl = navRefs[nextIndex]
  if (nextEl) { nextEl.focus(); router.push({ name: navItems[nextIndex].name }) }
}

const { header, hero, heroCharts, leftModules, rightModules } = portalData
const headerTitle = header?.title?.trim() || '经营调度驾驶舱'
const headerSubtitle = header?.subtitle?.trim() || '企业经营全景态势一屏统览'

// 百分比指标色彩映射（ECharts 需要实际颜色值，不支持 CSS 变量）
const percentColorMap: Record<string, string> = {
  '资产负债率':           '#ff6b6b',
  '净资产收益率（年化）': '#7cf29a',
  '营业现金比率':         '#36f1cd',
}

const makeKpiGaugeOption = (value: number, color: string) => ({
  series: [{
    type: 'gauge',
    radius: '88%',
    startAngle: 210, endAngle: -30,
    min: 0, max: 100, splitNumber: 0,
    axisLine: {
      lineStyle: {
        width: scaleNumber(8, 6),
        color: [[value / 100, color], [1, 'rgba(255,255,255,0.07)']],
      },
    },
    pointer: { show: false },
    axisTick: { show: false }, splitLine: { show: false }, axisLabel: { show: false },
    detail: { show: false },
    data: [{ value }],
  }],
})

// hero metrics with count-up
const makeHeroMetric = (item: { label: string; value: string }) => {
  const parsed = parseMetricText(item.value)
  const isPercent = item.value.trim().endsWith('%')
  const gaugeColor = isPercent ? (percentColorMap[item.label] ?? 'var(--accent-cyan)') : ''
  const gaugeValue = isPercent ? parseFloat(item.value) : 0
  const gaugeOption = isPercent ? makeKpiGaugeOption(gaugeValue, gaugeColor) : null

  if (!parsed) return { ...item, display: item.value, isPercent, gaugeColor, gaugeOption }
  const displayValue = useCountUp(() => parsed.value, 1200, parsed.decimals)
  const display = computed(() => formatMetricText(parsed, displayValue.value))
  return { ...item, display, isPercent, gaugeColor, gaugeOption }
}

// 分三组：[总营收, 境外营收] | [利润总额, 净利润, 负债总额, 现金流净额] | [资产负债率, 净资产收益率, 现金比率]
const GROUP_LABELS = [
  ['总营收', '境外营收'],
  ['利润总额', '净利润', '负债总额', '经营性现金流净额'],
  ['资产负债率', '净资产收益率（年化）', '营业现金比率'],
] as const

const kpiGroups = GROUP_LABELS.map((labels) =>
  labels.map((lbl) => {
    const item = hero.metrics.find((m) => m.label === lbl) ?? { label: lbl, value: '-' }
    return makeHeroMetric(item)
  })
)

// 组二图标映射
const kpiIconMap: Record<string, any> = {
  '利润总额':       TrendingUp,
  '净利润':         IncomeOne,
  '负债总额':       Bill,
  '经营性现金流净额': CycleArrow,
}

// 组二图标颜色映射（语义色）
const kpiIconColor: Record<string, string> = {
  '利润总额':       '#36f1cd',
  '净利润':         '#7cf29a',
  '负债总额':       '#ff6b6b',
  '经营性现金流净额': '#5accff',
}

// 左列：财务 + 资金（前两个模块）
const leftColModules = leftModules.slice(0, 2)
// 右侧三列：投资、业务、资产（后三个模块）
const rightColModules = leftModules.slice(2)

// 业务数据：招引条形图（前4项）
const operationMod = leftModules.find(m => m.name === 'operation') as any
const operationChart = operationMod?.operationChart as {
  recruit: { name: string; current: number; total: number }[]
} | undefined

const recruitBarOption = computed(() => {
  if (!operationChart) return null
  const colors = getChartColors()
  const items = operationChart.recruit
  const names = items.map(i => i.name)
  return {
    grid: { top: scaleNumber(20, 16), bottom: scaleNumber(20, 16), left: scaleNumber(4, 4), right: scaleNumber(4, 4), containLabel: true },
    tooltip: {
      trigger: 'axis', axisPointer: { type: 'none' },
      appendToBody: true,
      backgroundColor: colors.bgPanel, borderColor: colors.border,
      textStyle: { color: colors.textPrimary, fontSize: scaleNumber(10, 9) },
    },
    legend: {
      top: 0, right: 0,
      itemWidth: scaleNumber(8, 7), itemHeight: scaleNumber(5, 4), itemGap: scaleNumber(8, 6),
      textStyle: { color: colors.textMuted, fontSize: scaleNumber(8, 7) },
    },
    xAxis: {
      type: 'category', data: names,
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: colors.textMuted, fontSize: scaleNumber(9, 8) },
    },
    yAxis: { type: 'value', show: false },
    series: [
      {
        name: '本年新招引',
        type: 'bar', barMaxWidth: scaleNumber(18, 14), barGap: '20%',
        data: items.map(i => i.current),
        itemStyle: { color: colors.profit, borderRadius: [3, 3, 0, 0] },
        label: { show: true, position: 'top', color: colors.profit, fontSize: scaleNumber(9, 8), fontFamily: 'Chakra Petch, sans-serif', formatter: '{c} 项' },
      },
      {
        name: '累计招引',
        type: 'bar', barMaxWidth: scaleNumber(18, 14),
        data: items.map(i => i.total),
        itemStyle: { color: colors.revenue, borderRadius: [3, 3, 0, 0] },
        label: { show: true, position: 'top', color: colors.revenue, fontSize: scaleNumber(9, 8), fontFamily: 'Chakra Petch, sans-serif', formatter: '{c} 项' },
      },
    ],
  }
})

// 投资回报率仪表盘（弧形，与长期融资占比同款）
const roiGaugeOption = computed(() => {
  const colors = getChartColors()
  const v = 8.6
  return {
    series: [{
      type: 'gauge',
      radius: '92%',
      startAngle: 200, endAngle: -20,
      min: 0, max: 20, splitNumber: 0,
      axisLine: {
        lineStyle: {
          width: scaleNumber(9, 7),
          color: [[v / 20, colors.performance], [1, 'rgba(255,255,255,0.07)']],
        },
      },
      pointer: { show: false },
      axisTick: { show: false }, splitLine: { show: false }, axisLabel: { show: false },
      detail: {
        valueAnimation: true,
        formatter: '{value}%',
        color: colors.performance,
        fontSize: scaleNumber(14, 11),
        fontFamily: 'Chakra Petch, sans-serif',
        offsetCenter: [0, '8%'],
      },
      title: { offsetCenter: [0, '50%'], color: colors.textMuted, fontSize: scaleNumber(8, 7), fontFamily: 'Noto Sans SC, sans-serif' },
      data: [{ value: v, name: 'ROI' }],
    }],
  }
})

// 资金分析：4个图表
const treasuryMod = leftModules.find(m => m.name === 'treasury') as any
const treasuryChart = treasuryMod?.treasuryChart as {
  planTotal: number
  planDone: number
  loanBreakdown: { name: string; value: number }[]
  longTermRatio: number
} | undefined

// 图表1：年度融资计划进度 — 环形饼图（完成 vs 剩余）
const planProgressOption = computed(() => {
  if (!treasuryChart) return null
  const colors = getChartColors()
  const done = treasuryChart.planDone
  const rest = treasuryChart.planTotal - done
  return {
    tooltip: {
      trigger: 'item',
      appendToBody: true,
      backgroundColor: colors.bgPanel, borderColor: colors.border,
      textStyle: { color: colors.textPrimary, fontSize: scaleNumber(10, 9) },
      formatter: (p: any) => `${p.name}：￥${p.value} 亿 (${p.percent}%)`,
    },
    series: [{
      type: 'pie',
      radius: ['52%', '76%'],
      center: ['50%', '50%'],
      startAngle: 90,
      label: { show: false },
      labelLine: { show: false },
      data: [
        {
          value: done, name: '已完成',
          itemStyle: { color: colors.target },
          label: {
            show: true, position: 'center',
            formatter: () => `{val|￥${done}亿}\n{sub|已完成额}`,
            rich: {
              val: { color: colors.target, fontSize: scaleNumber(16, 13), fontFamily: 'Chakra Petch, sans-serif', fontWeight: 700, lineHeight: scaleNumber(20, 17) },
              sub: { color: colors.textMuted, fontSize: scaleNumber(9, 8), fontFamily: 'Noto Sans SC, sans-serif', lineHeight: scaleNumber(14, 12) },
            },
          },
        },
        { value: rest, name: '剩余额度', itemStyle: { color: 'rgba(255,255,255,0.07)' } },
      ],
    }],
  }
})

// 图表2：融资余额构成 — 横向条形图
const loanBreakdownOption = computed(() => {
  if (!treasuryChart) return null
  const colors = getChartColors()
  const items = [...treasuryChart.loanBreakdown].sort((a, b) => a.value - b.value)
  const barColors = [colors.revenue, colors.profit, colors.target, colors.performance, colors.cost]
  return {
    grid: { top: 4, bottom: 4, left: 4, right: scaleNumber(48, 38), containLabel: true },
    tooltip: {
      trigger: 'axis', axisPointer: { type: 'none' },
      appendToBody: true,
      backgroundColor: colors.bgPanel, borderColor: colors.border,
      textStyle: { color: colors.textPrimary, fontSize: scaleNumber(10, 9) },
      formatter: (p: any[]) => `${p[0].name}：￥${p[0].value} 亿`,
    },
    xAxis: { type: 'value', show: false },
    yAxis: {
      type: 'category',
      data: items.map(i => i.name),
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: colors.textMuted, fontSize: scaleNumber(9, 8) },
    },
    series: [{
      type: 'bar',
      data: items.map((item, i) => ({
        value: item.value,
        itemStyle: { color: barColors[i % barColors.length], borderRadius: [0, 3, 3, 0] },
      })),
      barMaxWidth: scaleNumber(10, 8),
      label: {
        show: true, position: 'right',
        fontSize: scaleNumber(9, 8), fontFamily: 'Chakra Petch, sans-serif',
        color: colors.textSecondary, formatter: '￥{c}亿',
      },
    }],
  }
})

// 图表4：负债期限结构 — 饼图（长期 vs 短期）
const debtStructureOption = computed(() => {
  if (!treasuryChart) return null
  const colors = getChartColors()
  const longRatio = treasuryChart.longTermRatio
  const shortRatio = 100 - longRatio
  return {
    tooltip: {
      trigger: 'item',
      appendToBody: true,
      backgroundColor: colors.bgPanel, borderColor: colors.border,
      textStyle: { color: colors.textPrimary, fontSize: scaleNumber(10, 9) },
      formatter: (p: any) => `${p.name}：${p.value}%`,
    },
    legend: {
      bottom: 0, left: 'center',
      textStyle: { color: colors.textSecondary, fontSize: scaleNumber(9, 8) },
      itemWidth: scaleNumber(8, 7), itemHeight: scaleNumber(5, 4), itemGap: scaleNumber(10, 8),
    },
    series: [{
      type: 'pie',
      radius: ['52%', '76%'],
      center: ['50%', '46%'],
      startAngle: 90,
      label: { show: false },
      labelLine: { show: false },
      data: [
        {
          value: longRatio, name: '长期融资',
          itemStyle: { color: colors.profit },
          label: {
            show: true, position: 'center',
            formatter: () => `{val|${longRatio}%}\n{sub|长期融资}`,
            rich: {
              val: { color: colors.profit, fontSize: scaleNumber(16, 13), fontFamily: 'Chakra Petch, sans-serif', fontWeight: 700, lineHeight: scaleNumber(20, 17) },
              sub: { color: colors.textMuted, fontSize: scaleNumber(9, 8), fontFamily: 'Noto Sans SC, sans-serif', lineHeight: scaleNumber(14, 12) },
            },
          },
        },
        { value: shortRatio, name: '短期融资', itemStyle: { color: colors.revenue } },
      ],
    }],
  }
})

// 投资运营：市值趋势图
const investmentMod = leftModules.find(m => m.name === 'investment') as any
const marketCapTrend = investmentMod?.marketCapTrend as { labels: string[]; values: number[] } | undefined

const marketCapOption = computed(() => {
  if (!marketCapTrend) return null
  const colors = getChartColors()
  const scale = { scaleNumber }
  const baseAxis = getBaseAxisConfig(colors, scale)
  const lastValue = marketCapTrend.values[marketCapTrend.values.length - 1]
  return {
    grid: { top: scaleNumber(10, 8), bottom: scaleNumber(22, 18), left: scaleNumber(4, 4), right: scaleNumber(4, 4), containLabel: false },
    tooltip: { ...getBaseTooltipConfig(colors, scale), formatter: (p: any) => `${p[0].axisValue}: ￥ ${p[0].value} 亿` },
    xAxis: { ...baseAxis.xAxis, type: 'category', data: marketCapTrend.labels, axisLabel: { ...baseAxis.xAxis.axisLabel, fontSize: scaleNumber(8, 7), show: true } },
    yAxis: { ...baseAxis.yAxis, type: 'value', axisLabel: { show: false }, splitLine: { show: false }, min: 'dataMin' },
    series: [{
      name: '控股上市公司市值',
      type: 'line',
      data: marketCapTrend.values,
      smooth: true,
      showSymbol: true,
      symbol: 'circle',
      symbolSize: (val: number) => val === lastValue ? scaleNumber(8, 6) : 0,
      lineStyle: { color: colors.target, width: scaleFloat(2, 1.5) },
      itemStyle: { color: colors.target, borderColor: colors.textPrimary, borderWidth: 1.5 },
      areaStyle: { color: createGradient('target', 'vertical', 0.2, 0) },
      label: {
        show: true,
        formatter: (p: any) => p.dataIndex === marketCapTrend.values.length - 1 ? `￥${p.value}亿` : '',
        position: 'top',
        color: colors.target,
        fontSize: scaleNumber(9, 8),
        fontFamily: 'Chakra Petch, sans-serif',
      },
    }],
  }
})

// 资产管理：出租率环形图
const assetMod = leftModules.find(m => m.name === 'asset') as any
const assetChart = assetMod?.assetChart as { occupancyRate: number } | undefined

const occupancyOption = computed(() => {
  if (!assetChart) return null
  const colors = getChartColors()
  const v = assetChart.occupancyRate
  return {
    series: [{
      type: 'gauge',
      radius: '92%',
      startAngle: 210, endAngle: -30,
      min: 0, max: 100, splitNumber: 0,
      axisLine: {
        lineStyle: {
          width: scaleNumber(9, 7),
          color: [[v / 100, colors.performance], [1, 'rgba(255,255,255,0.07)']],
        },
      },
      pointer: { show: false },
      axisTick: { show: false }, splitLine: { show: false }, axisLabel: { show: false },
      detail: {
        valueAnimation: true, formatter: '{value}%',
        color: colors.performance, fontSize: scaleNumber(13, 10),
        fontFamily: 'Chakra Petch, sans-serif', offsetCenter: [0, '5%'],
      },
      data: [{ value: v }],
    }],
  }
})

// 右侧大数字 KPI（重点项目 + 人力）
const bigKpis = [
  { label: '年度重点任务数量', value: rightModules[0].metrics[0]?.value ?? '48 项',  icon: Checklist, color: 'var(--accent-amber)' },
  { label: '已办结数量',       value: rightModules[0].metrics[1]?.value ?? '30 项',  icon: CheckOne,  color: 'var(--accent-lime)' },
  { label: '集团总人数',       value: rightModules[1].metrics[0]?.value ?? '12,504', icon: Peoples,   color: 'var(--accent-cyan)' },
  { label: '各版块总人数',     value: rightModules[1].metrics[1]?.value ?? '8,256',  icon: EveryUser, color: 'var(--accent-blue)' },
]

// 右侧圆形进度（党员占比 + 督办事项完成率）
const makeGaugeOption = (value: number, color: string) => {
  return {
    series: [{
      type: 'gauge',
      radius: '90%',
      startAngle: 210,
      endAngle: -30,
      min: 0,
      max: 100,
      splitNumber: 0,
      axisLine: {
        lineStyle: {
          width: scaleNumber(10, 8),
          color: [[value / 100, color], [1, 'rgba(255,255,255,0.08)']],
        },
      },
      pointer: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      detail: {
        valueAnimation: true,
        formatter: '{value}%',
        color: '#e6f1ff',
        fontSize: scaleNumber(16, 13),
        fontFamily: 'Chakra Petch, sans-serif',
        offsetCenter: [0, '5%'],
      },
      data: [{ value }],
    }],
  }
}

const gaugeItems = computed(() => {
  const colors = getChartColors()
  return [
    {
      label: '党员占比',
      value: rightModules[1].metrics[2]?.value ?? '72%',
      sub: '中层干部党员',
      color: colors.profit,
      option: makeGaugeOption(72, colors.profit),
    },
    {
      label: '督办事项完成率',
      value: rightModules[2].metrics[0]?.value ?? '85%',
      sub: '本年度完成情况',
      color: colors.revenue,
      option: makeGaugeOption(85, colors.revenue),
    },
  ]
})

const pad = (n: number) => n.toString().padStart(2, '0')
const timeText = computed(() => `${pad(now.value.getHours())}:${pad(now.value.getMinutes())}:${pad(now.value.getSeconds())}`)
const dateTimeText = computed(() => `${now.value.getFullYear()}-${pad(now.value.getMonth() + 1)}-${pad(now.value.getDate())} ${timeText.value}`)

const heroTrendOption = computed(() => {
  const colors = getChartColors()
  const scale = { scaleNumber }
  const baseAxis = getBaseAxisConfig(colors, scale)
  const trend = heroCharts.trend
  return {
    grid: { ...getBaseGridConfig(scale), top: scaleNumber(28, 24), bottom: scaleNumber(20, 18), left: scaleNumber(32, 28), right: scaleNumber(12, 10) },
    tooltip: {
      ...getBaseTooltipConfig(colors, scale),
      trigger: 'axis',
      formatter: (params: any[]) => {
        const lines = params.map((p: any) => `<span style="color:${p.color}">●</span> ${p.seriesName}: ${p.value} 亿`)
        return `${params[0].axisValue}<br/>${lines.join('<br/>')}`
      },
    },
    legend: {
      data: ['营收', '利润', '负债'],
      top: 2,
      right: 8,
      itemWidth: scaleNumber(10, 8),
      itemHeight: scaleNumber(6, 5),
      textStyle: { color: colors.textMuted, fontSize: scaleNumber(9, 8), fontFamily: 'Noto Sans SC, Microsoft YaHei, sans-serif' },
    },
    ...baseAxis,
    xAxis: { ...baseAxis.xAxis, type: 'category', data: trend.labels, axisLabel: { ...baseAxis.xAxis.axisLabel, fontSize: scaleNumber(9, 8) } },
    yAxis: { ...baseAxis.yAxis, type: 'value', axisLabel: { show: false }, splitLine: { lineStyle: { color: colors.splitLine } } },
    series: [
      {
        name: '营收',
        type: 'line', data: trend.revenue, smooth: true, showSymbol: false,
        lineStyle: { color: colors.revenue, width: scaleFloat(2, 1.5) },
        itemStyle: { color: colors.revenue },
        areaStyle: { color: createGradient('revenue', 'vertical', 0.18, 0) },
      },
      {
        name: '利润',
        type: 'line', data: trend.profit, smooth: true, showSymbol: false,
        lineStyle: { color: colors.profit, width: scaleFloat(2, 1.5) },
        itemStyle: { color: colors.profit },
        areaStyle: { color: createGradient('profit', 'vertical', 0.15, 0) },
      },
      {
        name: '负债',
        type: 'line', data: trend.debt, smooth: true, showSymbol: false,
        lineStyle: { color: colors.cost, width: scaleFloat(2, 1.5), type: 'dashed' },
        itemStyle: { color: colors.cost },
      },
    ],
  }
})

const go = (name: string) => router.push({ name })

onMounted(() => {
  timer = window.setInterval(() => { now.value = new Date() }, 1000)
  requestAnimationFrame(() => requestAnimationFrame(() => window.dispatchEvent(new Event('resize'))))
})
onUnmounted(() => window.clearInterval(timer))
</script>

<style scoped lang="scss">
.portal {
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  padding: var(--space-2) var(--space-4) var(--space-3);
  gap: var(--space-2);
  position: relative;
  overflow: hidden;
}

/* ── 装饰 ── */
.portal-top-decor {
  position: absolute; top: 0; left: 0; right: 0;
  height: clamp(80px, 10vh, 170px);
  background: center top / cover no-repeat;
  opacity: 0.6; z-index: 1;
  display: flex; justify-content: center; align-items: flex-start;
}
.portal-top-decor-center {
  width: clamp(680px, 62vw, 1180px); max-width: 92vw;
  height: clamp(70px, 10vh, 140px);
  background: center / 100% 100% no-repeat;
  position: relative; z-index: 1; opacity: 0.8;
}
.portal-bottom-decor {
  position: absolute; bottom: 0;
  width: clamp(320px, 28vw, 520px); height: clamp(36px, 3vh, 72px);
  background: bottom left / 100% 100% no-repeat;
  opacity: 0.4; pointer-events: none; z-index: 1; filter: saturate(1.1);
}
.portal-bottom-decor.left { left: 0; }
.portal-bottom-decor.right { right: 0; transform: scaleX(-1); }

/* ── 头部 ── */
.portal-header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  column-gap: var(--space-4);
  position: relative; z-index: 2;
  min-height: clamp(44px, 4.2vh, 72px);
  padding: clamp(6px, 0.9vh, 14px) var(--space-4) clamp(6px, 0.8vh, 12px);
  flex-shrink: 0;
}
.brand { display: flex; flex-direction: column; gap: clamp(4px, 0.45vw, 10px); }
.brand-center { text-align: center; align-items: center; justify-self: center; transform: translateY(-4px); }
.brand-plate { display: inline-flex; align-items: center; gap: clamp(8px, 0.7vw, 16px); }
.brand-logo { height: calc(var(--text-3xl) * 1.2 + 2px); width: auto; max-height: clamp(48px, 3.8vw, 92px); object-fit: contain; opacity: 0.9; }
.brand-title { font-family: var(--font-display); font-size: clamp(24px, 1.6vw, 44px); letter-spacing: 0.2em; color: var(--text-strong); text-shadow: 0 0 20px rgba(90,204,255,0.55); transform: translateY(-2px); }
.brand-sub { margin-top: -4px; font-size: clamp(10px, 0.6vw, 16px); letter-spacing: 0.14em; text-transform: uppercase; color: rgba(198,220,242,0.8); }
.header-side { display: flex; align-items: center; gap: var(--space-1); }
.header-left { justify-self: start; }
.header-right { justify-self: end; }
.time-box { display: flex; flex-direction: column; align-items: flex-end; }
.time-box.header-left { align-items: flex-start; }
.time-main { font-family: var(--font-display); font-size: clamp(12px, 0.75vw, 18px); letter-spacing: 0.14em; color: var(--text-secondary); text-shadow: 0 0 12px rgba(90,204,255,0.35); }
.status { display: inline-flex; align-items: center; gap: var(--space-1); padding: clamp(3px, 0.35vw, 8px) clamp(8px, 0.7vw, 16px); border-radius: 999px; background: var(--status-bg); border: 1px solid var(--status-border); font-size: var(--text-xs); color: var(--accent-cyan); letter-spacing: 0.12em; }
.status-dot { width: clamp(6px, 0.45vw, 10px); height: clamp(6px, 0.45vw, 10px); border-radius: 50%; background: var(--accent-cyan); box-shadow: var(--status-glow); animation: pulse 1.6s ease-in-out infinite; }

/* ── 主布局 ── */
.portal-layout {
  flex: 1; min-height: 0;
  display: grid;
  grid-template-columns: 7fr 3fr;
  gap: clamp(8px, 0.8vw, 16px);
  overflow: hidden;
  position: relative; z-index: 2;
}

/* ── 大面板卡片 ── */
.panel-card {
  display: flex; flex-direction: column;
  gap: clamp(6px, 0.5vh, 10px);
  padding: clamp(10px, 0.85vw, 18px) clamp(12px, 1vw, 20px);
  border-radius: clamp(16px, 1.2vw, 26px);
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  box-shadow: var(--hero-shadow);
  min-height: 0; overflow: hidden; position: relative;

  &::before {
    content: '';
    position: absolute; top: 0; left: 10%; right: 10%; height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent-cyan), transparent);
    opacity: 0.3;
  }
}

/* ── 面板头部 ── */
.panel-header {
  display: flex; align-items: center; gap: var(--space-2);
  flex-shrink: 0;
  padding-bottom: clamp(5px, 0.4vh, 8px);
  border-bottom: 1px solid rgba(90,204,255,0.1);
}
.panel-label { font-family: var(--font-display); font-size: clamp(13px, 0.9vw, 20px); letter-spacing: 0.18em; color: var(--text-primary); }
.panel-badge { font-size: var(--text-xxs); padding: 2px clamp(6px, 0.5vw, 12px); border-radius: 999px; border: 1px solid var(--chip-border); background: var(--chip-bg); color: var(--accent-amber); letter-spacing: 0.08em; }
.panel-desc { font-size: var(--text-xxs); color: var(--text-muted); letter-spacing: 0.1em; }

/* ══ 左侧：KPI 行 ══ */
.kpi-row {
  flex: 0 0 25%;
  min-height: 0;
  display: flex;
  align-items: stretch;
  gap: 0;
  padding: clamp(8px, 0.7vh, 14px) clamp(12px, 1vw, 20px);
  border-radius: clamp(10px, 0.7vw, 16px);
  background: var(--hero-bg);
  border: 1px solid var(--hero-border);
  cursor: pointer;
  transition: var(--transition-transform), var(--transition-shadow);
  position: relative; overflow: hidden;

  &::after { content: ''; position: absolute; inset: 0; background: var(--hero-glow); opacity: 0.35; pointer-events: none; }
  &:hover { transform: translateY(-1px); box-shadow: var(--nav-hover-shadow); }
}

/* 分组容器 */
.kpi-group {
  display: flex;
  align-items: center;
  gap: clamp(6px, 0.5vw, 12px);
  flex: 1; min-width: 0;
  z-index: 1;
}

/* 组一：营收组（纵向堆叠） */
.kpi-group-revenue {
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex: 0 0 auto;
  padding-right: clamp(10px, 0.9vw, 18px);
  gap: clamp(6px, 0.5vh, 12px);
}

/* 组二：利润组（2×2 网格，4项） */
.kpi-group-profit {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: clamp(4px, 0.35vh, 8px) clamp(6px, 0.5vw, 12px);
  padding: 0 clamp(10px, 0.9vw, 18px);
  align-items: stretch;
}

/* 组三：比率组（横向，3项仪表） */
.kpi-group-ratio {
  flex-direction: row;
  justify-content: space-around;
  padding-left: clamp(10px, 0.9vw, 18px);
}

/* 分组竖线分隔 */
.kpi-group-divider {
  width: 1px;
  align-self: stretch;
  background: rgba(90,204,255,0.15);
  flex-shrink: 0;
  margin: clamp(4px, 0.5vh, 10px) 0;
}

/* 总营收大字突出 */
.kpi-hero-item {
  display: flex; flex-direction: column;
  gap: clamp(2px, 0.2vh, 4px);
}

.kpi-hero-lbl {
  font-size: clamp(10px, 0.65vw, 13px);
  color: var(--accent-cyan);
  letter-spacing: 0.1em;
  opacity: 0.9;
}

.kpi-hero-val {
  font-family: var(--font-display);
  font-size: clamp(28px, 2.4vw, 52px);
  font-weight: 700;
  color: var(--accent-blue);
  letter-spacing: 0.03em;
  white-space: nowrap;
  text-shadow: 0 0 clamp(12px, 1vw, 24px) rgba(90, 204, 255, 0.55);
  line-height: 1.05;
}

/* 境外营收（组一第二项） */
.kpi-item-sub {
  flex: none !important;
}

.kpi-item {
  flex: 1; min-width: 0;
  display: flex; align-items: center; gap: clamp(5px, 0.4vw, 9px);
  padding: 0 clamp(4px, 0.3vw, 7px);
  z-index: 1;
}

.kpi-item-gauge {
  gap: clamp(4px, 0.35vw, 8px);
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.kpi-gauge-chart {
  flex-shrink: 0;
  width: clamp(44px, 3.6vw, 72px);
  height: clamp(44px, 3.6vw, 72px);
}

.kpi-icon {
  font-size: clamp(11px, 0.7vw, 15px);
  color: var(--accent-cyan);
  opacity: 0.6;
  flex-shrink: 0;
}

.kpi-hero-icon {
  vertical-align: middle;
  margin-right: 3px;
  opacity: 0.85;
  flex-shrink: 0;
}

.kpi-item-icon {
  flex-shrink: 0;
  opacity: 0.85;
}

/* 指标行内仪表盘（投资ROI等） */
.mg-item-gauge {
  align-items: center;
  gap: clamp(4px, 0.3vw, 7px);
  padding: clamp(2px, 0.18vh, 4px) 0;
  border-bottom: 1px solid rgba(90,204,255,0.06);

  &:last-child { border-bottom: none; }
}

.mg-gauge-chart {
  flex-shrink: 0;
  width: clamp(28px, 2.2vw, 40px);
  height: clamp(28px, 2.2vw, 40px);
}

.mg-gauge-body {
  display: flex; flex-direction: column;
  gap: 1px; min-width: 0;
}

.kpi-body {
  min-width: 0;
  display: flex; flex-direction: column;
  gap: clamp(2px, 0.2vh, 4px);
}

.kpi-lbl {
  font-size: clamp(10px, 0.65vw, 13px);
  color: var(--text-muted);
  letter-spacing: 0.04em;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}

/* 组三（仪表盘下方）标签居中 */
.kpi-item-gauge .kpi-body {
  align-items: center;
}

.kpi-item-gauge .kpi-lbl {
  text-align: center;
}

.kpi-val {
  font-family: var(--font-display);
  font-size: clamp(14px, 1.1vw, 22px);
  color: var(--text-primary);
  white-space: nowrap;
  line-height: 1.1;
}

/* 组三仪表盘下方数值 */
.kpi-item-gauge .kpi-val {
  font-size: clamp(13px, 1vw, 20px);
  text-align: center;
}

/* ══ 左侧：内容区（4列×2行网格） ══ */
.content-row {
  flex: 1; min-height: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-rows: 1fr 1fr;
  gap: clamp(6px, 0.5vw, 10px);
  overflow: hidden;
}

/* 通用单元格 */
.content-cell {
  display: flex; flex-direction: column;
  padding: clamp(8px, 0.6vw, 14px) clamp(10px, 0.75vw, 16px);
  border-radius: clamp(10px, 0.7vw, 14px);
  background: var(--chart-container-bg);
  border: 1px solid rgba(90,204,255,0.1);
  min-height: 0; overflow: hidden;
}

/* 格1-2：投资运营，第1行跨2列 */
.cell-invest {
  grid-column: 1 / 3;
  grid-row: 1;
}

/* 格3-4：营收趋势，第1行跨2列 */
.cell-trend {
  grid-column: 3 / 5;
  grid-row: 1;
}

/* 格5：业务数据，第2行第1列 */
.cell-operation {
  grid-column: 1;
  grid-row: 2;
}

/* 格6：资产管理，第2行第2列 */
.cell-asset {
  grid-column: 2;
  grid-row: 2;
}

/* 格7-8：资金分析，第2行跨2列 */
.cell-treasury {
  grid-column: 3 / 5;
  grid-row: 2;
}

/* 投资运营内部布局：指标列 + 图表列 */
.invest-body {
  flex: 1; min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
  gap: clamp(6px, 0.5vw, 10px);
  overflow: hidden;
}

.invest-metrics {
  display: flex; flex-direction: column;
  gap: 0; min-height: 0; overflow: hidden;
}

.invest-roi {
  margin-top: auto;
  border-bottom: none;
  display:flex;
  align-items: center;
  justify-content: center;
}

/* 业务数据：招引条形图 */
.operation-bar-chart {
  flex: 1; min-height: 0;
}

/* 业务数据：底部行式指标列表 */
.operation-mg-list {
  flex: 0 0 auto;
  display: flex; flex-direction: column;
  margin-top: clamp(4px, 0.35vh, 7px);
}

.op-kpi-alert {
  background: rgba(255,107,107,0.06) !important;
  border-color: rgba(255,107,107,0.2) !important;
}

.chart-body-sm {
  flex: 0 0 clamp(80px, 22%, 160px);
  min-height: 0;
  padding: clamp(4px, 0.3vw, 8px) clamp(8px, 0.6vw, 12px) 0;
}


.chart-title {
  font-size: var(--text-xxs);
  color: var(--text-muted);
  letter-spacing: 0.14em;
  padding: clamp(8px, 0.6vw, 12px) clamp(8px, 0.6vw, 12px) 0;
  margin-bottom: var(--space-1);
  flex-shrink: 0;
}

.chart-body {
  flex: 1; min-height: 0;
}

/* 通用指标分组 */
.metric-group {
  display: flex; flex-direction: column;
  min-height: 0; overflow: hidden;
}

/* 投资运营：图表占剩余高度 */
.invest-chart {
  flex: 1; min-height: 0;
  display: flex; flex-direction: column;
}

.invest-chart-label {
  font-size: clamp(8px, 0.55vw, 11px);
  color: var(--text-muted);
  letter-spacing: 0.1em;
  flex-shrink: 0;
  margin-bottom: 2px;
}

/* 资金分析：3列图表网格 */
.treasury-chart-grid {
  flex: 1; min-height: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: clamp(5px, 0.45vw, 9px);
  overflow: hidden;
}

.treasury-chart-cell {
  display: flex; flex-direction: column;
  min-height: 0; overflow: hidden;
  border-radius: clamp(6px, 0.45vw, 10px);
  background: rgba(90,204,255,0.03);
  border: 1px solid rgba(90,204,255,0.08);
  padding: clamp(4px, 0.35vw, 7px);
}

.treasury-chart-label {
  font-size: clamp(9px, 0.58vw, 11px);
  color: var(--text-muted);
  letter-spacing: 0.07em;
  flex-shrink: 0;
  margin-bottom: 2px;
}

.treasury-arc-row {
  flex: 1; min-height: 0;
  display: flex; align-items: center;
  gap: clamp(4px, 0.4vw, 8px);
  margin-top: clamp(2px, 0.2vh, 4px);
}

.treasury-arc-chart {
  flex: 0 0 clamp(44px, 5.5vh, 72px);
  height: clamp(44px, 5.5vh, 72px);
  min-height: 0;
}

.treasury-arc-label {
  font-size: clamp(9px, 0.6vw, 12px);
  color: var(--text-muted);
  letter-spacing: 0.08em;
  line-height: 1.4;
}

/* 资产管理：2×2网格 */
.asset-grid {
  flex: 1; min-height: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: clamp(5px, 0.45vw, 9px);
  overflow: hidden;
}

.asset-kpi-card {
  display: flex; flex-direction: column;
  justify-content: center;
  gap: clamp(3px, 0.28vh, 6px);
  padding: clamp(6px, 0.5vw, 10px);
  border-radius: clamp(6px, 0.45vw, 10px);
  background: rgba(90,204,255,0.04);
  border: 1px solid rgba(90,204,255,0.1);
  min-height: 0; overflow: hidden;
}

.asset-kpi-lbl {
  font-size: clamp(9px, 0.6vw, 12px);
  color: var(--text-muted);
  letter-spacing: 0.05em;
  line-height: 1.3;
}

.asset-kpi-val {
  font-family: var(--font-display);
  font-size: clamp(14px, 1.1vw, 22px);
  color: var(--text-primary);
  white-space: nowrap;
  line-height: 1.1;
}

.asset-gauge-card {
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  border-radius: clamp(6px, 0.45vw, 10px);
  background: rgba(124,242,154,0.04);
  border: 1px solid rgba(124,242,154,0.15);
  padding: clamp(4px, 0.35vh, 7px);
  min-height: 0; overflow: hidden;

  .echarts-container, canvas { flex: 1; min-height: 0; width: 100% !important; }
}

.asset-gauge-caption {
  font-size: clamp(9px, 0.58vw, 11px);
  color: var(--text-muted);
  letter-spacing: 0.08em;
  margin-top: clamp(2px, 0.2vh, 4px);
  flex-shrink: 0;
}

.mg-title {
  font-family: var(--font-display);
  font-size: clamp(10px, 0.65vw, 13px);
  letter-spacing: 0.12em;
  color: var(--accent-cyan);
  opacity: 0.85;
  margin-bottom: clamp(4px, 0.35vh, 7px);
  flex-shrink: 0;
  border-bottom: 1px solid rgba(90,204,255,0.12);
  padding-bottom: clamp(3px, 0.25vh, 5px);
}

.mg-item {
  display: flex; align-items: baseline; justify-content: space-between;
  gap: clamp(3px, 0.25vw, 6px);
  padding: clamp(2px, 0.22vh, 4px) 0;
  border-bottom: 1px solid rgba(90,204,255,0.06);
  min-height: 0;

  &:last-child { border-bottom: none; }
}

.mg-label {
  color: var(--text-muted);
  font-size: clamp(9px, 0.6vw, 12px);
  letter-spacing: 0.03em;
  flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}

.mg-value {
  font-family: var(--font-display);
  color: var(--text-primary);
  font-size: clamp(11px, 0.75vw, 15px);
  white-space: nowrap; flex-shrink: 0;
  text-shadow: 0 0 8px rgba(90,204,255,0.22);
}

/* ══ 右侧：6格等高网格 ══ */
.right-grid {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(3, minmax(0, 1fr));
  gap: clamp(6px, 0.5vw, 10px);
}

.big-kpi-card {
  display: flex;
  align-items: center;
  gap: clamp(8px, 0.65vw, 14px);
  padding: clamp(10px, 0.85vh, 16px) clamp(10px, 0.8vw, 16px);
  border-radius: clamp(10px, 0.75vw, 16px);
  background: var(--metric-bg);
  border: 1px solid var(--metric-border);
  position: relative;
  overflow: hidden;
}

.big-kpi-accent {
  position: absolute;
  left: 0; top: 20%; bottom: 20%;
  width: 3px;
  border-radius: 0 2px 2px 0;
  opacity: 0.9;
}

.big-kpi-icon {
  font-size: clamp(18px, 1.4vw, 28px);
  flex-shrink: 0;
  opacity: 0.85;
  line-height: 1;
  color: var(--accent-cyan);
  display: flex;
  align-items: center;
  justify-content: center;
}

.big-kpi-body {
  display: flex;
  flex-direction: column;
  gap: clamp(3px, 0.25vh, 5px);
  min-width: 0;
}

.big-kpi-label {
  font-size: clamp(10px, 0.62vw, 13px);
  color: var(--text-muted);
  letter-spacing: 0.08em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.big-kpi-value {
  font-family: var(--font-display);
  font-size: clamp(18px, 1.5vw, 30px);
  color: var(--text-primary);
  text-shadow: 0 0 16px rgba(90,204,255,0.35);
  line-height: 1;
  white-space: nowrap;
}

/* ══ 右侧：仪表盘卡片 ══ */.gauge-card {
  display: flex;
  align-items: center;
  gap: clamp(8px, 0.7vw, 14px);
  padding: clamp(8px, 0.6vw, 12px) clamp(10px, 0.8vw, 16px);
  border-radius: clamp(10px, 0.75vw, 16px);
  background: var(--metric-bg);
  border: 1px solid var(--metric-border);
  min-height: 0; overflow: hidden;
}

.gauge-chart {
  height: 100%;
  aspect-ratio: 1;
  flex-shrink: 0;
  min-height: 0;
  max-width: 50%;
}

.gauge-info {
  display: flex;
  flex-direction: column;
  gap: clamp(3px, 0.28vh, 6px);
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.gauge-label {
  font-size: clamp(10px, 0.65vw, 13px);
  color: var(--text-muted);
  letter-spacing: 0.1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.gauge-value {
  font-family: var(--font-display);
  font-size: clamp(18px, 1.5vw, 30px);
  line-height: 1;
  white-space: nowrap;
}

.gauge-sub {
  font-size: clamp(9px, 0.58vw, 11px);
  color: var(--text-muted);
  letter-spacing: 0.06em;
  opacity: 0.7;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── 底部导航 ── */
.portal-nav {
  display: flex; gap: var(--space-1);
  flex-wrap: wrap; justify-content: center;
  flex-shrink: 0; position: relative; z-index: 2;
}

.nav-item {
  display: inline-flex; align-items: center; gap: var(--space-1);
  padding: var(--space-1) var(--space-2);
  border-radius: 999px;
  border: 1px solid var(--nav-border);
  background: var(--nav-bg);
  color: var(--text-secondary);
  font-size: var(--text-xs); letter-spacing: 0.1em;
  transition: var(--transition-color), var(--transition-border), var(--transition-shadow);
  cursor: pointer; font-family: var(--font-display);

  &:hover { color: var(--text-primary); border-color: var(--nav-hover-border); box-shadow: var(--nav-hover-shadow); }
}

.nav-icon {
  font-size: var(--text-xxs);
  padding: clamp(3px, 0.25vw, 6px) var(--space-1);
  border-radius: 999px;
  background: var(--nav-active-bg);
  color: var(--accent-cyan);
}

/* ── 动画 ── */
@keyframes pulse {
  0%   { transform: scale(1);   opacity: 0.6; }
  50%  { transform: scale(1.4); opacity: 1;   }
  100% { transform: scale(1);   opacity: 0.6; }
}

/* ── 响应式 ── */
@media (max-width: 1400px) {
  .content-row { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}

@media (max-width: 1200px) {
  .portal-header { grid-template-columns: 1fr; text-align: center; justify-items: center; padding: var(--space-1) var(--space-3); }
  .brand { text-align: center; }
  .time-box { align-items: center; }
  .header-left { order: 2; justify-self: center; }
  .brand-center { order: 1; }
  .header-right { order: 3; justify-self: center; }
  .portal-layout { grid-template-columns: 1fr; grid-template-rows: auto auto; overflow-y: auto; }
  .content-row { grid-template-columns: 1fr 1fr; grid-template-rows: auto; }
  .cell-invest { grid-column: 1 / 3; grid-row: auto; }
  .cell-trend  { grid-column: 1 / 3; grid-row: auto; }
  .cell-treasury { grid-column: 1; grid-row: auto; }
  .cell-asset    { grid-column: 2; grid-row: auto; }
  .cell-operation { grid-column: 1 / 3; grid-row: auto; }
}
</style>
