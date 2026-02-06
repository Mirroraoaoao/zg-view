<template>
  <SubScreenLayout title="重点项目" subtitle="Key Projects" meta="数据更新时间 08:30">
    <div class="projects-grid">
      <section class="panel system-status">
        <h3 class="panel-title">L1：集团年度重点项目清单 / L2：对接经营调度系统（待明细）</h3>
        <div class="status-layout">
          <article class="status-card">
            <div class="status-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
              </svg>
            </div>
            <div class="status-content">
              <div class="status-label">{{ keyProjectsData.systemStatus.label }}</div>
              <div class="status-value">{{ keyProjectsData.systemStatus.value }}</div>
              <div class="status-note">{{ keyProjectsData.systemStatus.note }}</div>
            </div>
          </article>

          <article class="status-meta">
            <div class="meta-row">
              <span>当前状态</span>
              <strong>{{ keyProjectsData.systemStatus.value }}</strong>
            </div>
            <div class="meta-row">
              <span>指标口径</span>
              <strong>系统对接</strong>
            </div>
            <div class="meta-row">
              <span>展示字段</span>
              <strong>{{ keyProjectsData.systemStatus.label }}</strong>
            </div>
          </article>
        </div>
      </section>

      <section class="panel completion-rate">
        <h3 class="panel-title">L1：重点项目完成率</h3>
        <div class="completion-main">
          <article class="completion-ring-card">
            <div class="completion-ring">
              <svg viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="12" />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="url(#completionGrad)"
                  stroke-width="12"
                  :stroke-dasharray="`${keyProjectsData.completionRate.value * 3.27}, 327`"
                  stroke-linecap="round"
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <div class="ring-center">
                <div class="ring-value">{{ keyProjectsData.completionRate.value }}%</div>
                <div class="ring-label">完成率</div>
              </div>
            </div>
          </article>

          <article class="completion-board">
            <div class="info-item">
              <span class="info-label">{{ keyProjectsData.completionRate.label }}</span>
              <span class="info-value">{{ keyProjectsData.completionRate.value }}%</span>
            </div>

            <div class="progress-board">
              <div class="progress-head">
                <span>推进刻度</span>
                <strong>{{ keyProjectsData.completionRate.value }}%</strong>
              </div>
              <div class="progress-track">
                <span class="progress-fill" :style="{ width: completionPercent }"></span>
              </div>
              <div class="progress-scale">
                <span v-for="tick in [0, 25, 50, 75, 100]" :key="tick">{{ tick }}</span>
              </div>
            </div>
          </article>
        </div>

        <svg style="position: absolute; width: 0; height: 0">
          <defs>
            <linearGradient id="completionGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#36f1cd" />
              <stop offset="100%" stop-color="#5accff" />
            </linearGradient>
          </defs>
        </svg>
      </section>
    </div>
  </SubScreenLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SubScreenLayout from '../components/SubScreenLayout.vue'
import { keyProjectsData } from '../data/mockDashboard'

const completionPercent = computed(() => {
  const value = keyProjectsData.completionRate.value
  const safeValue = Math.max(0, Math.min(100, value))
  return `${safeValue}%`
})
</script>

<style scoped lang="scss">
.projects-grid {
  width: 100%;
  height: 100%;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1.02fr) minmax(0, 0.98fr);
  grid-template-rows: minmax(0, 1fr);
  gap: 14px;
}

.system-status,
.completion-rate {
  min-height: 0;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
}

.system-status {
  background:
    radial-gradient(108% 72% at 0% 100%, rgba(248, 197, 71, 0.08), transparent 56%),
    radial-gradient(92% 66% at 100% 0%, rgba(90, 204, 255, 0.08), transparent 60%),
    var(--bg-panel);
}

.completion-rate {
  background:
    radial-gradient(100% 72% at 100% 100%, rgba(90, 204, 255, 0.1), transparent 62%),
    radial-gradient(92% 66% at 0% 0%, rgba(54, 241, 205, 0.07), transparent 58%),
    var(--bg-panel);
}

