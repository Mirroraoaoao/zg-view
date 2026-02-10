<template>
  <SubScreenLayout title="投资运营" subtitle="Investment Operations" meta="数据更新时间 08:30">
    <div v-if="loading" class="investment-grid investment-grid--loading">
      <SkeletonPanel class="skeleton-slot" />
      <SkeletonPanel class="skeleton-slot" />
    </div>

    <div v-else class="investment-grid">
      <section class="panel core-metrics panel-animate-in" :style="stagger[0]">
        <PanelHeader title="L1：核心投资指标 / L2：投资核心指标看板" />
        <div class="core-layout">
          <article class="hero-metric primary">
            <div class="hero-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div class="hero-content">
              <div class="hero-label">投资总额</div>
              <div class="hero-value">{{ investmentData.core.investmentTotal }}</div>
              <div class="hero-foot">年度累计口径</div>
            </div>
            <div class="hero-badge">核心指标</div>
          </article>

          <div class="core-right">
            <article class="hero-metric secondary">
              <div class="hero-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M9 12h6M12 9v6" />
                </svg>
              </div>
              <div class="hero-content">
                <div class="hero-label">项目总数量</div>
                <div class="hero-value">{{ investmentData.core.projectCount }}</div>
                <div class="hero-foot">在管项目</div>
              </div>
              <div class="hero-badge">项目池</div>
            </article>

            <article class="core-summary">
              <div class="summary-head">指标速览</div>
              <div class="summary-row">
                <span>投资总额</span>
                <strong>{{ investmentData.core.investmentTotal }}</strong>
              </div>
              <div class="summary-row">
                <span>项目总数量</span>
                <strong>{{ investmentData.core.projectCount }}</strong>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="panel market-value panel-animate-in" :style="stagger[1]">
        <PanelHeader title="L1：投后运营与效益 / L2：投资公司管理" />
        <div class="market-layout">
          <article class="market-value-main">
            <div class="market-label">控股上市公司市值</div>
            <div class="market-value-number">{{ investmentData.core.listedCompanyMarketValue }}</div>
            <div class="market-foot">当前口径</div>
          </article>

          <article class="trend-panel">
            <div class="trend-head">市值趋势（{{ marketTrendRange }}）</div>
            <div class="trend-bars">
              <div v-for="item in marketTrendPoints" :key="item.label" class="trend-item">
                <div class="trend-track">
                  <span class="trend-fill" :style="{ height: item.height }"></span>
                </div>
                <span class="trend-year">{{ item.label }}</span>
                <span class="trend-value">{{ item.value }}</span>
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

const stagger = useStaggerAnimation(2)

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
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr);
  gap: 14px;
}

.investment-grid--loading {
  pointer-events: none;
}

.core-metrics,
.market-value {
  min-height: 0;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
}

.core-metrics {
  background:
    radial-gradient(110% 74% at 0% 100%, rgba(54, 241, 205, 0.08), transparent 58%),
    radial-gradient(90% 68% at 100% 0%, rgba(90, 204, 255, 0.1), transparent 60%),
    var(--bg-panel);
}

.market-value {
  background:
    radial-gradient(105% 76% at 100% 100%, rgba(90, 204, 255, 0.1), transparent 62%),
    radial-gradient(90% 68% at 0% 0%, rgba(54, 241, 205, 0.06), transparent 58%),
    var(--bg-panel);
}

.core-layout {
  margin-top: 10px;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
  gap: 12px;
}

.core-right {
  min-height: 0;
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  gap: 12px;
}

.hero-metric {
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: var(--space-4);
  border-radius: 14px;
  background: var(--subscreen-subcard-bg);
  border: 1px solid rgba(90, 204, 255, 0.14);
  min-height: 0;

  &.primary {
    border-color: rgba(54, 241, 205, 0.26);
    background: linear-gradient(135deg, rgba(54, 241, 205, 0.15) 0%, rgba(90, 204, 255, 0.07) 100%);
    box-shadow: inset 0 0 20px rgba(54, 241, 205, 0.08);
  }

  &.secondary {
    background: linear-gradient(135deg, rgba(90, 204, 255, 0.14) 0%, rgba(54, 241, 205, 0.06) 100%);
    border-color: rgba(90, 204, 255, 0.24);

    .hero-icon {
      background: rgba(90, 204, 255, 0.18);
      color: var(--accent-blue);
    }
  }
}

