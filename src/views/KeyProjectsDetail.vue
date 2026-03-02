<template>
  <SubScreenLayout title="重点项目" subtitle="Key Projects" meta="数据更新时间 08:30">
    <div v-if="loading" class="projects-grid projects-grid--loading">
      <SkeletonPanel class="skeleton-slot skeleton-slot--count" />
      <SkeletonPanel class="skeleton-slot skeleton-slot--status" />
    </div>

    <div v-else class="projects-grid">
      <!-- L1: 年度重点任务数量 -->
      <section class="panel count-panel panel-animate-in" :style="stagger[0]">
        <PanelHeader title="L1：年度重点任务数量" />
        <div class="count-layout">
          <article class="count-card">
            <div class="count-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </div>
            <div class="count-content">
              <div class="count-label">年度重点任务总数</div>
              <div class="count-value">{{ keyProjectsData.taskCount }}</div>
              <div class="count-foot">年度累计口径</div>
            </div>
          </article>

          <div class="count-summary">
            <div class="summary-item" v-for="item in statusSummary" :key="item.label">
              <span class="summary-dot" :style="{ background: item.color }"></span>
              <span class="summary-label">{{ item.label }}</span>
              <strong class="summary-value">{{ item.value }}</strong>
            </div>
          </div>
        </div>
      </section>

      <!-- L1: 年度重点任务完成情况 -->
      <section class="panel status-panel panel-animate-in" :style="stagger[1]">
        <PanelHeader title="L1：年度重点任务完成情况" />
        <div class="status-layout">
          <!-- 环形图 -->
          <article class="ring-card">
            <div class="ring-halo"></div>
            <div class="status-ring">
              <svg viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="12" />
                <circle
                  cx="60" cy="60" r="52" fill="none"
                  stroke="url(#statusGradCompleted)"
                  stroke-width="12"
                  :stroke-dasharray="completedArc"
                  stroke-linecap="round"
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <div class="ring-center">
                <div class="ring-value">{{ completedPercent }}%</div>
                <div class="ring-label">办结率</div>
              </div>
            </div>

            <svg style="position: absolute; width: 0; height: 0">
              <defs>
                <linearGradient id="statusGradCompleted" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#36f1cd" />
                  <stop offset="100%" stop-color="#5accff" />
                </linearGradient>
              </defs>
            </svg>
          </article>

          <!-- 4项状态卡 -->
          <div class="status-cards">
            <article v-for="item in statusItems" :key="item.label" class="status-item" :class="item.tone">
              <div class="status-item-icon" :style="{ background: item.iconBg }">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path :d="item.iconPath" />
                </svg>
              </div>
              <div class="status-item-info">
                <div class="status-item-label">L2：{{ item.label }}</div>
                <div class="status-item-value" :style="{ color: item.color }">{{ item.value }}</div>
              </div>
            </article>
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
import { keyProjectsData } from '../data/mockDashboard'
import { useStaggerAnimation } from '../composables/useStaggerAnimation'

const stagger = useStaggerAnimation(2)

const loading = ref(true)
let loadingTimer = 0
onMounted(() => {
  loadingTimer = window.setTimeout(() => { loading.value = false }, 420)
})
onUnmounted(() => window.clearTimeout(loadingTimer))

const c = keyProjectsData.completion

const completedPercent = computed(() => {
  const total = keyProjectsData.taskCount
  if (!total) return 0
  return Math.round((c.completed / total) * 100)
})

const completedArc = computed(() => {
  const ratio = completedPercent.value / 100
  return `${ratio * 327}, 327`
})

const statusItems = computed(() => [
  {
    label: '已办结数量',
    value: c.completed,
    color: 'var(--accent-lime)',
    tone: 'success',
    iconBg: 'rgba(124, 242, 154, 0.15)',
    iconPath: 'M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3'
  },
  {
    label: '进行中数量',
    value: c.inProgress,
    color: 'var(--accent-blue)',
    tone: 'info',
    iconBg: 'rgba(90, 204, 255, 0.15)',
    iconPath: 'M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83'
  },
  {
    label: '即将逾期数量',
    value: c.nearOverdue,
    color: 'var(--accent-amber)',
    tone: 'warning',
    iconBg: 'rgba(248, 197, 71, 0.15)',
    iconPath: 'M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z'
  },
  {
    label: '逾期数量',
    value: c.overdue,
    color: 'var(--accent-rose)',
    tone: 'danger',
    iconBg: 'rgba(255, 107, 107, 0.15)',
    iconPath: 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01'
  }
])

const statusSummary = computed(() => [
  { label: '已办结', value: c.completed, color: 'var(--accent-lime)' },
  { label: '进行中', value: c.inProgress, color: 'var(--accent-blue)' },
  { label: '即将逾期', value: c.nearOverdue, color: 'var(--accent-amber)' },
  { label: '逾期', value: c.overdue, color: 'var(--accent-rose)' }
])
</script>

<style scoped lang="scss">
.projects-grid {
  --kp-title-size: clamp(20px, 1.3vw, 34px);
  --kp-label-size: clamp(14px, 0.9vw, 22px);
  --kp-meta-size: clamp(13px, 0.72vw, 18px);
  --kp-value-size: clamp(24px, 1.55vw, 38px);
  --kp-big-value-size: clamp(42px, 2.6vw, 72px);
  width: 100%;
  height: 100%;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  grid-template-rows: minmax(0, 1fr);
  grid-template-areas: 'count status';
  gap: clamp(14px, 1vw, 22px);
}

