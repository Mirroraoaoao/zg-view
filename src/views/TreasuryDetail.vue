<template>
  <SubScreenLayout title="资金分析" subtitle="Treasury Analysis" meta="数据更新时间 08:30">
    <div v-if="loading" class="treasury-grid treasury-grid--loading">
      <SkeletonPanel class="skeleton-slot skeleton-slot--overview" />
      <SkeletonPanel class="skeleton-slot skeleton-slot--channel" />
      <SkeletonPanel class="skeleton-slot skeleton-slot--cost" />
      <SkeletonPanel class="skeleton-slot skeleton-slot--term" />
    </div>

    <div v-else class="treasury-grid">
      <section class="panel financing-overview panel-animate-in" :style="stagger[0]">
        <PanelHeader title="L1：融资管理 / L2：融资进度" />
        <div class="overview-kpis">
          <div class="kpi-card primary">
            <div class="kpi-label">年度融资计划总额</div>
            <div class="kpi-value">{{ treasuryData.financing.planTotal }}</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">年度融资计划已完成额</div>
            <div class="kpi-value">{{ treasuryData.financing.planCompleted }}</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">年度融资计划剩余额度</div>
            <div class="kpi-value">{{ treasuryData.financing.planRemaining }}</div>
          </div>
        </div>
        <div class="chart">
          <BaseChart :options="financingChannelOption" ariaLabel="融资渠道额度占比条形图" />
        </div>
      </section>

      <section class="panel channel-detail panel-animate-in" :style="stagger[1]">
        <PanelHeader title="L3：融资渠道额度占比" />
        <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th scope="col">指标项</th>
              <th scope="col">指标值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>融资银行贷款额度占比</td>
              <td>{{ treasuryData.financing.channels.bankLoan.ratio }}</td>
            </tr>
            <tr>
              <td>融资债券额度占比</td>
              <td>{{ treasuryData.financing.channels.bond.ratio }}</td>
            </tr>
            <tr>
              <td>融资信托额度占比</td>
              <td>{{ treasuryData.financing.channels.trust.ratio }}</td>
            </tr>
          </tbody>
        </table>
        </div>
      </section>

      <section class="panel cost-structure panel-animate-in" :style="stagger[2]">
        <PanelHeader title="L2：融资成本与结构管理" />
        <div class="cost-summary">
          <div class="cost-item highlight">
            <span>集团综合融资成本率</span>
            <strong>{{ treasuryData.cost.overallRate }}</strong>
          </div>
          <div class="cost-item">
            <span>长期融资占比</span>
            <strong>{{ treasuryData.cost.termStructure.longTerm }}</strong>
          </div>
          <div class="cost-item">
            <span>短期融资占比</span>
            <strong>{{ treasuryData.cost.termStructure.shortTerm }}</strong>
          </div>
        </div>
        <div class="chart">
          <BaseChart :options="costTrendOption" ariaLabel="融资成本趋势折线图" />
        </div>
      </section>

      <section class="panel term-structure panel-animate-in" :style="stagger[3]">
        <PanelHeader title="L3：负债期限结构" />
        <div class="chart">
          <BaseChart :options="termStructureOption" ariaLabel="负债期限结构饼图" />
        </div>
        <div class="structure-tags">
          <span class="chip">长期负债 {{ treasuryData.cost.termStructure.longTerm }}</span>
          <span class="chip">短期负债 {{ treasuryData.cost.termStructure.shortTerm }}</span>
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
import { treasuryData } from '../data/mockDashboard'
import { useStaggerAnimation } from '../composables/useStaggerAnimation'

const stagger = useStaggerAnimation(4)

const loading = ref(true)
let loadingTimer = 0
onMounted(() => {
  loadingTimer = window.setTimeout(() => { loading.value = false }, 420)
})
onUnmounted(() => window.clearTimeout(loadingTimer))

const financingChannelOption = computed(() => ({
  grid: { top: 20, bottom: 20, left: 80, right: 30 },
  xAxis: { type: 'value', max: 100, splitLine: { show: false }, axisLabel: { show: false } },
  yAxis: {
    type: 'category',
    data: ['融资银行贷款额度占比', '融资债券额度占比', '融资信托额度占比'],
    axisLine: { show: false },
    axisTick: { show: false }
  },
  series: [
    {
      type: 'bar',
      semantic: 'revenue',
      data: [
        Number.parseFloat(treasuryData.financing.channels.bankLoan.ratio),
        Number.parseFloat(treasuryData.financing.channels.bond.ratio),
        Number.parseFloat(treasuryData.financing.channels.trust.ratio)
      ],
      barWidth: 14,
      label: { show: true, position: 'right', formatter: '{c}%' }
    }
  ]
}))

