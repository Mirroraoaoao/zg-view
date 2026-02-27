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
      <!-- 左侧 2/3：经营数据 -->
      <section class="panel-block panel-left">
        <div class="panel-heading">
          <span class="panel-label">经营数据</span>
          <span class="panel-tag">C1</span>
          <span class="panel-sub">战略与资本管理</span>
        </div>

        <!-- 经营数据主区：大图表 + 核心 KPI -->
        <div class="left-hero"
          role="button"
          tabindex="0"
          @click="go(hero.name)"
          @keydown.enter="go(hero.name)"
          @keydown.space.prevent="go(hero.name)"
        >
          <div class="hero-top">
            <div>
              <div class="hero-title">{{ hero.title }}</div>
              <div class="hero-sub">{{ hero.subtitle }}</div>
            </div>
            <div class="hero-badge">{{ hero.badge }}</div>
          </div>

          <div class="hero-metrics">
            <div v-for="metric in heroMetrics" :key="metric.label" class="hero-metric">
              <div class="label">{{ metric.label }}</div>
              <div class="value">{{ metric.display }}</div>
            </div>
          </div>

          <div class="hero-chart-wrap">
            <div class="hero-chart-title">营收月度趋势</div>
            <div class="hero-chart-body">
              <BaseChart :options="heroTrendOption" ariaLabel="营收趋势折线图" />
            </div>
          </div>

          <div class="hero-footer">
            <span>点击查看经营全貌</span>
            <span class="hero-arrow">→</span>
          </div>
        </div>

        <!-- 左侧 4 个经营子模块 -->
        <div class="left-modules">
          <div
            v-for="item in leftModules"
            :key="item.name"
            class="module-card"
            role="button"
            tabindex="0"
            @click="go(item.name)"
            @keydown.enter="go(item.name)"
            @keydown.space.prevent="go(item.name)"
          >
            <div class="card-top">
              <div class="card-title">{{ item.title }}</div>
              <div class="card-tag">{{ item.tag }}</div>
            </div>
            <div class="card-desc">{{ item.desc }}</div>
            <div class="card-metrics">
              <div v-for="metric in item.metrics" :key="metric.label" class="metric-row">
                <span class="metric-label">{{ metric.label }}</span>
                <span class="metric-value">{{ metric.value }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 右侧 1/3：非经营数据 -->
      <section class="panel-block panel-right">
        <div class="panel-heading">
          <span class="panel-label">非经营数据</span>
          <span class="panel-tag">C2</span>
          <span class="panel-sub">资源与运营管理</span>
        </div>

        <div class="right-modules">
          <div
            v-for="item in rightModules"
            :key="item.name"
            class="module-card"
            role="button"
            tabindex="0"
            @click="go(item.name)"
            @keydown.enter="go(item.name)"
            @keydown.space.prevent="go(item.name)"
          >
            <div class="card-top">
              <div class="card-title">{{ item.title }}</div>
              <div class="card-tag">{{ item.tag }}</div>
            </div>
            <div class="card-desc">{{ item.desc }}</div>
            <div class="card-metrics">
              <div v-for="metric in item.metrics" :key="metric.label" class="metric-row">
                <span class="metric-label">{{ metric.label }}</span>
                <span class="metric-value">{{ metric.value }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <nav class="portal-nav" aria-label="模块导航">
      <button
        v-for="item in navItems"
        :key="item.name"
        class="nav-item"
        type="button"
        @click="go(item.name)"
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

const { header, hero, heroCharts, leftModules, rightModules } = portalData
const headerTitle = header?.title?.trim() || '集团数据驾驶舱'
const headerSubtitle = header?.subtitle?.trim() || '企业经营全景态势一屏统览'

const heroMetrics = hero.metrics.map((item) => {
  const parsed = parseMetricText(item.value)
  if (!parsed) {
    return { ...item, display: item.value }
  }
  const displayValue = useCountUp(() => parsed.value, 1200, parsed.decimals)
  const display = computed(() => formatMetricText(parsed, displayValue.value))
  return { ...item, display }
})

const pad = (value: number) => value.toString().padStart(2, '0')

const timeText = computed(() => {
  return `${pad(now.value.getHours())}:${pad(now.value.getMinutes())}:${pad(now.value.getSeconds())}`
})

const dateTimeText = computed(() => {
  return `${now.value.getFullYear()}-${pad(now.value.getMonth() + 1)}-${pad(now.value.getDate())} ${timeText.value}`
})

const heroTrendOption = computed(() => {
  const colors = getChartColors()
  const scale = { scaleNumber }
  const baseAxis = getBaseAxisConfig(colors, scale)
  return {
    grid: {
      ...getBaseGridConfig(scale),
      top: scaleNumber(14, 14),
      bottom: scaleNumber(10, 10),
      left: scaleNumber(32, 30),
      right: scaleNumber(12, 12)
    },
    tooltip: getBaseTooltipConfig(colors, scale),
    ...baseAxis,
    xAxis: {
      ...baseAxis.xAxis,
      type: 'category',
      data: heroCharts.trend.labels,
      axisLabel: { ...baseAxis.xAxis.axisLabel, fontSize: scaleNumber(10, 10) }
    },
    yAxis: {
      ...baseAxis.yAxis,
      type: 'value',
      axisLabel: { show: false },
      splitLine: { lineStyle: { color: colors.splitLine } }
    },
    series: [
      {
        type: 'line',
        semantic: 'revenue',
        data: heroCharts.trend.values,
        smooth: true,
        showSymbol: false,
        lineStyle: {
          color: colors.revenue,
          width: scaleFloat(2.5, 2),
          shadowBlur: scaleNumber(12, 10),
          shadowColor: colors.revenue
        },
        areaStyle: {
          color: createGradient('revenue', 'vertical', 0.19, 0)
        },
        markPoint: { data: [{ type: 'max', name: '峰值' }] }
      }
    ]
  }
})

const go = (name: string) => {
  router.push({ name })
}

const navItems = [
  { name: 'overall', label: '经营数据', icon: '核心' },
  { name: 'finance', label: '财务管理', icon: '财务' },
  { name: 'treasury', label: '资金分析', icon: '资金' },
  { name: 'investment', label: '投资运营', icon: '投资' },
  { name: 'projects', label: '重点项目', icon: '项目' },
  { name: 'asset', label: '资产管理', icon: '资产' },
  { name: 'operation', label: '业务数据', icon: '业务' },
  { name: 'hr', label: '人力资源', icon: '人力' },
  { name: 'admin', label: '行政管理', icon: '行政' }
]

onMounted(() => {
  timer = window.setInterval(() => {
    now.value = new Date()
  }, 1000)

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event('resize'))
    })
  })
})

