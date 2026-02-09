<template>
  <SubScreenLayout title="经营数据" subtitle="Operating Data" meta="数据更新时间 08:30">
    <div class="overall-grid">
      <section class="panel profit-panel">
        <h3 class="panel-title">L1：集团营收数据</h3>
        <div class="profit-body">
          <div class="profit-sections">
            <div class="profit-section">
              <div class="section-title">L2：营收与利润类指标</div>
              <div class="profit-list">
                <div v-for="item in primaryMetrics" :key="item.label" class="profit-row">
                  <span>{{ item.label }}</span>
                  <span class="value">{{ item.value }}</span>
                  <span class="trend" :class="item.trendType">{{ item.trend }}</span>
                </div>
              </div>
            </div>
            <div class="profit-section">
              <div class="section-title">L2：贡献与产值类指标</div>
              <div class="profit-list">
                <div v-for="item in contributionMetrics" :key="item.label" class="profit-row">
                  <span>{{ item.label }}</span>
                  <span class="value">{{ item.value }}</span>
                  <span class="trend" :class="item.trendType">{{ item.trend }}</span>
                </div>
              </div>
            </div>
            <div class="profit-section">
              <div class="section-title">L2：费用压降类指标</div>
              <div class="profit-list">
                <div v-for="item in costMetrics" :key="item.label" class="profit-row">
                  <span>{{ item.label }}</span>
                  <span class="value">{{ item.value }}</span>
                  <span class="trend" :class="item.trendType">{{ item.trend }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="chart">
            <BaseChart :options="operatingTrendOption" />
          </div>
        </div>
      </section>

      <section class="panel asset-panel">
        <h3 class="panel-title">累计GDP贡献值（分板块）</h3>
        <div class="asset-summary">
          <div>
            <div class="asset-value">{{ overallData.assetScale.total }}</div>
            <div class="asset-growth">{{ overallData.assetScale.growth }} / {{ overallData.assetScale.increase }}</div>
          </div>
          <div class="asset-tags">
            <span v-for="tag in overallData.assetScale.tags" :key="tag" class="chip">{{ tag }}</span>
          </div>
        </div>
        <div class="chart">
          <BaseChart :options="assetTrendOption" />
        </div>
      </section>

      <section class="panel fund-panel">
        <h3 class="panel-title">税收与社会贡献</h3>
        <div class="fund-summary">
          <div v-for="item in overallData.fundStatus.summary" :key="item.label" class="fund-item">
            <span>{{ item.label }}</span>
            <span class="value" :class="item.tone">{{ item.value }}</span>
          </div>
        </div>
        <div class="chart">
          <BaseChart :options="fundFlowOption" />
        </div>
      </section>

      <section class="panel invest-panel">
        <h3 class="panel-title">费用压降情况</h3>
        <div class="invest-progress">
          <div v-for="item in overallData.investment.progress" :key="item.label" class="progress-item">
            <div class="progress-label">{{ item.label }}</div>
            <div class="progress">
              <div class="progress-bar" :style="{ width: `${item.value}%` }"></div>
            </div>
            <div class="progress-value">{{ item.value }}%</div>
          </div>
        </div>
        <div class="invest-kpis">
          <div v-for="item in overallData.investment.kpis" :key="item.label" class="kpi">
            <div class="kpi-label">{{ item.label }}</div>
            <div class="kpi-value">{{ item.value }}</div>
          </div>
        </div>
      </section>

      <section class="panel performance-panel">
        <h3 class="panel-title">L1：经营目标达成率(不含重点工作，只计算经济指标)</h3>
        <div class="completion-group">
          <div v-for="item in overallData.annualCompletion.group" :key="item.label" class="completion-item">
            <div class="completion-label">{{ item.label }}</div>
            <div class="progress">
              <div class="progress-bar" :style="{ width: `${item.value}%` }"></div>
            </div>
            <div class="completion-value">{{ item.value }}%</div>
          </div>
        </div>
        <div v-if="overallData.annualCompletion.subsidiaries.length" class="completion-subs">
          <div v-for="item in overallData.annualCompletion.subsidiaries" :key="item.label" class="completion-item">
            <div class="completion-label">{{ item.label }}</div>
            <div class="progress">
              <div class="progress-bar" :style="{ width: `${item.value}%` }"></div>
            </div>
            <div class="completion-value">{{ item.value }}%</div>
          </div>
        </div>
      </section>

      <section class="panel hr-panel">
        <h3 class="panel-title">珠琴澳三地特色产业集群总产值</h3>
        <div class="hr-summary">
          <div v-for="item in overallData.hrStatus.summary" :key="item.label" class="hr-item">
            <span>{{ item.label }}</span>
            <span class="value">{{ item.value }}</span>
          </div>
        </div>
        <div class="chart">
          <BaseChart :options="talentPieOption" />
        </div>
      </section>
    </div>
  </SubScreenLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SubScreenLayout from '../components/SubScreenLayout.vue'
import BaseChart from '../components/BaseChart.vue'
import { overallData } from '../data/mockDashboard'
import { useResponsiveScale } from '../composables/useResponsiveScale'
import { getThemeColors } from '../utils/chartTheme'

const { scaleNumber, scaleFloat } = useResponsiveScale()
const colors = getThemeColors()
const primaryMetrics = computed(() => overallData.operating.metrics.filter((item) => item.section === '营收与利润'))
const contributionMetrics = computed(() => overallData.operating.metrics.filter((item) => item.section === '贡献与产值'))
const costMetrics = computed(() => overallData.operating.metrics.filter((item) => item.section === '费用压降'))

const operatingTrendOption = computed(() => ({
  tooltip: { trigger: 'axis' },
  grid: {
    top: scaleNumber(28, 24),
    bottom: scaleNumber(18, 16),
    left: scaleNumber(44, 40),
    right: scaleNumber(24, 20)
  },
  xAxis: {
    type: 'category',
    data: overallData.operating.trend.labels,
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
      type: 'line',
      data: overallData.operating.trend.values,
      smooth: true,
      lineStyle: {
        color: colors.target,
        width: scaleFloat(2.4, 2),
        shadowBlur: scaleNumber(14, 10),
        shadowColor: 'rgba(248, 197, 71, 0.55)'
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(248, 197, 71, 0.3)' },
            { offset: 0.4, color: 'rgba(248, 197, 71, 0.12)' },
            { offset: 1, color: 'rgba(12, 24, 40, 0)' }
          ]
        }
      },
      symbol: 'circle',
      symbolSize: scaleNumber(6, 6),
      showSymbol: false,
      emphasis: { focus: 'series' },
      markPoint: { data: [{ type: 'max', name: '峰值' }] }
    }
  ]
}))

