<template>
  <SubScreenLayout title="资产管理" subtitle="Asset Management" meta="数据更新时间 08:30">
    <div v-if="loading" class="asset-grid asset-grid--loading">
      <SkeletonPanel class="skeleton-slot skeleton-slot--operation" />
      <SkeletonPanel class="skeleton-slot skeleton-slot--sales" />
      <SkeletonPanel class="skeleton-slot skeleton-slot--disposal" />
    </div>

    <div v-else class="asset-grid">
      <!-- L1: 物业资产盘活 / L2: 资产运营 -->
      <section class="panel operation-panel panel-animate-in" :style="stagger[0]">
        <div class="section-head">
          <PanelHeader title="L1：物业资产盘活 · L2：资产运营" />
          <span class="section-chip">实时盘活视图</span>
        </div>

        <div class="operation-layout">
          <div class="ring-card">
            <div class="ring-halo"></div>
            <div class="rental-ring">
              <svg viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="12" />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="url(#rentalGrad)"
                  stroke-width="12"
                  :stroke-dasharray="ringDasharray"
                  stroke-linecap="round"
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <div class="ring-center">
                <div class="ring-value">{{ assetData.rental.overall }}</div>
                <div class="ring-label">物业总体出租率</div>
              </div>
            </div>
            <div class="ring-caption">
              <span>资产运营强度</span>
              <strong>高位运行</strong>
            </div>
          </div>

          <div class="operation-details">
            <div class="subsection">
              <div class="section-title">L3：物业分类出租率</div>
              <div class="rental-detail">
                <div v-for="item in assetData.rental.byType" :key="item.label" class="rental-item">
                  <div class="rental-row">
                    <span class="rental-label">{{ item.label }}</span>
                    <span class="rental-value">{{ item.value }}</span>
                  </div>
                  <div class="mini-track">
                    <span class="mini-fill" :style="{ width: rateWidth(item.value) }"></span>
                  </div>
                </div>
              </div>
            </div>

            <div class="subsection">
              <div class="section-title">L3：出租面积与租金收入</div>
              <div class="area-kpis">
                <div class="area-kpi">
                  <div class="area-label">可出租房产面积</div>
                  <div class="area-value">{{ assetData.rental.area.rentable }}</div>
                </div>
                <div class="area-kpi">
                  <div class="area-label">已出租面积</div>
                  <div class="area-value">{{ assetData.rental.area.rented }}</div>
                </div>
                <div class="area-kpi highlight">
                  <div class="area-label">年度累计租金收入</div>
                  <div class="area-value">{{ assetData.rental.income }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <svg style="position: absolute; width: 0; height: 0;">
          <defs>
            <linearGradient id="rentalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#36f1cd" />
              <stop offset="100%" stop-color="#5accff" />
            </linearGradient>
          </defs>
        </svg>
      </section>

      <!-- L2: 资产去化 -->
      <section class="panel sales-panel panel-animate-in" :style="stagger[1]">
        <div class="section-head">
          <PanelHeader title="L2：资产去化" />
          <span class="section-chip warm">销售口径</span>
        </div>
        <div class="section-title">L3：销售与可售库存</div>

        <div class="sales-kpis">
          <div class="sales-kpi">
            <div class="sales-label">L3：可售房产面积总量</div>
            <div class="sales-value">{{ assetData.sales.availableArea }}</div>
          </div>
          <div class="sales-kpi">
            <div class="sales-label">L3：年度房产销售面积</div>
            <div class="sales-value">{{ assetData.sales.annualArea }}</div>
          </div>
          <div class="sales-kpi primary">
            <div class="sales-label">L3：年度房产销售额</div>
            <div class="sales-value">{{ assetData.sales.annualAmount }}</div>
          </div>
          <div class="sales-kpi">
            <div class="sales-label">L3：年度房产销售目标</div>
            <div class="sales-value">{{ assetData.sales.annualTarget }}</div>
          </div>
        </div>

        <div class="completion-progress">
          <div class="completion-head">
            <span>L3：年度房产销售额完成率</span>
            <strong>{{ assetData.sales.completionRate }}</strong>
          </div>
          <div class="progress">
            <div class="progress-bar" :style="{ width: `${completionRatio}%` }"></div>
          </div>
          <div class="progress-scale">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
      </section>

      <!-- L3: 其他去化方式完成额 -->
      <section class="panel disposal-panel panel-animate-in" :style="stagger[2]">
        <PanelHeader title="L3：其他去化方式完成额" />
        <div class="disposal-list">
          <div class="disposal-item">
            <div class="disposal-label">L4：大宗交易完成额</div>
            <div class="disposal-value">{{ assetData.sales.otherDisposal.bulkTransaction }}</div>
          </div>
          <div class="disposal-item">
            <div class="disposal-label">L4：退地完成额</div>
            <div class="disposal-value">{{ assetData.sales.otherDisposal.landReturn }}</div>
          </div>
          <div class="disposal-item">
            <div class="disposal-label">L4：资产证券化完成额</div>
            <div class="disposal-value">{{ assetData.sales.otherDisposal.assetSecuritization }}</div>
          </div>
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
import { assetData } from '../data/mockDashboard'
import { useStaggerAnimation } from '../composables/useStaggerAnimation'

const stagger = useStaggerAnimation(3)

const loading = ref(true)
let loadingTimer = 0
onMounted(() => {
  loadingTimer = window.setTimeout(() => { loading.value = false }, 420)
})
onUnmounted(() => window.clearTimeout(loadingTimer))

const clampPercent = (value: string) => {
  const numeric = Number.parseFloat(value)
  if (!Number.isFinite(numeric)) return 0
  return Math.max(0, Math.min(100, numeric))
}

const completionRatio = computed(() => clampPercent(assetData.sales.completionRate))
const rentalRatio = computed(() => clampPercent(assetData.rental.overall))
const ringDasharray = computed(() => `${(rentalRatio.value / 100) * 327}, 327`)
const rateWidth = (value: string) => `${clampPercent(value)}%`
</script>

<style scoped lang="scss">
.asset-grid {
  width: 100%;
  height: 100%;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.65fr);
  grid-template-rows: minmax(0, 1fr) minmax(0, 0.6fr);
  grid-template-areas:
    'operation sales'
    'operation disposal';
  gap: 14px;
}

