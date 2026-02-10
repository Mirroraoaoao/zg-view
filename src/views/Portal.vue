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
      <div class="portal-top">
        <section class="module-column left">
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
          <div class="card-footer">
            <div class="card-metrics">
              <div v-for="metric in item.metrics" :key="metric.label" class="metric-row">
                <span class="metric-label">{{ metric.label }}</span>
                <span class="metric-value">{{ metric.value }}</span>
              </div>
            </div>
          </div>
        </div>
        </section>

        <section class="module-hero" role="button" tabindex="0" @click="go(hero.name)" @keydown.enter="go(hero.name)" @keydown.space.prevent="go(hero.name)">
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

          <div class="hero-charts">
            <div class="hero-chart">
              <div class="hero-chart-title">营收趋势</div>
              <div class="hero-chart-body">
                <BaseChart :options="heroTrendOption" ariaLabel="营收趋势折线图" />
              </div>
            </div>
          </div>

          <div class="hero-footer">
            <span>点击进入经营数据</span>
            <span class="hero-arrow">→</span>
          </div>
        </section>

        <section class="module-column right">
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
            <div class="card-footer">
              <div class="card-metrics">
                <div v-for="metric in item.metrics" :key="metric.label" class="metric-row">
                  <span class="metric-label">{{ metric.label }}</span>
                  <span class="metric-value">{{ metric.value }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

    </main>
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

onMounted(() => {
  timer = window.setInterval(() => {
    now.value = new Date()
  }, 1000)

  // 强制触发重绘，解决首次加载时某些元素不渲染的问题
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
  height: 100dvh; /* 动态视口高度，解决移动端地址栏问题 */
  display: flex;
  flex-direction: column;
  padding: var(--space-2) var(--space-4) var(--space-3);
  gap: var(--space-2);
  position: relative;
  overflow: hidden;

  // Portal 独有变量
  --card-gap: clamp(10px, 0.7vw, 18px);
  --card-padding: clamp(8px, 0.55vw, 14px);
  --metric-value: clamp(12px, 0.75vw, 16px);
}

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
  image-rendering: -webkit-optimize-contrast;
  -webkit-mask-image: none;
  mask-image: none;
  mask-repeat: initial;
  mask-size: initial;
  background-color: initial;
  position: relative;
  z-index: 1;
  opacity: 0.8
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
  -webkit-mask-image: none;
  mask-image: none;
}

.portal-bottom-decor.left {
  left: 0;
}

.portal-bottom-decor.right {
  right: 0;
  transform: scaleX(-1);
  background-position: bottom left;
}

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
  // padding: clamp(4px, 0.5vw, 10px) clamp(16px, 1.4vw, 30px);
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

.header-side {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  min-height: clamp(32px, 4vh, 56px);
}

.header-left {
  justify-self: start;
}

.header-right {
  justify-self: end;
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

.portal-layout {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-rows: minmax(0, 1fr);
  gap: var(--space-2);
  overflow: hidden;
}

.portal-top {
  min-height: 0;
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  grid-template-rows: repeat(4, minmax(0, 1fr));
  grid-template-areas:
    'left center right'
    'left center right'
    'left center right'
    'left center right';
  gap: var(--card-gap);
  overflow: hidden;
  overflow-x: visible;
  padding-top: 6px; // 为卡片 hover 向上移动预留空间
}

.module-column.left {
  grid-area: left;
  display: flex;
  flex-direction: column;
  gap: var(--card-gap);
  min-height: 0;
  min-width: 0;
  padding-top: 6px; // 为 hover 向上移动预留空间
}

.module-column.right {
  grid-area: right;
  display: flex;
  flex-direction: column;
  gap: var(--card-gap);
  min-height: 0;
  min-width: 0;
  padding-top: 6px; // 为 hover 向上移动预留空间
}

.module-hero {
  grid-area: center;
  padding: var(--space-4);
  border-radius: clamp(18px, 1.4vw, 30px);
  background: var(--hero-bg);
  border: 1px solid var(--hero-border);
  box-shadow: var(--hero-shadow);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  min-height: 0;
  min-width: 0;
}

.module-hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--hero-glow);
  opacity: 0.55;
  pointer-events: none;
}

.hero-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
}

.hero-title {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  letter-spacing: 0.18em;
}

.hero-sub {
  margin-top: var(--space-1);
  font-size: var(--text-sm);
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
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--space-1);
  z-index: 1;
}

