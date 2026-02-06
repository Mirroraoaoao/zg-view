<template>
  <div ref="screenRef" class="screen">
    <ParticlesBackground :particleCount="70" :connectionDistance="140" />

    <header class="screen-header panel">
      <div class="header-left" role="button" tabindex="0" @click="goHome" @keydown.enter="goHome" @keydown.space.prevent="goHome">
        <span class="back-icon">◀</span>
        <span class="back-text">返回入口</span>
      </div>

      <div class="header-title">
        <div class="title-cn">{{ title }}</div>
        <div v-if="subtitle" class="title-en">{{ subtitle }}</div>
      </div>

      <div class="header-right">
        <div class="header-meta">
          <span class="meta-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </span>
          <span class="meta-value">{{ meta }}</span>
        </div>
      </div>
    </header>

    <main class="screen-body">
      <slot></slot>
    </main>

    <nav class="screen-nav">
      <button
        v-for="item in navItems"
        :key="item.name"
        class="nav-item"
        :class="{ active: route.name === item.name }"
        type="button"
        @click="router.push({ name: item.name })"
      >
        <span class="nav-icon">{{ item.icon }}</span>
        <span class="nav-label">{{ item.label }}</span>
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ParticlesBackground from '../components/ParticlesBackground.vue'

withDefaults(defineProps<{ title: string; subtitle?: string; meta?: string }>(), {
  meta: '今日 08:30'
})

const router = useRouter()
const route = useRoute()
const screenRef = ref<HTMLElement | null>(null)

onMounted(async () => {
  await nextTick()
  if (screenRef.value) {
    // 强制触发重排以确保 flex 布局正确计算
    void screenRef.value.offsetHeight
  }
})

const navItems = [
  { name: 'overall', label: '经营数据', icon: '核心' },
  { name: 'finance', label: '财务管理', icon: '财务' },
  { name: 'treasury', label: '资金分析', icon: '资金' },
  { name: 'investment', label: '投资运营', icon: '投资' },
  { name: 'projects', label: '重点项目', icon: '项目' },
  { name: 'asset', label: '资产管理', icon: '资产' },
  { name: 'operation', label: '业务数据', icon: '业务' },
  { name: 'hr', label: '人力资源', icon: '人力' },
  { name: 'admin', label: '行政管理', icon: '行政' }
]

const goHome = () => {
  router.push({ name: 'portal' })
}
</script>

<style scoped lang="scss">
.screen {
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  padding: var(--screen-space-3) var(--screen-space-4) var(--screen-space-4);
  gap: var(--screen-space-2);
  position: relative;
  overflow: hidden;

  --screen-space-1: clamp(8px, 0.6vw, 16px);
  --screen-space-2: clamp(12px, 0.9vw, 22px);
  --screen-space-3: clamp(16px, 1.1vw, 28px);
  --screen-space-4: clamp(20px, 1.3vw, 34px);

  --screen-text-xs: clamp(11px, 0.55vw, 16px);
  --screen-text-sm: clamp(12px, 0.7vw, 18px);
  --screen-text-md: clamp(14px, 0.8vw, 22px);
  --screen-text-lg: clamp(18px, 1vw, 26px);
  --screen-text-xl: clamp(22px, 1.2vw, 32px);

  --panel-padding: clamp(14px, 0.95vw, 24px);
  --panel-radius: clamp(14px, 1vw, 20px);
  --panel-title-size: var(--screen-text-sm);
  --panel-title-gap: clamp(10px, 0.8vw, 18px);
  --panel-title-spacing: 0.14em;
  --panel-subtitle-size: var(--screen-text-xs);
  --panel-chart-gap: clamp(6px, 0.6vw, 12px);
  --panel-table-gap: clamp(6px, 0.6vw, 12px);

  --kpi-padding: var(--screen-space-2);
  --kpi-gap: var(--screen-space-2);
  --kpi-radius: clamp(10px, 0.8vw, 16px);
  --kpi-min-width: clamp(150px, 10vw, 220px);
  --kpi-label-size: var(--screen-text-xs);
  --kpi-value-size: var(--screen-text-lg);
  --kpi-value-gap: var(--screen-space-1);

  --chip-padding-y: clamp(4px, 0.3vw, 8px);
  --chip-padding-x: clamp(10px, 0.6vw, 16px);
  --chip-font-size: var(--screen-text-xs);

  --progress-height: clamp(6px, 0.5vw, 10px);
  --table-font-size: var(--screen-text-sm);
  --table-head-size: var(--screen-text-xs);
  --table-head-spacing: 0.12em;
  --table-row-padding-y: clamp(8px, 0.6vw, 12px);
  --table-row-padding-x: clamp(10px, 0.7vw, 14px);
}

.screen-header {
  display: grid;
  grid-template-columns: 1fr 1.4fr 1fr;
  align-items: center;
  padding: 12px 18px;
  position: relative;
  z-index: 10;
  overflow: visible;
  flex-shrink: 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: var(--accent-cyan);
  font-family: var(--font-display);
  letter-spacing: 0.14em;
  font-size: 0.85rem;
}

.back-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--icon-border);
  box-shadow: var(--icon-shadow);
}

.header-title {
  text-align: center;
}

.title-cn {
  font-size: 1.6rem;
  font-family: var(--font-display);
  letter-spacing: 0.22em;
  color: var(--text-primary);
  line-height: 1.15;
}

.title-en {
  margin-top: 4px;
  font-size: 0.75rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: var(--text-muted);
  line-height: 1.4;
}

.header-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 8px;
  background: var(--chip-bg);
  border: 1px solid var(--chip-border);
}

.meta-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-cyan);
  opacity: 0.7;
}

.meta-value {
  font-family: var(--font-display);
  font-size: 0.85rem;
  color: var(--text-primary);
  letter-spacing: 0.02em;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: flex-end;
}

.header-divider {
  width: 1px;
  height: 24px;
  background: linear-gradient(180deg, transparent, var(--divider-color), transparent);
}

.screen-body {
  flex: 1;
  display: flex;
  min-height: 0;
  overflow: hidden;
}

.screen-body > * {
  flex: 1;
  min-width: 0;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
}

.screen-nav {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  z-index: 10;
}

.nav-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid var(--nav-border);
  background: var(--nav-bg);
  color: var(--text-secondary);
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  transition: all 0.2s ease;
  cursor: pointer;
  font-family: var(--font-display);
}

.nav-item:hover {
  color: var(--text-primary);
  border-color: var(--nav-hover-border);
  box-shadow: var(--nav-hover-shadow);
}

.nav-item.active {
  background: var(--nav-active-bg);
  border-color: var(--nav-active-border);
  color: var(--text-primary);
}

.nav-icon {
  font-size: 0.65rem;
  padding: 3px 8px;
  border-radius: 999px;
  background: var(--nav-active-bg);
  color: var(--accent-cyan);
}

@media (max-width: 1400px) {
  .screen-nav {
    flex-wrap: nowrap;
    overflow-x: auto;
    justify-content: flex-start;
    padding-bottom: 4px;
  }
}

@media (max-width: 1200px) {
  .screen-header {
    grid-template-columns: 1fr;
    gap: 10px;
    text-align: left;
  }

  .header-title {
    text-align: left;
  }

  .header-right {
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .header-divider {
    display: none;
  }
}
</style>