const costTrendOption = computed(() => ({
  grid: { top: 20, bottom: 20, left: 40, right: 20 },
  xAxis: {
    type: 'category',
    data: treasuryData.cost.costTrend.labels
  },
  yAxis: {
    type: 'value',
    min: 3.8,
    max: 4.8,
    axisLabel: { formatter: '{value}%' }
  },
  series: [
    {
      type: 'line',
      semantic: 'benchmark',
      data: treasuryData.cost.costTrend.values,
      smooth: true,
      symbol: 'circle',
      symbolSize: 6,
      markPoint: { data: [{ type: 'min', name: '最低' }] }
    }
  ]
}))

const termStructureOption = computed(() => ({
  tooltip: { trigger: 'item' },
  series: [
    {
      type: 'pie',
      radius: ['45%', '70%'],
      label: { formatter: '{b}\n{d}%' },
      data: [
        { value: 58, name: '长期融资' },
        { value: 42, name: '短期融资' }
      ]
    }
  ]
}))
</script>

<style scoped lang="scss">
.treasury-grid {
  width: 100%;
  height: 100%;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  grid-template-rows: minmax(0, 1.05fr) minmax(0, 0.95fr);
  grid-template-areas:
    'overview channel'
    'cost term';
  gap: 14px;
}

.treasury-grid--loading {
  pointer-events: none;
}

.skeleton-slot--overview { grid-area: overview; }
.skeleton-slot--channel { grid-area: channel; }
.skeleton-slot--cost { grid-area: cost; }
.skeleton-slot--term { grid-area: term; }

.financing-overview,
.channel-detail,
.cost-structure,
.term-structure {
  min-height: 0;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  background:
    radial-gradient(108% 72% at 0% 100%, rgba(54, 241, 205, 0.08), transparent 58%),
    radial-gradient(92% 68% at 100% 0%, rgba(90, 204, 255, 0.1), transparent 60%),
    var(--bg-panel);
}

.financing-overview {
  grid-area: overview;
  grid-template-rows: auto auto minmax(0, 1fr);
}

.channel-detail {
  grid-area: channel;
}

.cost-structure {
  grid-area: cost;
  grid-template-rows: auto auto minmax(0, 1fr);
}

.term-structure {
  grid-area: term;
  grid-template-rows: auto minmax(0, 1fr) auto;
}

.overview-kpis {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 12px;
}

.kpi-card {
  padding: var(--space-2) var(--space-3);
  border-radius: 12px;
  background: var(--subscreen-subcard-bg);
  border: 1px solid rgba(90, 204, 255, 0.1);
}

.kpi-card.primary {
  border-color: rgba(90, 204, 255, 0.22);
  background: var(--subscreen-ring-bg);
  box-shadow: inset 0 0 14px rgba(90, 204, 255, 0.08);
}

.kpi-label {
  font-size: var(--text-xs);
  color: var(--text-muted);
  letter-spacing: 0.1em;
  margin-bottom: 6px;
}

.kpi-value {
  font-family: var(--font-display);
  font-size: 1.1rem;
  color: var(--text-primary);
}

.chart {
  width: 100%;
  height: 100%;
  min-height: 170px;
}

.table-wrap {
  margin-top: 10px;
  border-radius: 12px;
  background: var(--subscreen-subcard-bg);
  border: 1px solid rgba(90, 204, 255, 0.1);
  padding: var(--space-1);
  overflow: auto;
  min-height: 0;
}

.table-wrap .data-table {
  margin-top: 0;
}

.cost-summary {
  display: grid;
  gap: 10px;
  margin-bottom: 12px;
}

.cost-item {
  display: flex;
  justify-content: space-between;
  padding: var(--space-2) var(--space-3);
  border-radius: 12px;
  background: var(--subscreen-subcard-bg);
  border: 1px solid rgba(90, 204, 255, 0.1);
  font-size: var(--text-xs);
  color: var(--text-secondary);
}

.cost-item.highlight {
  border-color: rgba(90, 204, 255, 0.22);
  background: var(--subscreen-ring-bg);
  box-shadow: inset 0 0 14px rgba(90, 204, 255, 0.08);
}

.cost-item strong {
  font-family: var(--font-display);
  color: var(--text-primary);
}

.structure-tags {
  margin-top: 10px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

@media (max-width: 1200px) {
  .treasury-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      'overview'
      'channel'
      'cost'
      'term';
    overflow-y: auto;
  }

  .overview-kpis {
    grid-template-columns: 1fr;
  }

  .chart {
    height: 200px;
  }
}
</style>