.projects-grid--loading {
  pointer-events: none;
}

.skeleton-slot--count { grid-area: count; }
.skeleton-slot--status { grid-area: status; }

.count-panel {
  grid-area: count;
}

.status-panel {
  grid-area: status;
}

.count-panel,
.status-panel {
  min-height: 0;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  background:
    radial-gradient(108% 72% at 0% 100%, rgba(54, 241, 205, 0.08), transparent 58%),
    radial-gradient(92% 68% at 100% 0%, rgba(90, 204, 255, 0.1), transparent 60%),
    var(--bg-panel);
}

/* L1: 年度重点任务数量 */
.count-layout {
  margin-top: 12px;
  min-height: 0;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  gap: 14px;
}

.count-card {
  display: flex;
  align-items: center;
  gap: 22px;
  padding: clamp(18px, 1.2vw, 30px);
  border-radius: 16px;
  background: var(--subscreen-ring-bg);
  border: 1px solid rgba(90, 204, 255, 0.22);
  box-shadow: inset 0 0 24px rgba(90, 204, 255, 0.08);
}

.count-icon {
  width: 78px;
  height: 78px;
  border-radius: 16px;
  background: rgba(54, 241, 205, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-cyan);
  flex-shrink: 0;

  svg {
    width: 38px;
    height: 38px;
  }
}

.count-content {
  flex: 1;
  min-width: 0;
}

.count-label {
  font-size: var(--kp-label-size);
  color: var(--text-secondary);
  letter-spacing: 0.05em;
  font-weight: 500;
  line-height: 1.35;
}

.count-value {
  margin-top: 6px;
  font-size: var(--kp-big-value-size);
  font-family: var(--font-display);
  font-weight: 700;
  color: #e9fbff;
  text-shadow: 0 0 14px rgba(90, 204, 255, 0.3);
  line-height: 1.02;
}

.count-foot {
  margin-top: 8px;
  font-size: var(--kp-meta-size);
  color: var(--text-secondary);
  line-height: 1.35;
}

.count-summary {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  min-height: 0;
  overflow: visible;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: clamp(12px, 0.8vw, 18px) clamp(14px, 1vw, 24px);
  border-radius: 12px;
  background: var(--subscreen-subcard-bg);
  border: 1px solid rgba(90, 204, 255, 0.1);
}

.summary-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.summary-label {
  flex: 1;
  font-size: var(--kp-label-size);
  color: var(--text-primary);
  font-weight: 500;
  line-height: 1.3;
}

.summary-value {
  font-family: var(--font-display);
  font-size: var(--kp-value-size);
  color: var(--text-primary);
  line-height: 1;
}

/* L1: 年度重点任务完成情况 */
.status-layout {
  margin-top: 12px;
  min-height: 0;
  display: grid;
  grid-template-columns: 210px minmax(0, 1fr);
  gap: 14px;
}

.ring-card {
  position: relative;
  border-radius: 14px;
  border: 1px solid rgba(90, 204, 255, 0.22);
  background: var(--subscreen-ring-bg);
  display: grid;
  place-items: center;
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

.status-ring {
  position: relative;
  width: 158px;
  height: 158px;

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
  font-size: clamp(34px, 2.2vw, 52px);
  font-family: var(--font-display);
  font-weight: 700;
  color: #e9fbff;
  line-height: 1;
}

.ring-label {
  font-size: var(--kp-label-size);
  color: var(--text-muted);
  margin-top: 4px;
  line-height: 1.3;
}

.status-cards {
  min-height: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 12px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: clamp(12px, 0.8vw, 18px) clamp(14px, 1vw, 22px);
  border-radius: 12px;
  background: var(--subscreen-subcard-bg);
  border: 1px solid rgba(90, 204, 255, 0.1);
  min-height: 0;
}

.status-item.danger {
  border-color: rgba(255, 107, 107, 0.3);
  background: rgba(255, 107, 107, 0.06);
}

.status-item.warning {
  border-color: rgba(248, 197, 71, 0.25);
  background: rgba(248, 197, 71, 0.05);
}

.status-item-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 24px;
    height: 24px;
  }
}

.status-item.success .status-item-icon { color: var(--accent-lime); }
.status-item.info .status-item-icon { color: var(--accent-blue); }
.status-item.warning .status-item-icon { color: var(--accent-amber); }
.status-item.danger .status-item-icon { color: var(--accent-rose); }

.status-item-info {
  flex: 1;
  min-width: 0;
}

.status-item-label {
  font-size: var(--kp-label-size);
  color: var(--text-muted);
  margin-bottom: 6px;
  line-height: 1.3;
}

.status-item-value {
  font-size: clamp(30px, 1.9vw, 44px);
  font-family: var(--font-display);
  font-weight: 700;
  line-height: 1;
}

@media (max-width: 1280px) {
  .projects-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      'count'
      'status';
    overflow-y: auto;
  }

  .status-layout {
    grid-template-columns: 1fr;
  }

  .status-cards {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
  }

  .count-summary {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 920px) {
  .status-cards {
    grid-template-columns: 1fr;
  }
}
</style>
