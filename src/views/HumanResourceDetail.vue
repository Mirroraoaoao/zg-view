<template>
  <SubScreenLayout title="人力资源" subtitle="Human Resources" meta="数据更新时间 08:30">
    <div v-if="loading" class="hr-grid hr-grid--loading">
      <SkeletonPanel class="skeleton-slot skeleton-slot--cadre" />
      <SkeletonPanel class="skeleton-slot skeleton-slot--summary" />
      <SkeletonPanel class="skeleton-slot skeleton-slot--salary" />
      <SkeletonPanel class="skeleton-slot skeleton-slot--talent" />
    </div>

    <div v-else class="hr-grid">
      <section class="panel cadre-panel panel-animate-in" :style="stagger[0]">
        <div class="section-head">
          <PanelHeader title="L1：干部管理" />
          <span class="section-chip">组织结构</span>
        </div>

        <div class="cadre-layout">
          <div class="cadre-overview">
            <div class="section-title">L2：集团中层干部基本情况</div>
            <div class="overview-main">
              <div class="party-ring-card">
                <div class="ring-halo"></div>
                <div class="party-ring">
                  <svg viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="12" />
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke="url(#partyGrad)"
                      stroke-width="12"
                      :stroke-dasharray="ringDasharray"
                      stroke-linecap="round"
                      transform="rotate(-90 60 60)"
                    />
                  </svg>
                  <div class="ring-center">
                    <div class="ring-value">{{ hrData.partyMember.ratio }}</div>
                    <div class="ring-label">党员占比</div>
                  </div>
                </div>
              </div>

              <div class="overview-kpis">
                <div class="overview-item">
                  <div class="overview-label">党员占比</div>
                  <div class="overview-value">{{ hrData.partyMember.ratio }}</div>
                </div>
                <div class="overview-item">
                  <div class="overview-label">干部总量</div>
                  <div class="overview-value">{{ hrData.partyMember.total }} 人</div>
                </div>
              </div>
            </div>
          </div>

          <div class="cadre-table-panel">
            <div class="section-title">L2：职级分布</div>
            <div class="table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th scope="col">职级</th>
                    <th scope="col">制造板块</th>
                    <th scope="col">服务板块</th>
                    <th scope="col">投资板块</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in hrData.cadreDistribution" :key="item.level">
                    <td>{{ item.level }}</td>
                    <td>{{ item.manufacturing }}</td>
                    <td>{{ item.service }}</td>
                    <td>{{ item.investment }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <svg style="position: absolute; width: 0; height: 0">
          <defs>
            <linearGradient id="partyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#36f1cd" />
              <stop offset="100%" stop-color="#5accff" />
            </linearGradient>
          </defs>
        </svg>
      </section>

      <section class="panel summary-panel panel-animate-in" :style="stagger[1]">
        <div class="section-head">
          <PanelHeader title="L1：人员情况" />
          <span class="section-chip">规模总览</span>
        </div>
        <div class="summary-kpis">
          <div v-for="item in personnelSummary" :key="item.label" class="summary-kpi">
            <div class="summary-label">{{ item.label }}</div>
            <div class="summary-value">{{ item.value }}</div>
          </div>
        </div>
      </section>

      <section class="panel salary-panel panel-animate-in" :style="stagger[2]">
        <div class="section-head">
          <PanelHeader title="L1：人力成本预算执行情况" />
          <span class="section-chip">成本与人效</span>
        </div>
        <div class="salary-grid">
          <div class="salary-section">
            <div class="section-title">L2：各版块人均工资</div>
            <div class="salary-list">
              <div v-for="item in hrData.salaryBySegment" :key="item.name" class="salary-item">
                <span>{{ item.name }}</span>
                <strong>{{ item.value }}</strong>
              </div>
            </div>
          </div>
          <div class="salary-section">
            <div class="section-title">L2：各版块人效比</div>
            <div class="salary-list">
              <div v-for="item in hrData.efficiencyBySegment" :key="item.name" class="salary-item">
                <span>{{ item.name }}</span>
                <strong>{{ item.value }}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="panel talent-panel panel-animate-in" :style="stagger[3]">
        <div class="section-head">
          <PanelHeader title="L1：产业人才结构" />
          <span class="section-chip">结构分布</span>
        </div>
        <div class="talent-layout">
          <div class="chart">
            <BaseChart :options="talentOption" ariaLabel="产业人才结构饼图" />
          </div>
          <div class="talent-legend">
            <div v-for="item in hrData.talentStructure" :key="item.name" class="legend-item">
              <span class="legend-dot" :style="{ background: item.color }"></span>
              <span class="legend-name">{{ item.name }}</span>
              <strong>{{ item.value }}%</strong>
            </div>
          </div>
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
import { hrData } from '../data/mockDashboard'
import { useStaggerAnimation } from '../composables/useStaggerAnimation'

const personnelSummary = computed(() => hrData.summary.slice(0, 3))
const stagger = useStaggerAnimation(4)

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

const partyRatio = computed(() => clampPercent(hrData.partyMember.ratio))
const ringDasharray = computed(() => `${(partyRatio.value / 100) * 327}, 327`)

const talentOption = computed(() => ({
  tooltip: { trigger: 'item' },
  series: [
    {
      type: 'pie',
      radius: ['44%', '68%'],
      center: ['44%', '50%'],
      label: { formatter: '{b} {d}%' },
      data: hrData.talentStructure.map((item) => ({
        value: item.value,
        name: item.name,
        itemStyle: { color: item.color }
      }))
    }
  ]
}))
</script>

<style scoped lang="scss">
.hr-grid {
  width: 100%;
  height: 100%;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1.36fr) minmax(0, 1fr);
  grid-template-rows: repeat(3, minmax(0, 1fr));
  grid-template-areas:
    'cadre summary'
    'cadre salary'
    'cadre talent';
  gap: 14px;
}