.hero-metric {
  padding: var(--space-1) var(--space-2);
  border-radius: clamp(10px, 0.8vw, 14px);
  background: var(--metric-bg);
  border: 1px solid var(--metric-border);
}

.hero-metric .label {
  font-size: var(--text-xxs);
  color: var(--text-muted);
  letter-spacing: 0.1em;
}

.hero-metric .value {
  margin-top: 2px;
  font-family: var(--font-display);
  font-size: var(--text-md);
  color: var(--text-primary);
}

.hero-charts {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--space-2);
  z-index: 1;
}

.hero-chart {
  padding: var(--space-2);
  border-radius: clamp(14px, 1vw, 20px);
  background: var(--chart-container-bg);
  border: 1px solid var(--metric-border);
  box-shadow: var(--shadow-soft);
  position: relative;
  overflow: hidden;
}

.hero-chart-title {
  font-size: var(--text-xs);
  color: var(--text-muted);
  letter-spacing: 0.16em;
  margin-bottom: var(--space-1);
}

.hero-chart-body {
  height: clamp(140px, 14vh, 240px);
  position: relative;
  z-index: 1;
}

.hero-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--text-sm);
  letter-spacing: 0.12em;
  color: var(--text-secondary);
  z-index: 1;
}

.hero-arrow {
  font-size: var(--text-xl);
  color: var(--accent-cyan);
}

.module-card {
  flex: 1;
  padding: var(--card-padding);
  border-radius: clamp(16px, 1vw, 22px);
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  cursor: pointer;
  transition:
    var(--transition-transform),
    var(--transition-shadow),
    var(--transition-border);
  position: relative;
  overflow: hidden;
  min-height: 0;
}

.module-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 16px;
  right: 16px;
  height: 2px;
  background: var(--card-top-line);
  opacity: 0.45;
}

.module-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--card-hover-glow);
  opacity: 0;
  transition: var(--transition-opacity);
}

.module-card:hover {
  transform: translateY(-3px);
  border-color: var(--nav-hover-border);
  box-shadow: var(--nav-hover-shadow);
}

.module-card:hover::after {
  opacity: 1;
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
  padding: clamp(2px, 0.3vw, 8px) clamp(6px, 0.5vw, 12px);
  border-radius: 999px;
  border: 1px solid var(--chip-border);
  color: var(--accent-amber);
  letter-spacing: 0.08em;
}

.card-desc {
  font-size: var(--text-xxs);
  color: var(--text-muted);
  letter-spacing: 0.08em;
  line-height: 1.5;
  z-index: 1;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  margin-top: var(--space-1);
  display: grid;
  gap: var(--space-1);
  z-index: 1;
}

.card-metrics {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(6px, 0.45vw, 10px);
}

.card-chart {
  height: clamp(80px, 8vh, 130px);
  padding: var(--space-1);
  border-radius: clamp(12px, 0.8vw, 16px);
  background: var(--chart-container-bg);
  border: 1px solid var(--metric-border);
  box-shadow: var(--shadow-soft);
}

.metric-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  padding: clamp(4px, 0.45vw, 8px) clamp(6px, 0.55vw, 10px);
  border-radius: clamp(10px, 0.8vw, 16px);
  background: var(--kpi-bg);
  border: 1px solid var(--kpi-border);
  font-size: var(--text-xxs);
  min-height: 0;
}

.metric-label {
  color: var(--text-secondary);
  font-size: var(--text-xxs);
  letter-spacing: 0.06em;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 60%;
}

.metric-value {
  font-family: var(--font-display);
  color: var(--text-primary);
  font-size: var(--metric-value);
  line-height: 1.1;
  white-space: nowrap;
}


@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.4);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.6;
  }
}

@media (max-width: 1200px) {
  .portal-header {
    grid-template-columns: 1fr;
    text-align: center;
    justify-items: center;
    padding: var(--space-1) var(--space-3);
  }

  .brand {
    text-align: center;
  }

  .time-box {
    align-items: center;
    text-align: center;
  }

  .header-left {
    order: 2;
    justify-self: center;
  }

  .brand-center {
    order: 1;
  }

  .header-right {
    order: 3;
    justify-self: center;
  }

  .portal-top {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      'center'
      'left'
      'right'
  }

  .module-column.left,
  .module-column.right {
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .module-card {
    flex: 1 1 calc(50% - 12px);
  }

  .card-metrics {
    grid-template-columns: 1fr;
  }

  .hero-charts {
    grid-template-columns: 1fr;
  }
}

</style>