const assetTrendOption = computed(() => ({
  tooltip: { trigger: 'axis' },
  grid: {
    top: scaleNumber(28, 24),
    bottom: scaleNumber(18, 16),
    left: scaleNumber(44, 40),
    right: scaleNumber(24, 20)
  },
  xAxis: {
    type: 'category',
    data: overallData.assetScale.trend.labels,
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
      type: 'line',
      data: overallData.assetScale.trend.values,
      smooth: true,
      lineStyle: {
        color: colors.profit,
        width: scaleFloat(2.4, 2),
        shadowBlur: scaleNumber(14, 10),
        shadowColor: 'rgba(54, 241, 205, 0.5)'
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(54, 241, 205, 0.28)' },
            { offset: 0.4, color: 'rgba(54, 241, 205, 0.1)' },
            { offset: 1, color: 'rgba(12, 24, 40, 0)' }
          ]
        }
      },
      symbol: 'circle',
      symbolSize: scaleNumber(7, 6),
      showSymbol: false,
      emphasis: { focus: 'series' },
      markPoint: { data: [{ type: 'max', name: '峰值' }] }
    }
  ]
}))

const fundFlowOption = computed(() => ({
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  grid: {
    top: scaleNumber(18, 16),
    bottom: scaleNumber(18, 16),
    left: scaleNumber(34, 30),
    right: scaleNumber(20, 20)
  },
  xAxis: {
    type: 'category',
    data: overallData.fundStatus.flow.labels,
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
      data: overallData.fundStatus.flow.values,
      itemStyle: {
        color: (params: any) => {
          const gradients = [
            [colors.profit, 'rgba(54, 241, 205, 0.25)'],
            [colors.cost, 'rgba(255, 107, 107, 0.25)'],
            [colors.performance, 'rgba(124, 242, 154, 0.25)']
          ]
          const barColors = gradients[params.dataIndex] ?? [colors.revenue, 'rgba(90, 204, 255, 0.25)']
          return {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: barColors[0] },
              { offset: 1, color: barColors[1] }
            ]
          }
        },
        shadowBlur: scaleNumber(12, 10),
        shadowColor: colors.chartShadow
      },
      barWidth: scaleNumber(28, 24),
      borderRadius: [scaleNumber(8, 6), scaleNumber(8, 6), 0, 0],
      label: {
        show: true,
        position: 'top',
        color: colors.textPrimary,
        fontSize: scaleNumber(11, 11),
        fontFamily: "'Chakra Petch', 'Noto Sans SC', sans-serif"
      },
      emphasis: { focus: 'series' }
    }
  ]
}))