.asset-grid--loading {
  pointer-events: none;
}

.skeleton-slot--operation { grid-area: operation; }
.skeleton-slot--sales { grid-area: sales; }
.skeleton-slot--disposal { grid-area: disposal; }

.operation-panel {
  grid-area: operation;
  position: relative;
  min-height: 0;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  background:
    radial-gradient(110% 75% at 0% 100%, rgba(54, 241, 205, 0.08), transparent 60%),
    radial-gradient(95% 70% at 100% 0%, rgba(90, 204, 255, 0.11), transparent 58%),
    var(--bg-panel);
}

.sales-panel {
  grid-area: sales;
  position: relative;
  min-height: 0;
  display: grid;
  grid-template-rows: auto auto minmax(0, 1fr) auto;
  background:
    radial-gradient(100% 70% at 100% 100%, rgba(90, 204, 255, 0.12), transparent 62%),
    radial-gradient(90% 60% at 0% 0%, rgba(54, 241, 205, 0.07), transparent 60%),
    var(--bg-panel);
}

.disposal-panel {
  grid-area: disposal;
  min-height: 0;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  background:
    radial-gradient(108% 72% at 0% 100%, rgba(54, 241, 205, 0.08), transparent 58%),
    radial-gradient(92% 68% at 100% 0%, rgba(90, 204, 255, 0.1), transparent 60%),
    var(--bg-panel);
}

.section-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.section-head :deep(.panel-header) {
  margin-bottom: 0;
}

.section-chip {
  padding: clamp(4px, 0.3vw, 8px) var(--space-2);
  border-radius: 999px;
  border: 1px solid rgba(90, 204, 255, 0.32);
  background: rgba(90, 204, 255, 0.14);
  color: var(--accent-cyan);
  font-size: var(--text-xxs);
  letter-spacing: 0.08em;
  white-space: nowrap;
}

.section-chip.warm {
  border-color: rgba(90, 204, 255, 0.5);
  background: rgba(90, 204, 255, 0.2);
  color: var(--text-primary);
}

.section-title {
  font-size: var(--text-xxs);
  color: var(--text-muted);
  letter-spacing: 0.06em;
}

.operation-layout {
  margin-top: 10px;
  display: grid;
  grid-template-columns: 170px 1fr;
  gap: 12px;
  min-height: 0;
}

.ring-card {
  position: relative;
  border-radius: 14px;
  border: 1px solid rgba(90, 204, 255, 0.22);
  background: var(--subscreen-ring-bg);
  display: grid;
  grid-template-rows: 1fr auto;
  padding: var(--space-2) var(--space-2);
  min-height: 0;
  overflow: hidden;
}

.ring-halo {
  position: absolute;
  inset: -25% -45% auto auto;
  width: 180px;
  height: 180px;
  background: radial-gradient(circle, rgba(90, 204, 255, 0.24), transparent 68%);
  pointer-events: none;
}

.rental-ring {
  position: relative;
  width: 132px;
  height: 132px;
  margin: 0 auto;

  svg {
    width: 100%;
    height: 100%;
  }
}