.hr-grid--loading {
  pointer-events: none;
}

.skeleton-slot--cadre { grid-area: cadre; }
.skeleton-slot--summary { grid-area: summary; }
.skeleton-slot--salary { grid-area: salary; }
.skeleton-slot--talent { grid-area: talent; }

.cadre-panel {
  grid-area: cadre;
  min-height: 0;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  background:
    radial-gradient(110% 74% at 0% 100%, rgba(54, 241, 205, 0.08), transparent 58%),
    radial-gradient(95% 70% at 100% 0%, rgba(90, 204, 255, 0.1), transparent 58%),
    var(--bg-panel);
}

.summary-panel {
  grid-area: summary;
}

.salary-panel {
  grid-area: salary;
}

.talent-panel {
  grid-area: talent;
}

.summary-panel,
.salary-panel,
.talent-panel {
  min-height: 0;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  background:
    radial-gradient(100% 65% at 100% 100%, rgba(90, 204, 255, 0.1), transparent 62%),
    radial-gradient(90% 56% at 0% 0%, rgba(54, 241, 205, 0.07), transparent 60%),
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

.cadre-layout {
  margin-top: 10px;
  min-height: 0;
  display: grid;
  grid-template-rows: minmax(0, 0.88fr) minmax(0, 1fr);
  gap: 12px;
}

.cadre-overview,
.cadre-table-panel {
  min-height: 0;
  border-radius: 12px;
  padding: var(--space-2);
  background: var(--subscreen-card-bg);
  border: 1px solid rgba(90, 204, 255, 0.14);
}

.overview-main {
  min-height: calc(100% - 28px);
  display: grid;
  grid-template-columns: 170px minmax(0, 1fr);
  gap: 10px;
}

.party-ring-card {
  position: relative;
  border-radius: 12px;
  border: 1px solid rgba(90, 204, 255, 0.2);
  background: var(--subscreen-ring-bg);
  display: grid;
  place-items: center;
  overflow: hidden;
}

.ring-halo {
  position: absolute;
  inset: -26% -44% auto auto;
  width: 176px;
  height: 176px;
  background: radial-gradient(circle, rgba(90, 204, 255, 0.25), transparent 66%);
  pointer-events: none;
}

.party-ring {
  position: relative;
  width: 128px;
  height: 128px;

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
  font-size: 1.6rem;
  font-family: var(--font-display);
  font-weight: 700;
  color: #e9fbff;
}

.ring-label {
  font-size: var(--text-xxs);
  color: var(--text-muted);
  margin-top: 4px;
}

.overview-kpis {
  min-height: 0;
  display: grid;
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.overview-item {
  border-radius: 10px;
  background: var(--subscreen-subcard-bg);
  border: 1px solid rgba(90, 204, 255, 0.1);
  padding: var(--space-2) var(--space-3);
  display: grid;
  align-content: center;
}

.overview-label {
  font-size: var(--text-xxs);
  color: var(--text-muted);
  margin-bottom: 6px;
}

.overview-value {
  font-size: 1.15rem;
  font-family: var(--font-display);
  color: var(--text-primary);
}

.table-wrap {
  max-height: calc(100% - 28px);
  overflow: auto;
}

.summary-kpis {
  margin-top: 10px;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.summary-kpi {
  border-radius: 10px;
  padding: var(--space-2);
  background: var(--subscreen-subcard-bg);
  border: 1px solid rgba(90, 204, 255, 0.1);
  display: grid;
  align-content: center;
  justify-items: center;
  text-align: center;
}

.summary-kpi:first-child {
  grid-column: 1 / -1;
  border-color: rgba(54, 241, 205, 0.3);
  background: rgba(54, 241, 205, 0.08);
}

.summary-label {
  font-size: var(--text-xs);
  color: var(--text-muted);
  margin-bottom: 8px;
}

.summary-value {
  font-size: 1.2rem;
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--text-primary);
}

.summary-kpi:first-child .summary-value {
  font-size: 1.7rem;
  color: var(--accent-cyan);
}

.salary-grid {
  margin-top: 10px;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.salary-section {
  min-height: 0;
  border-radius: 10px;
  padding: var(--space-2);
  background: var(--subscreen-card-bg);
  border: 1px solid rgba(90, 204, 255, 0.12);
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
}

.salary-list {
  min-height: 0;
  display: grid;
  grid-template-rows: repeat(3, minmax(0, 1fr));
  gap: 6px;
}

.salary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-radius: 8px;
  background: var(--subscreen-subcard-bg);
  border: 1px solid rgba(90, 204, 255, 0.08);
  font-size: var(--text-xs);
  color: var(--text-secondary);

  strong {
    font-family: var(--font-display);
    color: var(--text-primary);
    font-size: var(--text-md);
  }
}

.talent-layout {
  margin-top: 10px;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 160px;
  gap: 8px;
}

.chart {
  min-height: 0;
  border-radius: 10px;
  padding: var(--space-1);
  background: var(--subscreen-card-bg);
  border: 1px solid rgba(90, 204, 255, 0.12);
}

.talent-legend {
  min-height: 0;
  display: grid;
  grid-template-rows: repeat(4, minmax(0, 1fr));
  gap: 6px;
}

.legend-item {
  border-radius: 8px;
  padding: 0 10px;
  background: var(--subscreen-subcard-bg);
  border: 1px solid rgba(90, 204, 255, 0.1);
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 8px;
  font-size: var(--text-xs);
  color: var(--text-secondary);

  strong {
    font-family: var(--font-display);
    color: var(--text-primary);
    font-size: var(--text-md);
  }
}

.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  box-shadow: 0 0 10px currentColor;
}

.legend-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 1350px) {
  .hr-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      'summary'
      'cadre'
      'salary'
      'talent';
    overflow-y: auto;
  }

  .cadre-layout {
    grid-template-rows: auto auto;
  }

  .overview-main {
    grid-template-columns: 1fr;
  }

  .salary-grid {
    grid-template-columns: 1fr;
  }

  .talent-layout {
    grid-template-columns: 1fr;
  }

  .talent-legend {
    grid-template-rows: auto;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