onUnmounted(() => {
  window.clearInterval(timer)
})
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

  --card-gap: clamp(8px, 0.6vw, 14px);
  --card-padding: clamp(8px, 0.55vw, 14px);
  --metric-value: clamp(12px, 0.75vw, 16px);
}

/* ── 顶部装饰 ── */
.portal-top-decor {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: clamp(80px, 10vh, 170px);
  background-position: center top;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.6;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.portal-top-decor-center {
  width: clamp(680px, 62vw, 1180px);
  max-width: 92vw;
  height: clamp(70px, 10vh, 140px);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  pointer-events: all;
  position: relative;
  z-index: 1;
  opacity: 0.8;
}

.portal-bottom-decor {
  position: absolute;
  bottom: 0;
  width: clamp(320px, 28vw, 520px);
  height: clamp(36px, 3vh, 72px);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: bottom left;
  opacity: 0.4;
  pointer-events: none;
  z-index: 1;
  filter: saturate(1.1);
}

.portal-bottom-decor.left { left: 0; }
.portal-bottom-decor.right {
  right: 0;
  transform: scaleX(-1);
  background-position: bottom left;
}

/* ── 头部 ── */
.portal-header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  column-gap: var(--space-4);
  position: relative;
  z-index: 2;
  min-height: clamp(44px, 4.2vh, 72px);
  padding: clamp(6px, 0.9vh, 14px) var(--space-4) clamp(6px, 0.8vh, 12px);
}

.brand {
  display: flex;
  flex-direction: column;
  gap: clamp(4px, 0.45vw, 10px);
  text-align: left;
}

.brand-center {
  text-align: center;
  align-items: center;
  justify-self: center;
  transform: translateY(-4px);
}

.brand-plate {
  display: inline-flex;
  align-items: center;
  gap: clamp(8px, 0.7vw, 16px);
  position: relative;
  overflow: hidden;
}

.brand-logo {
  height: calc(var(--text-3xl) * 1.2 + 2px);
  width: auto;
  max-height: clamp(48px, 3.8vw, 92px);
  object-fit: contain;
  opacity: 0.9;
}

.brand-title {
  font-family: var(--font-display);
  font-size: clamp(24px, 1.6vw, 44px);
  letter-spacing: 0.2em;
  color: var(--text-strong);
  text-shadow: 0 0 20px rgba(90, 204, 255, 0.55);
  transform: translateY(-2px);
}