.hero-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(54, 241, 205, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-cyan);
  flex-shrink: 0;

  svg {
    width: 26px;
    height: 26px;
  }
}

.hero-content {
  flex: 1;
  min-width: 0;
}

.hero-label {
  font-size: var(--text-xs);
  color: var(--text-muted);
  letter-spacing: 0.06em;
  margin-bottom: 6px;
}

.hero-value {
  font-size: 1.46rem;
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.15;
}

.hero-foot {
  margin-top: 8px;
  font-size: var(--text-xxs);
  color: var(--text-secondary);
  letter-spacing: 0.08em;
}

.hero-badge {
  position: absolute;
  top: 10px;
  right: 12px;
  padding: clamp(3px, 0.25vw, 6px) var(--space-2);
  border-radius: 12px;
  background: rgba(54, 241, 205, 0.12);
  font-size: var(--text-xxs);
  color: var(--accent-cyan);
  letter-spacing: 0.08em;
}

.core-summary {
  border-radius: 12px;
  padding: var(--space-2) var(--space-3);
  background: var(--subscreen-subcard-bg);
  border: 1px solid rgba(90, 204, 255, 0.12);
}

.summary-head {
  font-size: var(--text-xs);
  letter-spacing: 0.08em;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-1) 0;
  border-top: 1px solid rgba(90, 204, 255, 0.12);
  font-size: var(--text-xs);
  color: var(--text-secondary);

  &:first-of-type {
    border-top: none;
    padding-top: 0;
  }

  strong {
    font-family: var(--font-display);
    color: var(--text-primary);
    font-size: var(--text-sm);
  }
}

.market-layout {
  margin-top: 10px;
  min-height: 0;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  gap: 12px;
}

.market-value-main {
  border-radius: 14px;
  border: 1px solid rgba(90, 204, 255, 0.2);
  background: var(--subscreen-ring-bg);
  display: grid;
  place-items: center;
  padding: var(--space-3);
  box-shadow: inset 0 0 24px rgba(90, 204, 255, 0.08);
}

.market-label {
  font-size: var(--text-xs);
  color: var(--text-muted);
  letter-spacing: 0.1em;
}

.market-value-number {
  margin-top: 8px;
  font-size: 2rem;
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--text-primary);
  text-shadow: 0 0 12px rgba(90, 204, 255, 0.2);
}

.market-foot {
  margin-top: 8px;
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
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 8px;
  align-items: end;
}

.trend-item {
  min-height: 0;
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto auto;
  gap: 6px;
  justify-items: center;
}

.trend-track {
  width: 100%;
  height: 100%;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(90, 204, 255, 0.12);
  display: flex;
  align-items: end;
  padding: clamp(2px, 0.22vw, 6px);
}

.trend-fill {
  width: 100%;
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(90, 204, 255, 0.9), rgba(54, 241, 205, 0.7));
  box-shadow: 0 0 8px rgba(90, 204, 255, 0.25);
}

.trend-year {
  font-size: var(--text-xxs);
  color: var(--text-muted);
}

.trend-value {
  font-size: var(--text-xxs);
  color: var(--text-secondary);
  font-family: var(--font-display);
}

@media (max-width: 1280px) {
  .investment-grid {
    grid-template-columns: 1fr;
    grid-template-rows: minmax(0, 1fr) minmax(0, 1fr);
    overflow-y: auto;
  }

  .core-layout {
    grid-template-columns: 1fr;
    grid-template-rows: minmax(0, 1fr) auto;
  }

  .core-right {
    grid-template-rows: auto auto;
  }
}

@media (max-width: 900px) {
  .trend-bars {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
  }
}
</style>
