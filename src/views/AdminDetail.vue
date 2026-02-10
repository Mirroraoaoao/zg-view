<template>
  <SubScreenLayout title="行政管理" subtitle="Administrative Management" meta="数据更新时间 08:30">
    <div v-if="loading" class="admin-grid admin-grid--loading">
      <SkeletonPanel class="skeleton-slot skeleton-slot--schedule" />
      <SkeletonPanel class="skeleton-slot skeleton-slot--supervision" />
      <SkeletonPanel class="skeleton-slot skeleton-slot--meeting" />
    </div>

    <div v-else class="admin-grid">
      <section class="panel schedule-panel panel-animate-in" :style="stagger[0]">
        <div class="section-head">
          <PanelHeader title="L1：领导行程" />
          <span class="section-chip">当日安排 {{ scheduleCount }} 项</span>
        </div>
        <div class="schedule-table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th scope="col">时间</th>
                <th scope="col">领导</th>
                <th scope="col">事项</th>
                <th scope="col">地点</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in adminData.schedule.list" :key="item.time">
                <td>{{ item.time }}</td>
                <td>{{ item.leader }}</td>
                <td>{{ item.agenda }}</td>
                <td>{{ item.location }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="panel supervision-panel panel-animate-in" :style="stagger[1]">
        <div class="section-head">
          <PanelHeader title="L1：督办事项完成率" />
          <span class="section-chip">执行监控</span>
        </div>
        <div class="supervision-main">
          <div class="ring-card">
            <div class="ring-halo"></div>
            <div class="supervision-ring">
              <svg viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="12" />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="url(#supervisionGrad)"
                  stroke-width="12"
                  :stroke-dasharray="ringDasharray"
                  stroke-linecap="round"
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <div class="ring-center">
                <div class="ring-value">{{ adminData.supervision.completionRate }}</div>
                <div class="ring-label">完成率</div>
              </div>
            </div>
          </div>

          <div class="supervision-info">
            <div class="info-kpi">
              <div class="info-label">当前执行状态</div>
              <div class="info-value">总体可控</div>
            </div>
            <div class="progress-box">
              <div class="progress-head">
                <span>督办事项完成进度</span>
                <strong>{{ adminData.supervision.completionRate }}</strong>
              </div>
              <div class="progress">
                <div class="progress-bar" :style="{ width: `${supervisionRatio}%` }"></div>
              </div>
            </div>
          </div>
        </div>

        <svg style="position: absolute; width: 0; height: 0">
          <defs>
            <linearGradient id="supervisionGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#36f1cd" />
              <stop offset="100%" stop-color="#5accff" />
            </linearGradient>
          </defs>
        </svg>
      </section>

      <section class="panel meeting-panel panel-animate-in" :style="stagger[2]">
        <div class="section-head">
          <PanelHeader title="L1：三会议召开次数" />
          <span class="section-chip">年度累计</span>
        </div>

        <div class="meeting-main">
          <div class="meeting-total">
            <div class="meeting-label">本年度累计</div>
            <div class="meeting-value">{{ adminData.meeting.total }}</div>
          </div>

          <div class="meeting-detail">
            <div v-for="item in meetingItems" :key="item.label" class="meeting-item">
              <div class="meeting-row">
                <span>{{ item.label }}</span>
                <strong>{{ item.value }} 次</strong>
              </div>
              <div class="mini-track">
                <span class="mini-fill" :style="{ width: meetingWidth(item.value) }"></span>
              </div>
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
import PanelHeader from '../components/PanelHeader.vue'
import SkeletonPanel from '../components/SkeletonPanel.vue'
import { adminData } from '../data/mockDashboard'
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

const supervisionRatio = computed(() => clampPercent(adminData.supervision.completionRate))
const ringDasharray = computed(() => `${(supervisionRatio.value / 100) * 327}, 327`)
const scheduleCount = computed(() => adminData.schedule.list.length)

const meetingItems = computed(() => [
  { label: '党委会', value: adminData.meeting.detail.partyCommittee },
  { label: '总经理办公会', value: adminData.meeting.detail.executiveOffice },
  { label: '专题会', value: adminData.meeting.detail.special }
])

const meetingMax = computed(() => Math.max(...meetingItems.value.map((item) => item.value), 1))
const meetingWidth = (value: number) => `${Math.max((value / meetingMax.value) * 100, 8)}%`
</script>

<style scoped lang="scss">
.admin-grid {
  width: 100%;
  height: 100%;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1.38fr) minmax(0, 1fr);
  grid-template-rows: repeat(2, minmax(0, 1fr));
  grid-template-areas:
    'schedule supervision'
    'schedule meeting';
  gap: 14px;
}

