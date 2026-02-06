<template>
  <SubScreenLayout title="资产管理" subtitle="Asset Management" meta="数据更新时间 08:30">
    <div class="asset-grid">
      <section class="panel operation-panel">
        <div class="section-head">
          <h3 class="panel-title">L1：物业资产盘活 · L2：资产运营</h3>
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
                  <div class="area-label">租金收入</div>
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

      <section class="panel sales-panel">
        <div class="section-head">
          <h3 class="panel-title">L2：资产去化</h3>
          <span class="section-chip warm">销售口径</span>
        </div>
        <div class="section-title">L3：销售与可售库存</div>

        <div class="sales-kpis">
          <div class="sales-kpi primary">
            <div class="sales-label">年度房产销售额</div>
            <div class="sales-value">{{ assetData.sales.annualAmount }}</div>
          </div>
          <div class="sales-kpi">
            <div class="sales-label">年度房产销售面积</div>
            <div class="sales-value">{{ assetData.sales.annualArea }}</div>
          </div>
          <div class="sales-kpi">
            <div class="sales-label">可售房产面积</div>
            <div class="sales-value">{{ assetData.sales.availableArea }}</div>
          </div>
        </div>

        <div class="completion-progress">
          <div class="completion-head">
            <span>年度房产销售额完成率</span>
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
    </div>
  </SubScreenLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SubScreenLayout from '../components/SubScreenLayout.vue'
import { assetData } from '../data/mockDashboard'

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
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr);
  gap: 14px;
}

.operation-panel {
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
  position: relative;
  min-height: 0;
  display: grid;
  grid-template-rows: auto auto minmax(0, 1fr) auto;
  background:
    radial-gradient(100% 70% at 100% 100%, rgba(90, 204, 255, 0.12), transparent 62%),
    radial-gradient(90% 60% at 0% 0%, rgba(54, 241, 205, 0.07), transparent 60%),
    var(--bg-panel);
}

.operation-panel::before,
.sales-panel::before {
  content: '';
  position: absolute;
  inset: auto 8% -120px auto;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(90, 204, 255, 0.14), transparent 72%);
  filter: blur(14px);
  pointer-events: none;
}

.section-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.section-chip {
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid rgba(90, 204, 255, 0.32);
  background: rgba(90, 204, 255, 0.14);
  color: var(--accent-cyan);
  font-size: 0.64rem;
  letter-spacing: 0.08em;
  white-space: nowrap;
}

.section-chip.warm {
  border-color: rgba(90, 204, 255, 0.5);
  background: rgba(90, 204, 255, 0.2);
  color: var(--text-primary);
}

.operation-layout {
  margin-top: 10px;
  display: grid;
  grid-template-columns: 170px 1fr;
  gap: 12px;
  min-height: 0;
}

.panel-title {
  font-size: 0.98rem;
  letter-spacing: 0.02em;
  color: var(--text-primary);
  font-weight: 600;
}

.ring-card {
  position: relative;
  border-radius: 14px;
  border: 1px solid rgba(90, 204, 255, 0.22);
  background: var(--subscreen-ring-bg);
  display: grid;
  grid-template-rows: 1fr auto;
  padding: 12px 10px;
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
  font-size: 0.62rem;
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
  font-size: 0.66rem;
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
  padding: 10px;
  border-radius: 12px;
  background: var(--subscreen-card-bg);
  border: 1px solid rgba(90, 204, 255, 0.14);
}

.section-title {
  font-size: 0.64rem;
  color: var(--text-muted);
  margin-bottom: 8px;
  letter-spacing: 0.08em;
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
  padding: 8px 10px;
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
  font-size: 0.67rem;
}

.rental-value {
  font-family: var(--font-display);
  color: var(--text-primary);
  font-size: 0.86rem;
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
  padding: 10px 8px;
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
  font-size: 0.62rem;
  color: var(--text-muted);
  margin-bottom: 6px;
}

.area-value {
  font-size: 1.08rem;
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--text-primary);
}

.sales-kpis {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1.2fr 1fr 1fr;
  gap: 10px;
  margin-top: 8px;
  min-height: 0;
}

.sales-kpi {
  padding: 12px 14px;
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
  font-size: 0.64rem;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.sales-value {
  font-size: 1.28rem;
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.2;
}

.sales-kpi.primary .sales-value {
  font-size: 1.95rem;
  color: #e9fbff;
}

.completion-progress {
  margin-top: 12px;
  padding: 12px;
  border-radius: 12px;
  background: var(--subscreen-card-bg);
  border: 1px solid rgba(90, 204, 255, 0.14);
}

.completion-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 0.7rem;
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
  font-size: 0.62rem;
  color: var(--text-muted);
}

@media (max-width: 1200px) {
  .asset-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    overflow-y: auto;
  }

  .operation-panel,
  .sales-panel {
    display: block;
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
    grid-template-rows: auto;
  }
}
</style>
