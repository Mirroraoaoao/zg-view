<template>
  <SubScreenLayout title="资金分析" subtitle="Treasury Analysis" meta="数据更新时间 08:30">
    <div v-if="loading" class="treasury-grid treasury-grid--loading">
      <SkeletonPanel class="skeleton-slot skeleton-slot--overview" />
      <SkeletonPanel class="skeleton-slot skeleton-slot--balance" />
      <SkeletonPanel class="skeleton-slot skeleton-slot--cost" />
      <SkeletonPanel class="skeleton-slot skeleton-slot--term" />
    </div>

    <div v-else class="treasury-grid">
      <!-- L1: 融资管理 / L2: 融资进度 -->
      <section class="panel financing-overview panel-animate-in" :style="stagger[0]">
        <PanelHeader title="L1：融资管理 / L2：融资进度" />
        <div class="overview-kpis">
          <div class="kpi-card primary">
            <div class="kpi-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div class="kpi-body">
              <div class="kpi-label">L3：年度融资计划总额</div>
              <div class="kpi-value hero">{{ treasuryData.financing.planTotal }}</div>
              <div class="kpi-sub">年度累计口径</div>
            </div>
          </div>
          <div class="kpi-pair">
            <div class="kpi-card accent-completed">
              <div class="kpi-label">L4：年度融资计划已完成额</div>
              <div class="kpi-value">{{ treasuryData.financing.planCompleted }}</div>
              <div class="kpi-bar"><div class="kpi-bar-fill completed"></div></div>
            </div>
            <div class="kpi-card accent-remaining">
              <div class="kpi-label">L4：年度融资计划剩余额度</div>
              <div class="kpi-value">{{ treasuryData.financing.planRemaining }}</div>
              <div class="kpi-bar"><div class="kpi-bar-fill remaining"></div></div>
            </div>
          </div>
        </div>
      </section>

      <!-- L3: 融资余额 -->
      <section class="panel balance-panel panel-animate-in" :style="stagger[1]">
        <PanelHeader title="L3：融资余额" />
        <div class="balance-list">
          <div v-for="item in balanceItems" :key="item.label" class="balance-item">
            <span class="balance-label">{{ item.label }}</span>
            <strong class="balance-value">{{ item.value }}</strong>
          </div>
        </div>
      </section>

      <!-- L2: 融资成本与结构管理 -->
      <section class="panel cost-structure panel-animate-in" :style="stagger[2]">
        <PanelHeader title="L2：融资成本与结构管理" />
        <div class="cost-summary">
          <div class="cost-item highlight">
            <span>L3：集团综合融资成本率</span>
            <strong>{{ treasuryData.cost.overallRate }}</strong>
          </div>
        </div>
        <div class="chart">
          <BaseChart :options="costTrendOption" ariaLabel="融资成本趋势折线图" />
        </div>
      </section>

      <!-- L3: 负债期限结构 -->
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

const balanceItems = computed(() => [
  { label: 'L4：银行贷款余额', value: treasuryData.financing.balances.bankLoan },
  { label: 'L4：债券余额', value: treasuryData.financing.balances.bond },
  { label: 'L4：信托余额', value: treasuryData.financing.balances.trust },
  { label: 'L4：融资租赁余额', value: treasuryData.financing.balances.financingLease },
  { label: 'L4：其他融资余额', value: treasuryData.financing.balances.other }
])

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
    'overview balance'
    'cost term';
  gap: 14px;
}

.treasury-grid--loading {
  pointer-events: none;
}

.skeleton-slot--overview { grid-area: overview; }
.skeleton-slot--balance { grid-area: balance; }
.skeleton-slot--cost { grid-area: cost; }
.skeleton-slot--term { grid-area: term; }

.financing-overview,
.balance-panel,
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
}

.balance-panel {
  grid-area: balance;
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
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 12px;
  margin-top: 10px;
  height: 100%;
  min-height: 0;
}

.kpi-card {
  padding: var(--space-3) var(--space-4);
  border-radius: 14px;
  background: var(--subscreen-subcard-bg);
  border: 1px solid rgba(90, 204, 255, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
}

.kpi-card.primary {
  border-color: rgba(90, 204, 255, 0.22);
  background: var(--subscreen-ring-bg);
  box-shadow: inset 0 0 18px rgba(90, 204, 255, 0.08);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 18px;
}

.kpi-card.accent-completed {
  border-color: rgba(54, 241, 205, 0.18);
}

.kpi-card.accent-remaining {
  border-color: rgba(248, 197, 71, 0.18);
}

.kpi-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: rgba(54, 241, 205, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-cyan);
  flex-shrink: 0;

  svg {
    width: 28px;
    height: 28px;
  }
}

.kpi-body {
  flex: 1;
  min-width: 0;
}

.kpi-pair {
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 12px;
  min-height: 0;
}

.kpi-label {
  font-size: var(--text-xxs);
  color: var(--text-muted);
  letter-spacing: 0.06em;
  margin-bottom: 4px;
}

.kpi-value {
  font-family: var(--font-display);
  font-size: 1.15rem;
  color: var(--text-primary);
}

.kpi-value.hero {
  font-size: 1.6rem;
  font-weight: 700;
  color: #e9fbff;
  text-shadow: 0 0 12px rgba(90, 204, 255, 0.3);
}

.kpi-sub {
  margin-top: 4px;
  font-size: var(--text-xxs);
  color: var(--text-secondary);
}

.kpi-bar {
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.06);
  margin-top: 4px;
}

.kpi-bar-fill {
  height: 100%;
  border-radius: 2px;
}

.kpi-bar-fill.completed {
  width: 66%;
  background: linear-gradient(90deg, #36f1cd, #5accff);
}

.kpi-bar-fill.remaining {
  width: 34%;
  background: linear-gradient(90deg, #f8c547, #f8c547aa);
}

.chart {
  width: 100%;
  height: 100%;
  min-height: 170px;
}

/* 融资余额面板 */
.balance-list {
  margin-top: 10px;
  display: grid;
  gap: 10px;
  min-height: 0;
  overflow: auto;
}

.balance-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-2) var(--space-3);
  border-radius: 12px;
  background: var(--subscreen-subcard-bg);
  border: 1px solid rgba(90, 204, 255, 0.1);
  font-size: var(--text-xs);
  color: var(--text-secondary);
}

.balance-label {
  flex: 1;
  min-width: 0;
}

.balance-value {
  font-family: var(--font-display);
  color: var(--text-primary);
  font-size: var(--text-md);
  white-space: nowrap;
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
      'balance'
      'cost'
      'term';
    overflow-y: auto;
  }

  .overview-kpis {
    grid-template-columns: 1fr;
  }

  .kpi-card.primary {
    flex-direction: column;
    align-items: flex-start;
  }

  .chart {
    height: 200px;
  }
}
</style>