const talentPieOption = computed(() => ({
  tooltip: { trigger: 'item' },
  series: [
    {
      type: 'pie',
      radius: ['45%', '70%'],
      label: { color: colors.textPrimary, fontSize: scaleNumber(11, 11), formatter: '{b} {d}%' },
      labelLine: {
        length: scaleNumber(10, 10),
        length2: scaleNumber(10, 10),
        lineStyle: { color: colors.labelLine }
      },
      itemStyle: {
        shadowBlur: scaleNumber(12, 10),
        shadowColor: colors.chartShadow,
        borderColor: colors.chartBorder,
        borderWidth: 1
      },
      emphasis: {
        scale: true,
        scaleSize: scaleNumber(8, 6)
      },
      data: overallData.hrStatus.talent.map((item) => ({
        value: item.value,
        name: item.name,
        itemStyle: { color: item.color }
      }))
    }
  ]
}))
</script>

<style scoped lang="scss">
.overall-grid {
  --space-1: clamp(6px, 0.45vw, 12px);
  --space-2: clamp(10px, 0.7vw, 18px);
  --space-3: clamp(14px, 0.95vw, 24px);
  --text-xs: clamp(11px, 0.55vw, 16px);
  --text-sm: clamp(12px, 0.7vw, 18px);
  --text-md: clamp(14px, 0.8vw, 22px);
  --text-lg: clamp(18px, 1vw, 26px);
  --text-xl: clamp(22px, 1.2vw, 32px);
  width: 100%;
  height: 100%;
  min-height: 0;
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  grid-template-rows: 1.02fr 0.98fr 0.86fr;
  grid-template-areas:
    'profit profit performance'
    'asset fund invest'
    'hr hr hr';
  gap: var(--space-2);
}

.panel-title {
  font-size: var(--text-sm);
  letter-spacing: 0.08em;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.profit-panel,
.asset-panel,
.fund-panel,
.invest-panel,
.performance-panel,
.hr-panel {
  display: grid;
  grid-template-rows: auto 1fr;
  align-content: start;
  min-height: 0;
  background:
    radial-gradient(108% 72% at 0% 100%, rgba(54, 241, 205, 0.08), transparent 58%),
    radial-gradient(92% 68% at 100% 0%, rgba(90, 204, 255, 0.1), transparent 60%),
    var(--bg-panel);
}

.profit-panel {
  grid-area: profit;
}

.asset-panel {
  grid-area: asset;
}

.fund-panel {
  grid-area: fund;
}

.invest-panel {
  grid-area: invest;
}

.performance-panel {
  grid-area: performance;
}

.hr-panel {
  grid-area: hr;
}

.profit-body {
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  gap: var(--space-2);
  height: 100%;
  min-height: 0;
}

.profit-sections {
  display: grid;
  grid-template-rows: repeat(3, minmax(0, 1fr));
  gap: var(--space-1);
  min-height: 0;
}

.profit-section {
  display: grid;
  grid-template-rows: auto 1fr;
  gap: var(--space-1);
  min-height: 0;
  padding: 8px;
  border-radius: 12px;
  background: var(--subscreen-subcard-bg);
  border: 1px solid rgba(90, 204, 255, 0.1);
}

.profit-section:first-child {
  background: var(--subscreen-ring-bg);
  border-color: rgba(90, 204, 255, 0.22);
  box-shadow: inset 0 0 18px rgba(90, 204, 255, 0.08);
}

.section-title {
  font-size: clamp(10px, 0.5vw, 13px);
  color: var(--text-muted);
  letter-spacing: 0.08em;
}

.profit-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 6px var(--space-1);
  font-size: var(--text-sm);
  color: var(--text-secondary);
  padding-right: 4px;
  min-height: 0;
  overflow: auto;
}

.profit-row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  column-gap: var(--space-1);
  padding-bottom: 6px;
  border-bottom: 1px dashed rgba(90, 204, 255, 0.12);
}

.profit-row .value {
  font-family: var(--font-display);
  color: var(--text-primary);
  font-size: var(--text-md);
}

.trend {
  font-family: var(--font-display);
}

.trend.up {
  color: var(--accent-lime);
}

.trend.down {
  color: var(--accent-rose);
}

.trend.flat {
  color: var(--text-muted);
}

.chart {
  width: 100%;
  height: 100%;
  min-height: clamp(140px, 15vh, 220px);
}