.ring-center {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.ring-value {
  font-size: 1.75rem;
  font-family: var(--font-display);
  font-weight: 700;
  color: #e9fbff;
}

.ring-label {
  font-size: var(--text-xxs);
  color: var(--text-muted);
  margin-top: 4px;
  text-align: center;
}

.ring-caption {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid rgba(90, 204, 255, 0.16);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--text-xs);
  color: var(--text-muted);
}

.ring-caption strong {
  color: var(--accent-cyan);
  font-family: var(--font-display);
}

.operation-details {
  display: grid;
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 12px;
  min-height: 0;
}

.subsection {
  min-height: 0;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  padding: var(--space-2);
  border-radius: 12px;
  background: var(--subscreen-card-bg);
  border: 1px solid rgba(90, 204, 255, 0.14);
}

.rental-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 8px;
  min-height: 0;
}

.rental-item {
  border-radius: 10px;
  padding: var(--space-1) var(--space-2);
  background: var(--subscreen-subcard-bg);
  border: 1px solid rgba(90, 204, 255, 0.09);
  display: grid;
  gap: 6px;
}

.rental-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rental-label {
  color: var(--text-secondary);
  font-size: var(--text-xs);
}

.rental-value {
  font-family: var(--font-display);
  color: var(--text-primary);
  font-size: var(--text-md);
}

.mini-track {
  width: 100%;
  height: 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
}

.mini-fill {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #36f1cd, #5accff);
  box-shadow: 0 0 10px rgba(54, 241, 205, 0.28);
}

.area-kpis {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  min-height: 0;
}

.area-kpi {
  padding: var(--space-2) var(--space-1);
  border-radius: 10px;
  background: var(--subscreen-subcard-bg);
  border: 1px solid rgba(90, 204, 255, 0.09);
  text-align: center;
  display: grid;
  align-content: center;
}

.area-kpi.highlight {
  border-color: rgba(54, 241, 205, 0.32);
  background: rgba(54, 241, 205, 0.09);
  box-shadow: inset 0 0 16px rgba(54, 241, 205, 0.1);
}

.area-label {
  font-size: var(--text-xxs);
  color: var(--text-muted);
  margin-bottom: 6px;
}

.area-value {
  font-size: 1.08rem;
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--text-primary);
}

/* 资产去化 */
.sales-kpis {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 8px;
  min-height: 0;
}

.sales-kpi {
  padding: var(--space-2) var(--space-3);
  border-radius: 12px;
  background: var(--subscreen-subcard-bg);
  border: 1px solid rgba(90, 204, 255, 0.1);
  display: grid;
  align-content: center;
}

.sales-kpi.primary {
  border-color: rgba(90, 204, 255, 0.32);
  background: linear-gradient(135deg, rgba(90, 204, 255, 0.2), rgba(90, 204, 255, 0.08));
  box-shadow: inset 0 0 20px rgba(90, 204, 255, 0.14);
}

.sales-label {
  font-size: var(--text-xxs);
  color: var(--text-muted);
  margin-bottom: 6px;
}

.sales-value {
  font-size: 1.15rem;
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.2;
}

.sales-kpi.primary .sales-value {
  font-size: 1.4rem;
  color: #e9fbff;
}

.completion-progress {
  margin-top: 12px;
  padding: var(--space-2);
  border-radius: 12px;
  background: var(--subscreen-card-bg);
  border: 1px solid rgba(90, 204, 255, 0.14);
}

.completion-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: var(--text-xs);
  color: var(--text-secondary);
}

.completion-head strong {
  font-family: var(--font-display);
  color: var(--text-primary);
}

.progress {
  width: 100%;
  height: 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #36f1cd 0%, #5accff 100%);
  box-shadow: 0 0 12px rgba(54, 241, 205, 0.28);
}

.progress-scale {
  margin-top: 6px;
  display: flex;
  justify-content: space-between;
  font-size: var(--text-xxs);
  color: var(--text-muted);
}

/* 其他去化方式 */
.disposal-list {
  margin-top: 10px;
  display: grid;
  gap: 10px;
  min-height: 0;
  overflow: auto;
}

.disposal-item {
  padding: var(--space-2) var(--space-3);
  border-radius: 12px;
  background: var(--subscreen-subcard-bg);
  border: 1px solid rgba(90, 204, 255, 0.1);
}

.disposal-label {
  font-size: var(--text-xxs);
  color: var(--text-muted);
  margin-bottom: 6px;
}

.disposal-value {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--text-primary);
}

@media (max-width: 1200px) {
  .asset-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      'operation'
      'sales'
      'disposal';
    overflow-y: auto;
  }

  .operation-layout {
    grid-template-columns: 1fr;
  }

  .rental-detail {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }

  .area-kpis {
    grid-template-columns: 1fr;
  }

  .sales-kpis {
    grid-template-columns: 1fr;
  }
}
</style>
