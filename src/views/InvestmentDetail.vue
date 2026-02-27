<template>
  <SubScreenLayout title="投资运营" subtitle="Investment Operations" meta="数据更新时间 08:30">
    <div v-if="loading" class="investment-grid investment-grid--loading">
      <SkeletonPanel class="skeleton-slot skeleton-slot--core" />
      <SkeletonPanel class="skeleton-slot skeleton-slot--exit" />
      <SkeletonPanel class="skeleton-slot skeleton-slot--post" />
    </div>

    <div v-else class="investment-grid">
      <!-- L1: 核心投资指标 -->
      <section class="panel core-panel panel-animate-in" :style="stagger[0]">
        <PanelHeader title="L1：核心投资指标" />
        <div class="core-kpis">
          <div class="core-kpi">
            <div class="kpi-label">L2：可售房产面积总量</div>
            <div class="kpi-value">{{ investmentData.core.availablePropertyArea }}</div>
          </div>
          <div class="core-kpi highlight">
            <div class="kpi-label">L2：基金投资总额</div>
            <div class="kpi-value">{{ investmentData.core.fundInvestmentTotal }}</div>
          </div>
          <div class="core-kpi">
            <div class="kpi-label">L2：股权项目总数量</div>
            <div class="kpi-value">{{ investmentData.core.equityProjectCount }}</div>
          </div>
          <div class="core-kpi">
            <div class="kpi-label">L2：基金项目总数量</div>
            <div class="kpi-value">{{ investmentData.core.fundProjectCount }}</div>
          </div>
          <div class="core-kpi highlight">
            <div class="kpi-label">L2：投资回报率（ROI）</div>
            <div class="kpi-value accent">{{ investmentData.core.roi }}</div>
          </div>
        </div>
      </section>

      <!-- L1: 投资指标趋势与对标分析 -->
      <section class="panel exit-panel panel-animate-in" :style="stagger[1]">
        <PanelHeader title="L1：投资指标趋势与对标分析" />
        <div class="exit-layout">
          <div class="exit-section">
            <div class="section-title">L2：年度投资项目退出数量</div>
            <div class="exit-count">{{ investmentData.exitAnalysis.annualExitCount }} 项</div>
            <div class="section-title">L3：年度投资项目退出明细</div>
            <div class="exit-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th scope="col">项目名称</th>
                    <th scope="col">退出金额</th>
                    <th scope="col">退出方式</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in investmentData.exitAnalysis.annualExitDetails" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td>{{ item.amount }}</td>
                    <td>{{ item.type }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="exit-section">
            <div class="section-title">L2：年度退出收益总额</div>
            <div class="exit-count">{{ investmentData.exitAnalysis.annualExitRevenueTotal }}</div>
            <div class="section-title">L3：年度投资项目退出总额明细</div>
            <div class="exit-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th scope="col">项目名称</th>
                    <th scope="col">退出收益</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in investmentData.exitAnalysis.annualExitRevenueDetails" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td>{{ item.revenue }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <!-- L1: 投后运营与效益 -->
      <section class="panel post-panel panel-animate-in" :style="stagger[2]">
        <PanelHeader title="L1：投后运营与效益 / L2：投资公司管理" />
        <div class="post-layout">
          <div class="post-main">
            <article class="post-kpi-card primary">
              <div class="post-label">L3：控股上市公司市值</div>
              <div class="post-value">{{ investmentData.postInvestment.listedCompanyMarketValue }}</div>
              <div class="post-foot">当前口径</div>
            </article>
            <article class="post-kpi-card">
              <div class="post-label">L3：年度分红</div>
              <div class="post-value">{{ investmentData.postInvestment.annualDividend }}</div>
              <div class="post-foot">年度累计</div>
            </article>
          </div>

          <article class="trend-panel">
            <div class="trend-head">市值趋势（{{ marketTrendRange }}）</div>
            <div class="trend-bars">
              <div v-for="item in marketTrendPoints" :key="item.label" class="trend-item">
                <div class="trend-track">
                  <span class="trend-fill" :style="{ height: item.height }"></span>
                </div>
                <span class="trend-year">{{ item.label }}</span>
                <span class="trend-val">{{ item.value }}</span>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  </SubScreenLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import SubScreenLayout from '../components/SubScreenLayout.vue'
import PanelHeader from '../components/PanelHeader.vue'
import SkeletonPanel from '../components/SkeletonPanel.vue'
import { investmentData } from '../data/mockDashboard'
import { useStaggerAnimation } from '../composables/useStaggerAnimation'

const stagger = useStaggerAnimation(3)

const loading = ref(true)
let loadingTimer = 0
onMounted(() => {
  loadingTimer = window.setTimeout(() => { loading.value = false }, 420)
})
onUnmounted(() => window.clearTimeout(loadingTimer))

const marketTrendPoints = computed(() => {
  const labels = investmentData.marketValueTrend.labels
  const values = investmentData.marketValueTrend.values
  const max = Math.max(...values)
  const min = Math.min(...values)
  const span = Math.max(1, max - min)

  return labels.map((label, index) => {
    const value = values[index]
    const ratio = (value - min) / span
    const height = `${28 + ratio * 72}%`

    return {
      label,
      value: `${value} 亿`,
      height
    }
  })
})

const marketTrendRange = computed(() => {
  const labels = investmentData.marketValueTrend.labels
  return `${labels[0]}-${labels[labels.length - 1]}`
})
</script>

<style scoped lang="scss">
.investment-grid {
  width: 100%;
  height: 100%;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  grid-template-rows: minmax(0, 1fr) minmax(0, 1fr);
  grid-template-areas:
    'core exit'
    'post exit';
  gap: 14px;
}

.investment-grid--loading {
  pointer-events: none;
}

.skeleton-slot--core { grid-area: core; }
.skeleton-slot--exit { grid-area: exit; }
.skeleton-slot--post { grid-area: post; }

.core-panel {
  grid-area: core;
}

.exit-panel {
  grid-area: exit;
}

.post-panel {
  grid-area: post;
}

.core-panel,
.exit-panel,
.post-panel {
  min-height: 0;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  background:
    radial-gradient(108% 72% at 0% 100%, rgba(54, 241, 205, 0.08), transparent 58%),
    radial-gradient(92% 68% at 100% 0%, rgba(90, 204, 255, 0.1), transparent 60%),
    var(--bg-panel);
}

/* L1: 核心投资指标 */
.core-kpis {
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  min-height: 0;
  overflow: auto;
}

.core-kpis .core-kpi:last-child {
  grid-column: 1 / -1;
}

.core-kpi {
  padding: var(--space-2) var(--space-3);
  border-radius: 12px;
  background: var(--subscreen-subcard-bg);
  border: 1px solid rgba(90, 204, 255, 0.1);
  display: grid;
  align-content: center;
}

.core-kpi.highlight {
  border-color: rgba(90, 204, 255, 0.22);
  background: var(--subscreen-ring-bg);
  box-shadow: inset 0 0 14px rgba(90, 204, 255, 0.08);
}

.core-kpi .kpi-label {
  font-size: var(--text-xxs);
  color: var(--text-muted);
  letter-spacing: 0.06em;
  margin-bottom: 6px;
}

.core-kpi .kpi-value {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
}

.core-kpi .kpi-value.accent {
  color: var(--accent-cyan);
}

/* L1: 投资指标趋势与对标分析 */
.exit-layout {
  margin-top: 10px;
  min-height: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.exit-section {
  min-height: 0;
  display: grid;
  grid-template-rows: auto auto auto minmax(0, 1fr);
  gap: 6px;
  padding: var(--space-2);
  border-radius: 12px;
  background: var(--subscreen-card-bg);
  border: 1px solid rgba(90, 204, 255, 0.14);
}

.section-title {
  font-size: var(--text-xxs);
  color: var(--text-muted);
  letter-spacing: 0.06em;
}

.exit-count {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--accent-cyan);
}

.exit-table-wrap {
  min-height: 0;
  overflow: auto;
  border-radius: 10px;
  border: 1px solid rgba(90, 204, 255, 0.1);
  background: var(--subscreen-subcard-bg);
  padding: clamp(2px, 0.2vw, 6px);
}

.exit-table-wrap .data-table {
  margin-top: 0;
}

/* L1: 投后运营与效益 */
.post-layout {
  margin-top: 10px;
  min-height: 0;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 12px;
}

.post-main {
  min-height: 0;
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
}

.post-kpi-card {
  border-radius: 14px;
  border: 1px solid rgba(90, 204, 255, 0.14);
  background: var(--subscreen-subcard-bg);
  display: grid;
  place-items: center;
  padding: var(--space-3);
  text-align: center;
}

.post-kpi-card.primary {
  border-color: rgba(90, 204, 255, 0.22);
  background: var(--subscreen-ring-bg);
  box-shadow: inset 0 0 20px rgba(90, 204, 255, 0.08);
}

.post-label {
  font-size: var(--text-xxs);
  color: var(--text-muted);
  letter-spacing: 0.08em;
}

.post-value {
  margin-top: 8px;
  font-size: 1.6rem;
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--text-primary);
  text-shadow: 0 0 12px rgba(90, 204, 255, 0.2);
}