.admin-grid--loading {
  pointer-events: none;
}

.skeleton-slot--schedule { grid-area: schedule; }
.skeleton-slot--supervision { grid-area: supervision; }
.skeleton-slot--meeting { grid-area: meeting; }

.schedule-panel {
  grid-area: schedule;
}

.supervision-panel {
  grid-area: supervision;
}

.meeting-panel {
  grid-area: meeting;
}

.schedule-panel,
.supervision-panel,
.meeting-panel {
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

.schedule-table-wrap {
  margin-top: 10px;
  min-height: 0;
  max-height: 100%;
  overflow: auto;
  border-radius: 12px;
  border: 1px solid rgba(90, 204, 255, 0.14);
  background: var(--subscreen-card-bg);
  padding: clamp(4px, 0.3vw, 8px);
}

.supervision-main {
  margin-top: 10px;
  min-height: 0;
  display: grid;
  grid-template-columns: 170px minmax(0, 1fr);
  gap: 10px;
}

.ring-card {
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

.supervision-ring {
  position: relative;
  width: 130px;
  height: 130px;

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

.supervision-info {
  min-height: 0;
  display: grid;
  grid-template-rows: minmax(0, 1fr) minmax(0, 1fr);
  gap: 8px;
}

.info-kpi,
.progress-box {
  border-radius: 10px;
  background: var(--subscreen-subcard-bg);
  border: 1px solid rgba(90, 204, 255, 0.1);
  padding: var(--space-2) var(--space-3);
  display: grid;
  align-content: center;
}

.info-label {
  font-size: var(--text-xxs);
  color: var(--text-muted);
  margin-bottom: 6px;
}

.info-value {
  font-family: var(--font-display);
  font-size: 1.2rem;
  color: var(--text-primary);
}

.progress-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: var(--text-xs);
  color: var(--text-secondary);

  strong {
    font-family: var(--font-display);
    color: var(--text-primary);
  }
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
  box-shadow: 0 0 12px rgba(54, 241, 205, 0.26);
}

.meeting-main {
  margin-top: 10px;
  min-height: 0;
  display: grid;
  grid-template-columns: 1fr minmax(0, 1.1fr);
  gap: 8px;
}

.meeting-total {
  border-radius: 12px;
  padding: var(--space-2);
  background: linear-gradient(135deg, rgba(90, 204, 255, 0.2), rgba(90, 204, 255, 0.08));
  border: 1px solid rgba(90, 204, 255, 0.26);
  display: grid;
  align-content: center;
  justify-items: center;
  text-align: center;
}

.meeting-label {
  font-size: var(--text-xs);
  color: var(--text-muted);
  margin-bottom: 8px;
}

.meeting-value {
  font-size: 1.9rem;
  font-family: var(--font-display);
  font-weight: 700;
  color: #e9fbff;
}

.meeting-detail {
  min-height: 0;
  display: grid;
  grid-template-rows: repeat(3, minmax(0, 1fr));
  gap: 6px;
}

.meeting-item {
  border-radius: 9px;
  padding: var(--space-1) var(--space-2);
  background: var(--subscreen-subcard-bg);
  border: 1px solid rgba(90, 204, 255, 0.1);
  display: grid;
  align-content: center;
}

.meeting-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  font-size: var(--text-xs);
  color: var(--text-secondary);

  strong {
    font-family: var(--font-display);
    color: var(--text-primary);
    font-size: var(--text-md);
  }
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
}

@media (max-width: 1300px) {
  .admin-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      'schedule'
      'supervision'
      'meeting';
    overflow-y: auto;
  }

  .supervision-main {
    grid-template-columns: 1fr;
  }

  .meeting-main {
    grid-template-columns: 1fr;
  }
}
</style>