.panel-title {
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.status-layout {
  margin-top: 10px;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
  gap: 12px;
}

.status-card {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 20px;
  border-radius: 16px;
  background: var(--subscreen-ring-bg);
  border: 1px solid rgba(90, 204, 255, 0.22);
  box-shadow: inset 0 0 24px rgba(90, 204, 255, 0.08);
}

.status-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: rgba(248, 197, 71, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-amber);
  flex-shrink: 0;

  svg {
    width: 32px;
    height: 32px;
  }
}

.status-content {
  flex: 1;
  min-width: 0;
}

.status-label {
  font-size: 0.68rem;
  color: var(--text-muted);
  letter-spacing: 0.08em;
  line-height: 1.35;
}

.status-value {
  margin-top: 8px;
  font-size: 1.52rem;
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--text-primary);
  text-shadow: 0 0 12px rgba(248, 197, 71, 0.25);
}

.status-note {
  margin-top: 10px;
  font-size: 0.64rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.status-meta {
  border-radius: 12px;
  padding: 10px 12px;
  background: var(--subscreen-subcard-bg);
  border: 1px solid rgba(90, 204, 255, 0.12);
  display: grid;
  align-content: center;
  gap: 8px;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 2px;
  border-bottom: 1px solid rgba(90, 204, 255, 0.1);
  font-size: 0.64rem;
  color: var(--text-secondary);

  &:last-child {
    border-bottom: none;
  }

  strong {
    font-family: var(--font-display);
    font-size: 0.74rem;
    color: var(--text-primary);
    margin-left: 10px;
    text-align: right;
    line-height: 1.3;
  }
}

.completion-main {
  margin-top: 10px;
  min-height: 0;
  display: grid;
  grid-template-columns: 170px minmax(0, 1fr);
  gap: 12px;
}

.completion-ring-card {
  border-radius: 14px;
  background: var(--subscreen-ring-bg);
  border: 1px solid rgba(90, 204, 255, 0.2);
  box-shadow: inset 0 0 20px rgba(90, 204, 255, 0.08);
  display: grid;
  place-items: center;
  padding: 12px;
}

.completion-ring {
  position: relative;
  width: 140px;
  height: 140px;

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
  font-size: 1.8rem;
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--text-primary);
}

.ring-label {
  font-size: 0.68rem;
  color: var(--text-muted);
  margin-top: 4px;
}

.completion-board {
  min-height: 0;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  gap: 10px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  border-radius: 12px;
  background: var(--subscreen-subcard-bg);
  border: 1px solid rgba(90, 204, 255, 0.12);
}

.info-label {
  font-size: 0.68rem;
  color: var(--text-secondary);
}

.info-value {
  font-size: 0.94rem;
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--text-primary);
}

.progress-board {
  border-radius: 12px;
  padding: 12px 14px;
  background: var(--subscreen-subcard-bg);
  border: 1px solid rgba(90, 204, 255, 0.12);
  display: grid;
  align-content: center;
}

.progress-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 0.64rem;
  color: var(--text-secondary);

  strong {
    font-family: var(--font-display);
    color: var(--text-primary);
    font-size: 0.86rem;
  }
}

.progress-track {
  width: 100%;
  height: 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.09);
  overflow: hidden;
}

.progress-fill {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #36f1cd, #5accff);
  box-shadow: 0 0 10px rgba(90, 204, 255, 0.24);
}

.progress-scale {
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  font-size: 0.56rem;
  color: var(--text-muted);
}

@media (max-width: 1280px) {
  .projects-grid {
    grid-template-columns: 1fr;
    grid-template-rows: minmax(0, 1fr) minmax(0, 1fr);
    overflow-y: auto;
  }

  .status-layout {
    grid-template-columns: 1fr;
  }

  .completion-main {
    grid-template-columns: 1fr;
  }

  .completion-ring-card {
    min-height: 180px;
  }
}
</style>
