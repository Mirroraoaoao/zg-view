<template>
  <SubScreenLayout title="财务管理" subtitle="Financial Management" meta="数据更新时间 08:30">
    <div v-if="loading" class="finance-grid finance-grid--loading">
      <SkeletonPanel class="skeleton-slot skeleton-slot--overview" />
      <SkeletonPanel class="skeleton-slot skeleton-slot--trend" />
      <SkeletonPanel class="skeleton-slot skeleton-slot--budget" />
    </div>

    <div v-else class="finance-grid">
      <section class="panel overview panel-animate-in" :style="stagger[0]">
        <PanelHeader title="L1：核心财务总览" />
        <div class="kpi-grid">
          <div v-for="item in coreMetrics" :key="item.label" class="kpi">
            <div class="kpi-label">{{ item.label }}</div>
            <div class="kpi-value">{{ item.displayText }}</div>
          </div>
        </div>
      </section>

      <section class="panel trend panel-animate-in" :style="stagger[1]">
        <PanelHeader title="L2：一利五率" />
        <div class="trend-layout">
          <div class="chart">
            <BaseChart :options="benchmarkOption" group="finance-link" ariaLabel="一利五率对标条形图" />
          </div>
          <div class="trend-list">
            <div v-for="item in benchmarkRows" :key="item.label" class="trend-row">
              <span class="trend-label">{{ item.label }}</span>
              <strong class="trend-value">{{ item.value }}</strong>
            </div>
          </div>
        </div>
      </section>

      <section class="panel budget panel-animate-in" :style="stagger[2]">
        <PanelHeader title="L2：社会效益类" />
        <div class="budget-layout">
          <div class="budget-progress">
            <div v-for="item in financeData.budget.execution" :key="item.label" class="progress-item">
              <div class="progress-label">{{ item.label }}</div>
              <div class="progress">
                <div class="progress-bar" :style="{ width: `${item.value}%` }"></div>
              </div>
              <div class="progress-value">{{ item.display }}</div>
            </div>
          </div>
          <div class="chart">
            <BaseChart :options="budgetOption" group="finance-link" ariaLabel="社会效益年度工业产值柱状图" />
          </div>
        </div>
        <div class="budget-tags">
          <span v-for="tag in financeData.budget.tags" :key="tag" class="chip">{{ tag }}</span>
        </div>
      </section>
    </div>
  </SubScreenLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import SubScreenLayout from '../components/SubScreenLayout.vue'
import BaseChart from '../components/BaseChart.vue'
import PanelHeader from '../components/PanelHeader.vue'
import SkeletonPanel from '../components/SkeletonPanel.vue'
import { financeData } from '../data/mockDashboard'
import { useResponsiveScale } from '../composables/useResponsiveScale'
import { useCountUp } from '../composables/useCountUp'
import { useStaggerAnimation } from '../composables/useStaggerAnimation'
import { getThemeColors } from '../utils/chartTheme'
import { formatMetricText, parseMetricText } from '../utils/metricFormat'

const { scaleNumber } = useResponsiveScale()
const colors = getThemeColors()
const stagger = useStaggerAnimation(3)

const loading = ref(true)
let loadingTimer = 0
onMounted(() => {
  loadingTimer = window.setTimeout(() => { loading.value = false }, 420)
})
onUnmounted(() => window.clearTimeout(loadingTimer))

const coreMetrics = financeData.core.metrics.map((item) => {
  const parsed = parseMetricText(item.value)
  if (!parsed) return { ...item, displayText: item.value }
  const displayValue = useCountUp(() => parsed.value, 1200, parsed.decimals)
  const displayText = computed(() => formatMetricText(parsed, displayValue.value))
  return { ...item, displayText }
})

const benchmarkRows = computed(() =>
  financeData.benchmark.labels.map((label, index) => ({
    label,
    value: financeData.benchmark.values[index]
  }))
)


const benchmarkOption = computed(() => ({
  grid: {
    top: scaleNumber(18, 16),
    bottom: scaleNumber(18, 16),
    left: scaleNumber(70, 60),
    right: scaleNumber(24, 20)
  },
  xAxis: {
    type: 'value',
    axisLabel: { color: colors.textSecondary, fontSize: scaleNumber(11, 11) },
    splitLine: { show: false }
  },
  yAxis: {
    type: 'category',
    data: financeData.benchmark.labels,
    axisLabel: { color: colors.textSecondary, fontSize: scaleNumber(11, 11) },
    axisLine: { show: false },
    axisTick: { show: false }
  },
  series: [
    {
      type: 'bar',
      semantic: 'benchmark',
      data: financeData.benchmark.values,
      barWidth: scaleNumber(14, 10),
      itemStyle: { borderRadius: scaleNumber(6, 4) },
      label: { show: true, position: 'right', color: colors.textPrimary, fontSize: scaleNumber(11, 11) }
    }
  ]
}))

