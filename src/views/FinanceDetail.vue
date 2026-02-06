<template>
  <SubScreenLayout title="财务管理" subtitle="Financial Management" meta="数据更新时间 08:30">
    <div class="finance-grid">
      <section class="panel overview">
        <h3 class="panel-title">L1：核心财务总览</h3>
        <div class="kpi-grid">
          <div v-for="item in financeData.core.metrics" :key="item.label" class="kpi">
            <div class="kpi-label">{{ item.label }}</div>
            <div class="kpi-value">{{ item.value }}</div>
          </div>
        </div>
      </section>

      <section class="panel trend">
        <h3 class="panel-title">L2：一利五率</h3>
        <div class="trend-layout">
          <div class="chart">
            <BaseChart :options="benchmarkOption" />
          </div>
          <div class="trend-list">
            <div v-for="item in benchmarkRows" :key="item.label" class="trend-row">
              <span class="trend-label">{{ item.label }}</span>
              <strong class="trend-value">{{ item.value }}</strong>
            </div>
          </div>
        </div>
      </section>

      <section class="panel budget">
        <h3 class="panel-title">L2：社会效益类</h3>
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
            <BaseChart :options="budgetOption" />
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
import { financeData } from '../data/mockDashboard'

const scale = ref(1)

const updateScale = () => {
  const next = window.innerWidth / 1920
  scale.value = Math.min(1.9, Math.max(1, next))
}

const scaleNumber = (value: number, min = value) => Math.max(min, Math.round(value * scale.value))

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
    axisLabel: { color: '#a6bad2', fontSize: scaleNumber(11, 11) },
    splitLine: { show: false }
  },
  yAxis: {
    type: 'category',
    data: financeData.benchmark.labels,
    axisLabel: { color: '#a6bad2', fontSize: scaleNumber(11, 11) },
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
      label: { show: true, position: 'right', color: '#e6f1ff', fontSize: scaleNumber(11, 11) }
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
    axisLine: { lineStyle: { color: '#2a3b54' } },
    axisLabel: { color: '#a6bad2', fontSize: scaleNumber(11, 11) }
  },
  yAxis: {
    type: 'value',
    axisLabel: { color: '#a6bad2', fontSize: scaleNumber(11, 11) },
    splitLine: { lineStyle: { color: '#1d2a3d' } }
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


onMounted(() => {
  updateScale()
  window.addEventListener('resize', updateScale)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScale)
})
</script>

<style scoped lang="scss">
.finance-grid {
  --space-1: clamp(6px, 0.5vw, 12px);
  --space-2: clamp(10px, 0.7vw, 18px);
  --space-3: clamp(14px, 0.95vw, 24px);
  --text-xs: clamp(11px, 0.55vw, 16px);
  --text-sm: clamp(12px, 0.7vw, 18px);
  --text-md: clamp(14px, 0.8vw, 22px);
  --text-lg: clamp(18px, 1vw, 26px);
  --text-xl: clamp(22px, 1.2vw, 32px);
  --panel-padding: clamp(12px, 0.8vw, 20px);
  --panel-title-gap: clamp(8px, 0.6vw, 14px);
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

.panel > .chart {
  width: 100%;
  height: 100%;
  min-height: 0;
}

.panel-title {
  font-size: var(--text-sm);
  letter-spacing: 0.1em;
  color: var(--text-primary);
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