.profit-panel .chart {
  min-height: 0;
}

.asset-summary {
  display: grid;
  gap: var(--space-1);
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(90, 204, 255, 0.2);
  background: var(--subscreen-ring-bg);
  box-shadow: inset 0 0 16px rgba(90, 204, 255, 0.06);
  min-height: 0;
  overflow: auto;
}

.asset-value {
  font-family: var(--font-display);
  font-size: var(--text-xl);
}

.asset-growth {
  font-size: var(--text-sm);
  color: var(--text-muted);
}

.asset-tags {
  display: flex;
  gap: var(--space-1);
  flex-wrap: wrap;
}

.fund-summary {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-1);
  font-size: var(--text-sm);
  color: var(--text-secondary);
  min-height: 0;
  overflow: auto;
}

.fund-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 10px;
  background: var(--subscreen-subcard-bg);
  border: 1px solid rgba(90, 204, 255, 0.08);
  border-radius: 10px;
}

.fund-item .value {
  font-family: var(--font-display);
}

.fund-item .up {
  color: var(--accent-lime);
}

.fund-item .down {
  color: var(--accent-rose);
}

.fund-item .warn {
  color: var(--accent-amber);
}

.invest-progress {
  display: grid;
  gap: var(--space-1);
  min-height: 0;
  overflow: auto;
}

.progress-item {
  display: grid;
  gap: 4px;
  padding: 8px 10px;
  border-radius: 10px;
  background: var(--subscreen-subcard-bg);
  border: 1px solid rgba(90, 204, 255, 0.08);
}

.progress-value {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.invest-kpis {
  margin-top: var(--space-1);
  display: grid;
  gap: var(--space-1);
  grid-template-columns: 1fr;
  min-height: 0;
  overflow: auto;
}

.invest-kpis .kpi {
  background: var(--subscreen-subcard-bg);
  border: 1px solid rgba(90, 204, 255, 0.1);
}

.completion-group,
.completion-subs {
  display: grid;
  gap: 6px;
  min-height: 0;
  overflow: auto;
}

.completion-subs {
  margin-top: var(--space-2);
}

.completion-item {
  display: grid;
  gap: 4px;
  padding: 8px 10px;
  border-radius: 10px;
  background: var(--subscreen-subcard-bg);
  border: 1px solid rgba(90, 204, 255, 0.08);
}

.completion-group .completion-item:first-child {
  background: var(--subscreen-ring-bg);
  border-color: rgba(90, 204, 255, 0.2);
}

.completion-label {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.completion-value {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.hr-summary {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-1);
  min-height: 0;
  overflow: auto;
}

.hr-item {
  background: var(--subscreen-subcard-bg);
  border: 1px solid rgba(90, 204, 255, 0.08);
  border-radius: 10px;
  padding: 8px;
  font-size: var(--text-sm);
  color: var(--text-secondary);
  display: grid;
  gap: 4px;
}

.hr-item .value {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  color: var(--text-primary);
}

.asset-panel,
.fund-panel,
.hr-panel {
  grid-template-columns: 1.05fr 1fr;
  column-gap: var(--space-2);
}

.asset-panel .panel-title,
.fund-panel .panel-title,
.hr-panel .panel-title,
.invest-panel .panel-title {
  grid-column: 1 / -1;
}

.asset-panel .asset-summary,
.fund-panel .fund-summary,
.hr-panel .hr-summary {
  grid-column: 1;
  min-height: 0;
}

.asset-panel .chart,
.fund-panel .chart,
.hr-panel .chart {
  grid-column: 2;
  min-height: 0;
}

.invest-panel {
  grid-template-columns: 1.15fr 1fr;
  column-gap: var(--space-2);
}

.invest-panel .invest-progress {
  grid-column: 1;
}

.invest-panel .invest-kpis {
  grid-column: 2;
  margin-top: 0;
  align-content: start;
}

@media (max-width: 1200px) {
  .overall-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      'profit'
      'performance'
      'asset'
      'fund'
      'invest'
      'hr';
    overflow-y: auto;
  }

  .profit-body {
    grid-template-columns: 1fr;
  }

  .profit-sections {
    grid-template-rows: auto;
  }

  .asset-panel,
  .fund-panel,
  .hr-panel,
  .invest-panel {
    grid-template-columns: 1fr;
  }

  .hr-summary {
    grid-template-columns: 1fr;
  }

  .asset-panel .chart,
  .fund-panel .chart,
  .hr-panel .chart {
    grid-column: 1;
  }

  .invest-panel .invest-kpis {
    margin-top: var(--space-2);
  }
}
</style>