const budgetOption = computed(() => ({
  grid: {
    top: scaleNumber(18, 16),
    bottom: scaleNumber(18, 16),
    left: scaleNumber(44, 40),
    right: scaleNumber(24, 20)
  },
  xAxis: {
    type: 'category',
    data: financeData.budget.chart.labels,
    axisLine: { lineStyle: { color: colors.axisLine } },
    axisLabel: { color: colors.textSecondary, fontSize: scaleNumber(11, 11) }
  },
  yAxis: {
    type: 'value',
    axisLabel: { color: colors.textSecondary, fontSize: scaleNumber(11, 11) },
    splitLine: { lineStyle: { color: colors.splitLine } }
  },
  series: [
    {
      type: 'bar',
      name: '工业产值',
      semantic: 'target',
      data: financeData.budget.chart.values,
      barWidth: scaleNumber(26, 22)
    }
  ]
}))
</script>

<style scoped lang="scss">
.finance-grid {
  width: 100%;
  height: 100%;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: minmax(0, 1.12fr) minmax(0, 1fr);
  grid-template-areas:
    'overview overview'
    'trend budget';
  gap: var(--space-2);
  overflow: hidden;
  position: relative;
}

.finance-grid--loading {
  pointer-events: none;
}

.skeleton-slot--overview { grid-area: overview; }
.skeleton-slot--trend { grid-area: trend; }
.skeleton-slot--budget { grid-area: budget; }

.overview {
  grid-area: overview;
}

.trend {
  grid-area: trend;
}

.budget {
  grid-area: budget;
}

.finance-grid .panel {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  min-height: 0;
  background:
    radial-gradient(108% 72% at 0% 100%, rgba(54, 241, 205, 0.08), transparent 58%),
    radial-gradient(92% 68% at 100% 0%, rgba(90, 204, 255, 0.1), transparent 60%),
    var(--bg-panel);
}

.budget.panel {
  grid-template-rows: auto minmax(0, 1fr) auto;
}

.panel > .chart {
  width: 100%;
  height: 100%;
  min-height: 0;
}

.overview .kpi {
  padding: var(--space-2);
  border-radius: clamp(12px, 1vw, 18px);
  background: var(--subscreen-subcard-bg);
  border: 1px solid rgba(90, 204, 255, 0.1);
}

.overview .kpi:first-child {
  background: var(--subscreen-ring-bg);
  border-color: rgba(90, 204, 255, 0.22);
  box-shadow: inset 0 0 16px rgba(90, 204, 255, 0.08);
}

.overview .kpi-label {
  font-size: var(--text-xs);
  letter-spacing: 0.08em;
}

.overview .kpi-value {
  font-size: var(--text-lg);
}


.chart {
  width: 100%;
  height: 100%;
  min-height: 0;
}

.trend-layout {
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 200px;
  gap: var(--space-2);
}

.trend-list {
  min-height: 0;
  overflow: auto;
  display: grid;
  gap: var(--space-1);
}

.trend-row {
  display: grid;
  gap: 6px;
  padding: var(--space-1) var(--space-2);
  border-radius: 10px;
  background: var(--subscreen-subcard-bg);
  border: 1px solid rgba(90, 204, 255, 0.1);
}

.trend-label {
  font-size: var(--text-xs);
  color: var(--text-muted);
  line-height: 1.35;
}

.trend-value {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  color: var(--text-primary);
}

.budget-layout {
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: var(--space-2);
}

.budget-progress {
  display: grid;
  gap: var(--space-1);
  min-height: 0;
  overflow: auto;
}

.progress-item {
  display: grid;
  gap: 6px;
  padding: var(--space-1) var(--space-2);
  border-radius: 10px;
  background: var(--subscreen-subcard-bg);
  border: 1px solid rgba(90, 204, 255, 0.1);
}

.budget-progress .progress-item:first-child {
  background: var(--subscreen-ring-bg);
  border-color: rgba(90, 204, 255, 0.22);
}

.progress-value {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.budget-tags {
  margin-top: var(--space-1);
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

@media (max-width: 1200px) {
  .finance-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      'overview'
      'trend'
      'budget';
    overflow-y: auto;
  }

  .trend-layout,
  .budget-layout {
    grid-template-columns: 1fr;
  }

  .chart {
    height: 200px;
  }
}
</style>