.brand-sub {
  margin-top: -4px;
  font-size: clamp(10px, 0.6vw, 16px);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(198, 220, 242, 0.8);
  text-shadow: 0 0 10px rgba(54, 241, 205, 0.2);
}

.header-side {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  min-height: clamp(32px, 4vh, 56px);
}

.header-left { justify-self: start; }
.header-right { justify-self: end; }

.time-box {
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: clamp(4px, 0.4vw, 10px);
}

.time-box.header-left {
  align-items: flex-start;
  text-align: left;
}

.time-main {
  font-family: var(--font-display);
  font-size: clamp(12px, 0.75vw, 18px);
  letter-spacing: 0.14em;
  color: var(--text-secondary);
  text-shadow: 0 0 12px rgba(90, 204, 255, 0.35);
}

.status {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: clamp(3px, 0.35vw, 8px) clamp(8px, 0.7vw, 16px);
  border-radius: 999px;
  background: var(--status-bg);
  border: 1px solid var(--status-border);
  font-size: var(--text-xs);
  color: var(--accent-cyan);
  letter-spacing: 0.12em;
}

.status-dot {
  width: clamp(8px, 0.55vw, 16px);
  height: clamp(8px, 0.55vw, 16px);
  border-radius: 50%;
  background: var(--accent-cyan);
  box-shadow: var(--status-glow);
  animation: pulse 1.6s ease-in-out infinite;
}

/* ── 主布局：左 2/3 + 右 1/3 ── */
.portal-layout {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--card-gap);
  overflow: hidden;
}

/* ── 面板通用 ── */
.panel-block {
  display: flex;
  flex-direction: column;
  gap: var(--card-gap);
  min-height: 0;
  overflow: hidden;
}

.panel-heading {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-shrink: 0;
}

.panel-label {
  font-family: var(--font-display);
  font-size: clamp(13px, 0.85vw, 18px);
  letter-spacing: 0.16em;
  color: var(--text-primary);
}

.panel-tag {
  font-size: var(--text-xxs);
  padding: clamp(2px, 0.25vw, 6px) clamp(6px, 0.45vw, 10px);
  border-radius: 999px;
  border: 1px solid var(--chip-border);
  background: var(--chip-bg);
  color: var(--accent-amber);
  letter-spacing: 0.08em;
}

.panel-sub {
  font-size: var(--text-xxs);
  color: var(--text-muted);
  letter-spacing: 0.1em;
}

/* ── 左侧面板布局 ── */
.panel-left {
  .left-hero {
    flex-shrink: 0;
    padding: var(--space-3) var(--space-4);
    border-radius: clamp(16px, 1.2vw, 26px);
    background: var(--hero-bg);
    border: 1px solid var(--hero-border);
    box-shadow: var(--hero-shadow);
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--transition-transform), var(--transition-shadow);

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--hero-glow);
      opacity: 0.55;
      pointer-events: none;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--nav-hover-shadow);
    }
  }

  .left-modules {
    flex: 1;
    min-height: 0;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: var(--card-gap);
  }
}

/* ── 英雄区内容 ── */
.hero-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
}

.hero-title {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  letter-spacing: 0.18em;
}

.hero-sub {
  margin-top: var(--space-1);
  font-size: var(--text-xs);
  color: var(--text-secondary);
  letter-spacing: 0.12em;
}

.hero-badge {
  padding: var(--space-1) var(--space-2);
  border-radius: 999px;
  border: 1px solid var(--chip-border);
  background: var(--chip-bg);
  color: var(--accent-amber);
  font-size: var(--text-xs);
  letter-spacing: 0.1em;
}

.hero-metrics {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: var(--space-1);
  z-index: 1;
}

.hero-metric {
  padding: var(--space-1) clamp(6px, 0.5vw, 10px);
  border-radius: clamp(10px, 0.7vw, 14px);
  background: var(--metric-bg);
  border: 1px solid var(--metric-border);

  .label {
    font-size: var(--text-xxs);
    color: var(--text-muted);
    letter-spacing: 0.08em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .value {
    margin-top: 2px;
    font-family: var(--font-display);
    font-size: clamp(11px, 0.72vw, 15px);
    color: var(--text-primary);
    white-space: nowrap;
  }
}

.hero-chart-wrap {
  z-index: 1;
  padding: var(--space-2);
  border-radius: clamp(12px, 0.9vw, 18px);
  background: var(--chart-container-bg);
  border: 1px solid var(--metric-border);
  box-shadow: var(--shadow-soft);
}

.hero-chart-title {
  font-size: var(--text-xs);
  color: var(--text-muted);
  letter-spacing: 0.16em;
  margin-bottom: var(--space-1);
}

.hero-chart-body {
  height: clamp(80px, 8vh, 140px);
  position: relative;
  z-index: 1;
}

.hero-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--text-xs);
  letter-spacing: 0.12em;
  color: var(--text-secondary);
  z-index: 1;
}

