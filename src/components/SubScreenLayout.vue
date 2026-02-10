<template>
  <div ref="screenRef" class="screen">
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

    <nav class="screen-nav" aria-label="模块导航">
      <button
        v-for="(item, index) in navItems"
        :key="item.name"
        :ref="el => setNavRef(index, el)"
        class="nav-item"
        :class="{ active: route.name === item.name }"
        type="button"
        :aria-current="route.name === item.name ? 'page' : undefined"
        :tabindex="route.name === item.name ? 0 : -1"
        @click="router.push({ name: item.name })"
        @keydown.right.prevent="focusNav(index, 1)"
        @keydown.left.prevent="focusNav(index, -1)"
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

withDefaults(defineProps<{ title: string; subtitle?: string; meta?: string }>(), {
  meta: '今日 08:30'
})

const router = useRouter()
const route = useRoute()
const screenRef = ref<HTMLElement | null>(null)

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

const navRefs: Record<number, HTMLButtonElement | null> = {}
const setNavRef = (index: number, el: any) => {
  navRefs[index] = el as HTMLButtonElement | null
}

const focusNav = (currentIndex: number, direction: number) => {
  const nextIndex = (currentIndex + direction + navItems.length) % navItems.length
  const nextEl = navRefs[nextIndex]
  if (nextEl) {
    nextEl.focus()
    router.push({ name: navItems[nextIndex].name })
  }
}

onMounted(async () => {
  await nextTick()
  if (screenRef.value) {
    // 强制触发重排以确保 flex 布局正确计算
    void screenRef.value.offsetHeight
  }
})

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
  padding: var(--space-3) var(--space-4) var(--space-4);
  gap: var(--space-2);
  position: relative;
  overflow: hidden;
}

.screen-header {
  display: grid;
  grid-template-columns: 1fr 1.4fr 1fr;
  align-items: center;
  padding: var(--space-2) var(--space-3);
  position: relative;
  z-index: 10;
  overflow: visible;
  flex-shrink: 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  cursor: pointer;
  color: var(--accent-cyan);
  font-family: var(--font-display);
  letter-spacing: 0.14em;
  font-size: var(--text-xs);
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
  font-size: var(--text-2xl);
  font-family: var(--font-display);
  letter-spacing: 0.22em;
  color: var(--text-primary);
  line-height: 1.15;
}

.title-en {
  margin-top: 4px;
  font-size: var(--text-xxs);
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: var(--text-muted);
  line-height: 1.4;
}

.header-meta {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-2);
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
  font-size: var(--text-xs);
  color: var(--text-primary);
  letter-spacing: 0.02em;
}

.header-right {
  display: flex;
  align-items: center;
  gap: var(--space-2);
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
  gap: var(--space-1);
  flex-wrap: wrap;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  z-index: 10;
}

.nav-item {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-2);
  border-radius: 999px;
  border: 1px solid var(--nav-border);
  background: var(--nav-bg);
  color: var(--text-secondary);
  font-size: var(--text-xs);
  letter-spacing: 0.1em;
  transition:
    var(--transition-color),
    var(--transition-border),
    var(--transition-shadow);
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
  font-size: var(--text-xxs);
  padding: clamp(3px, 0.25vw, 6px) var(--space-1);
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
    gap: var(--space-2);
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