.post-foot {
  margin-top: 6px;
  font-size: var(--text-xxs);
  color: var(--text-secondary);
  letter-spacing: 0.08em;
}

.trend-panel {
  border-radius: 12px;
  padding: var(--space-2) var(--space-3);
  background: var(--subscreen-subcard-bg);
  border: 1px solid rgba(90, 204, 255, 0.12);
  min-height: 0;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
}

.trend-head {
  font-size: var(--text-xxs);
  letter-spacing: 0.08em;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.trend-bars {
  min-height: 80px;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 8px;
  align-items: stretch;
}

.trend-item {
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto auto;
  gap: 6px;
  justify-items: center;
}

.trend-track {
  width: 100%;
  min-height: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(90, 204, 255, 0.12);
  position: relative;
  overflow: hidden;
}

.trend-fill {
  display: block;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(90, 204, 255, 0.9), rgba(54, 241, 205, 0.7));
  box-shadow: 0 0 8px rgba(90, 204, 255, 0.25);
}

.trend-year {
  font-size: var(--text-xxs);
  color: var(--text-muted);
}

.trend-val {
  font-size: var(--text-xxs);
  color: var(--text-secondary);
  font-family: var(--font-display);
}

@media (max-width: 1280px) {
  .investment-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      'core'
      'exit'
      'post';
    overflow-y: auto;
  }

  .exit-layout {
    grid-template-columns: 1fr;
  }

  .post-layout {
    grid-template-columns: 1fr;
  }

  .core-kpis {
    grid-template-columns: 1fr;
  }
}
</style>