.hero-arrow {
  font-size: var(--text-lg);
  color: var(--accent-cyan);
}

/* ── 右侧面板布局 ── */
.panel-right {
  .right-modules {
    flex: 1;
    min-height: 0;
    display: grid;
    grid-template-rows: repeat(3, minmax(0, 1fr));
    gap: var(--card-gap);
  }
}

/* ── 通用模块卡片 ── */
.module-card {
  padding: var(--card-padding);
  border-radius: clamp(14px, 1vw, 20px);
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  display: flex;
  flex-direction: column;
  gap: clamp(4px, 0.4vw, 8px);
  cursor: pointer;
  transition:
    var(--transition-transform),
    var(--transition-shadow),
    var(--transition-border);
  position: relative;
  overflow: hidden;
  min-height: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 16px;
    right: 16px;
    height: 2px;
    background: var(--card-top-line);
    opacity: 0.45;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--card-hover-glow);
    opacity: 0;
    transition: var(--transition-opacity);
  }

  &:hover {
    transform: translateY(-3px);
    border-color: var(--nav-hover-border);
    box-shadow: var(--nav-hover-shadow);

    &::after { opacity: 1; }
  }
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
}

.card-title {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  letter-spacing: 0.12em;
  line-height: 1.2;
}

.card-tag {
  font-size: var(--text-xxs);
  padding: clamp(2px, 0.25vw, 6px) clamp(5px, 0.4vw, 10px);
  border-radius: 999px;
  border: 1px solid var(--chip-border);
  color: var(--accent-amber);
  letter-spacing: 0.08em;
}

.card-desc {
  font-size: var(--text-xxs);
  color: var(--text-muted);
  letter-spacing: 0.08em;
  line-height: 1.4;
  z-index: 1;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-metrics {
  display: flex;
  flex-direction: column;
  z-index: 1;
  flex: 1;
  min-height: 0;
  justify-content: space-evenly;
}

.metric-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: clamp(6px, 0.5vw, 12px);
  padding: clamp(4px, 0.4vw, 8px) 0;
  border-bottom: 1px solid rgba(90, 204, 255, 0.1);
  min-height: 0;

  &:last-child {
    border-bottom: none;
  }
}

.metric-label {
  color: var(--text-muted);
  font-size: clamp(11px, 0.65vw, 14px);
  letter-spacing: 0.06em;
  line-height: 1.3;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.metric-value {
  font-family: var(--font-display);
  color: var(--text-primary);
  font-size: clamp(14px, 1vw, 22px);
  line-height: 1.1;
  white-space: nowrap;
  flex-shrink: 0;
  text-shadow: 0 0 10px rgba(90, 204, 255, 0.25);
}

/* ── 底部模块导航 ── */
.portal-nav {
  display: flex;
  gap: var(--space-1);
  flex-wrap: wrap;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
}

.portal-nav .nav-item {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-2);
  border-radius: 999px;
  border: 1px solid var(--nav-border);
  background: var(--nav-bg);
  color: var(--text-secondary);
  font-size: var(--text-xs);
  letter-spacing: 0.1em;
  cursor: pointer;
  font-family: var(--font-display);
  transition:
    var(--transition-color),
    var(--transition-border),
    var(--transition-shadow);
}

.portal-nav .nav-item:hover {
  color: var(--text-primary);
  border-color: var(--nav-hover-border);
  box-shadow: var(--nav-hover-shadow);
}

.portal-nav .nav-icon {
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
@media (max-width: 1200px) {
  .portal-header {
    grid-template-columns: 1fr;
    text-align: center;
    justify-items: center;
    padding: var(--space-1) var(--space-3);
  }

  .brand { text-align: center; }
  .time-box { align-items: center; text-align: center; }
  .header-left { order: 2; justify-self: center; }
  .brand-center { order: 1; }
  .header-right { order: 3; justify-self: center; }

  .portal-layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    overflow-y: auto;
  }

  .panel-left .left-modules {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .hero-metrics {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .panel-right .right-modules {
    grid-template-rows: unset;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .portal-nav {
    flex-wrap: nowrap;
    overflow-x: auto;
    justify-content: flex-start;
    padding-bottom: 4px;
  }
}
</style>
