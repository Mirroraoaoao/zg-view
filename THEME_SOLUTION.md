# 多主题切换方案

## 概述

本方案为「集团数据驾驶舱」项目提供完整的多主题切换解决方案，支持深色/浅色模式切换，以及多种主题风格选择。

### 需求定义

| 项目 | 说明 |
|------|------|
| **使用场景** | 用户个人偏好，每个用户可选择喜欢的主题风格 |
| **入口位置** | 顶部导航栏 (SubScreenLayout header 区域) |
| **自定义主题** | 不需要，使用预设的 4 套主题 |
| **持久化方式** | 仅 localStorage，无需后端同步 |

---

## 设计原则

### 无障碍要求 (来自 UI/UX Pro Max)

| 要求 | 标准 | 说明 |
|------|------|------|
| 文本对比度 | 最低 4.5:1 | 普通文本与背景的对比度 |
| 大文本对比度 | 最低 3:1 | 18px+ 粗体或 24px+ 普通文本 |
| 动画偏好 | `prefers-reduced-motion` | 尊重用户的减少动画设置 |
| 主题偏好 | `prefers-color-scheme` | 检测系统深色/浅色模式 |

### 动画规范

- 主题切换过渡时间: 200-300ms
- 使用 `transition-colors` 而非 `transition-all`
- 减少动画模式下跳过过渡效果

---

## 主题配色方案

### 主题 1: 深空 (Dark Space) - 当前主题

适用场景: 指挥中心、大屏展示、夜间使用

```scss
// 背景色系
--bg-main: #070d16;
--bg-panel: rgba(12, 22, 36, 0.86);
--bg-panel-strong: rgba(14, 28, 46, 0.96);

// 边框
--panel-border: rgba(90, 204, 255, 0.26);

// 文本色系
--text-primary: #e6f1ff;
--text-secondary: #c3d4ea;
--text-muted: #93a6c2;

// 强调色
--accent-cyan: #36f1cd;
--accent-blue: #5accff;
--accent-amber: #f8c547;
--accent-rose: #ff6b6b;
--accent-lime: #7cf29a;
```

### 主题 2: 浅色专业 (Light Professional)

适用场景: 办公室环境、日间使用、打印输出

```scss
// 背景色系
--bg-main: #F8FAFC;
--bg-panel: rgba(255, 255, 255, 0.92);
--bg-panel-strong: rgba(255, 255, 255, 0.98);

// 边框
--panel-border: #E2E8F0;

// 文本色系
--text-primary: #1E293B;
--text-secondary: #475569;
--text-muted: #64748B;

// 强调色 (调整饱和度以适应浅色背景)
--accent-cyan: #0D9488;
--accent-blue: #2563EB;
--accent-amber: #D97706;
--accent-rose: #DC2626;
--accent-lime: #16A34A;
```

### 主题 3: 金融科技 (Fintech Dark)

适用场景: 金融数据展示、投资分析

```scss
// 背景色系
--bg-main: #0F172A;
--bg-panel: rgba(15, 23, 42, 0.92);
--bg-panel-strong: rgba(30, 41, 59, 0.96);

// 边框
--panel-border: #334155;

// 文本色系
--text-primary: #F8FAFC;
--text-secondary: #CBD5E1;
--text-muted: #94A3B8;

// 强调色
--accent-cyan: #22D3EE;
--accent-blue: #3B82F6;
--accent-amber: #F59E0B;
--accent-rose: #EF4444;
--accent-lime: #22C55E;
```

### 主题 4: 高对比度 (High Contrast)

适用场景: 无障碍需求、视力辅助

```scss
// 背景色系
--bg-main: #000000;
--bg-panel: #1a1a1a;
--bg-panel-strong: #262626;

// 边框
--panel-border: #ffffff;

// 文本色系
--text-primary: #ffffff;
--text-secondary: #e5e5e5;
--text-muted: #a3a3a3;

// 强调色 (高饱和度)
--accent-cyan: #00ffff;
--accent-blue: #00bfff;
--accent-amber: #ffbf00;
--accent-rose: #ff4444;
--accent-lime: #00ff7f;
```

---

## 关键技术难点与解决方案

### 难点 1: ECharts 图表主题同步

**问题**: ECharts 图表初始化时使用固定颜色，CSS 变量变化后图表不会自动更新。

**解决方案**: 监听主题变化，触发图表重新渲染。

**文件: `src/components/BaseChart.vue` 修改**

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import * as echarts from 'echarts'
import { applyChartTheme } from '../utils/chartTheme'
import { useThemeStore } from '@/stores/theme'

const props = defineProps<{ options: any }>()

const chartRef = ref<HTMLElement | null>(null)
const themeStore = useThemeStore()
let chart: echarts.ECharts | null = null

// 监听主题变化，重新渲染图表
watch(() => themeStore.themeName, () => {
  nextTick(() => {
    if (chart) {
      // 重新应用主题后的配置
      chart.setOption(applyChartTheme(props.options), true)
    }
  })
})

// ... 其余代码保持不变
</script>
```

### 难点 2: 粒子背景主题适配

**问题**: Canvas 粒子使用硬编码颜色，需要重新创建才能更新。

**解决方案**: 从 CSS 变量读取颜色，监听主题变化时重绘。

**文件: `src/components/ParticlesBackground.vue` 修改**

```vue
<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

// 从 CSS 变量获取颜色
const getThemeColors = () => {
  const style = getComputedStyle(document.documentElement)
  return {
    particles: style.getPropertyValue('--particles-color').trim() || '90, 204, 255',
    bgStart: style.getPropertyValue('--particles-bg-start').trim() || '#0a0f1a',
    bgEnd: style.getPropertyValue('--particles-bg-end').trim() || '#0b1626'
  }
}

// 监听主题变化，重新初始化粒子
watch(() => themeStore.themeName, () => {
  // 重新获取颜色并渲染
  initParticles()
})

// ... 将原来硬编码的颜色替换为 getThemeColors() 返回值
</script>
```

### 难点 3: 浅色模式下的面板样式

**问题**: 当前面板使用半透明背景 (`rgba(12, 22, 36, 0.86)`)，在浅色背景下效果不佳。

**解决方案**: 浅色模式使用不同的面板样式。

```scss
.theme-light-professional {
  // 面板使用白色半透明 + 轻微阴影
  --bg-panel: rgba(255, 255, 255, 0.92);
  --bg-panel-strong: rgba(255, 255, 255, 0.98);
  --shadow-soft: 0 4px 24px rgba(0, 0, 0, 0.06);

  // 边框更明显
  --panel-border: #E2E8F0;
}
```

### 难点 4: 主题切换时的闪烁问题

**问题**: 页面加载时可能先显示默认主题再切换到用户主题，造成闪烁。

**解决方案**: 在 `<head>` 中内联脚本提前设置主题类。

**文件: `index.html` 修改**

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <script>
      // 防止主题闪烁：在 DOM 解析前应用主题
      (function() {
        const theme = localStorage.getItem('theme') || 'dark-space';
        document.documentElement.classList.add('theme-' + theme);
      })();
    </script>
    <!-- ... -->
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

---

## 技术实现方案

### 1. 创建主题 Store (Pinia)

**文件: `src/stores/theme.ts`**

```typescript
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export type ThemeName = 'dark-space' | 'light-professional' | 'fintech-dark' | 'high-contrast'
export type ColorScheme = 'dark' | 'light'

export const useThemeStore = defineStore('theme', () => {
  // 主题名称
  const themeName = ref<ThemeName>('dark-space')

  // 色彩模式 (自动从主题推断)
  const colorScheme = ref<ColorScheme>('dark')

  // 是否跟随系统
  const followSystem = ref(true)

  // 主题定义
  const themes: Record<ThemeName, { scheme: ColorScheme; label: string }> = {
    'dark-space': { scheme: 'dark', label: '深空模式' },
    'light-professional': { scheme: 'light', label: '浅色专业' },
    'fintech-dark': { scheme: 'dark', label: '金融科技' },
    'high-contrast': { scheme: 'dark', label: '高对比度' }
  }

  // 切换主题
  const setTheme = (name: ThemeName) => {
    themeName.value = name
    colorScheme.value = themes[name].scheme
    applyTheme(name)
    localStorage.setItem('theme', name)
  }

  // 应用主题到 DOM
  const applyTheme = (name: ThemeName) => {
    const root = document.documentElement

    // 移除所有主题类
    Object.keys(themes).forEach(t => root.classList.remove(`theme-${t}`))

    // 添加当前主题类
    root.classList.add(`theme-${name}`)

    // 设置 color-scheme 属性
    root.style.colorScheme = themes[name].scheme
  }

  // 监听系统主题变化
  const initSystemThemeListener = () => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (followSystem.value) {
        const systemTheme = e.matches ? 'dark-space' : 'light-professional'
        setTheme(systemTheme)
      }
    }

    mediaQuery.addEventListener('change', handleChange)

    // 初始化
    const savedTheme = localStorage.getItem('theme') as ThemeName | null
    if (savedTheme && themes[savedTheme]) {
      followSystem.value = false
      setTheme(savedTheme)
    } else {
      handleChange(mediaQuery)
    }
  }

  return {
    themeName,
    colorScheme,
    followSystem,
    themes,
    setTheme,
    initSystemThemeListener
  }
})
```

### 2. 更新全局样式

**文件: `src/assets/styles/themes.scss`**

```scss
// 主题变量定义
:root,
.theme-dark-space {
  --bg-main: #070d16;
  --bg-panel: rgba(12, 22, 36, 0.86);
  --bg-panel-strong: rgba(14, 28, 46, 0.96);
  --panel-border: rgba(90, 204, 255, 0.26);

  --text-primary: #e6f1ff;
  --text-secondary: #c3d4ea;
  --text-muted: #93a6c2;
  --text-strong: #f4f8ff;

  --accent-cyan: #36f1cd;
  --accent-blue: #5accff;
  --accent-amber: #f8c547;
  --accent-rose: #ff6b6b;
  --accent-lime: #7cf29a;

  --shadow-soft: 0 18px 45px rgba(5, 12, 20, 0.55);
  --focus-ring: 0 0 0 2px rgba(90, 204, 255, 0.55);
  --table-head-bg: rgba(90, 204, 255, 0.12);
  --table-row-hover: rgba(90, 204, 255, 0.14);

  // 粒子背景色
  --particles-color: 90, 204, 255;
  --particles-bg-start: #0a0f1a;
  --particles-bg-end: #0b1626;
}

.theme-light-professional {
  --bg-main: #F8FAFC;
  --bg-panel: rgba(255, 255, 255, 0.92);
  --bg-panel-strong: rgba(255, 255, 255, 0.98);
  --panel-border: #E2E8F0;

  --text-primary: #1E293B;
  --text-secondary: #475569;
  --text-muted: #64748B;
  --text-strong: #0F172A;

  --accent-cyan: #0D9488;
  --accent-blue: #2563EB;
  --accent-amber: #D97706;
  --accent-rose: #DC2626;
  --accent-lime: #16A34A;

  --shadow-soft: 0 18px 45px rgba(0, 0, 0, 0.08);
  --focus-ring: 0 0 0 2px rgba(37, 99, 235, 0.4);
  --table-head-bg: rgba(37, 99, 235, 0.08);
  --table-row-hover: rgba(37, 99, 235, 0.06);

  --particles-color: 37, 99, 235;
  --particles-bg-start: #F1F5F9;
  --particles-bg-end: #E2E8F0;
}

.theme-fintech-dark {
  --bg-main: #0F172A;
  --bg-panel: rgba(15, 23, 42, 0.92);
  --bg-panel-strong: rgba(30, 41, 59, 0.96);
  --panel-border: #334155;

  --text-primary: #F8FAFC;
  --text-secondary: #CBD5E1;
  --text-muted: #94A3B8;
  --text-strong: #FFFFFF;

  --accent-cyan: #22D3EE;
  --accent-blue: #3B82F6;
  --accent-amber: #F59E0B;
  --accent-rose: #EF4444;
  --accent-lime: #22C55E;

  --shadow-soft: 0 18px 45px rgba(0, 0, 0, 0.4);
  --focus-ring: 0 0 0 2px rgba(59, 130, 246, 0.5);
  --table-head-bg: rgba(59, 130, 246, 0.12);
  --table-row-hover: rgba(59, 130, 246, 0.1);

  --particles-color: 59, 130, 246;
  --particles-bg-start: #0F172A;
  --particles-bg-end: #1E293B;
}

.theme-high-contrast {
  --bg-main: #000000;
  --bg-panel: #1a1a1a;
  --bg-panel-strong: #262626;
  --panel-border: #ffffff;

  --text-primary: #ffffff;
  --text-secondary: #e5e5e5;
  --text-muted: #a3a3a3;
  --text-strong: #ffffff;

  --accent-cyan: #00ffff;
  --accent-blue: #00bfff;
  --accent-amber: #ffbf00;
  --accent-rose: #ff4444;
  --accent-lime: #00ff7f;

  --shadow-soft: 0 0 0 1px #ffffff;
  --focus-ring: 0 0 0 3px #ffffff;
  --table-head-bg: rgba(255, 255, 255, 0.15);
  --table-row-hover: rgba(255, 255, 255, 0.1);

  --particles-color: 255, 255, 255;
  --particles-bg-start: #000000;
  --particles-bg-end: #0a0a0a;
}

// 主题切换过渡
html {
  &:not(.no-transitions) {
    transition:
      background-color 0.25s ease,
      color 0.25s ease;
  }
}

// 减少动画模式
@media (prefers-reduced-motion: reduce) {
  html {
    transition: none !important;
  }
}
```

### 3. 创建主题切换组件

**文件: `src/components/ThemeSwitcher.vue`**

入口位置：顶部导航栏右侧（header-meta 区域旁边）

```vue
<template>
  <div class="theme-switcher" ref="switcherRef">
    <button
      class="theme-trigger"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      @click="toggleOpen"
    >
      <span class="trigger-icon" :class="`icon-${themeStore.themeName}`"></span>
      <span class="trigger-label">{{ currentThemeLabel }}</span>
      <span class="trigger-arrow">▼</span>
    </button>

    <Transition name="dropdown">
      <div v-if="isOpen" class="theme-dropdown" role="listbox">
        <button
          v-for="(config, name) in themeStore.themes"
          :key="name"
          class="theme-option"
          :class="{ active: themeStore.themeName === name }"
          role="option"
          :aria-selected="themeStore.themeName === name"
          @click="selectTheme(name)"
        >
          <span class="option-icon" :class="`icon-${name}`"></span>
          <span class="option-label">{{ config.label }}</span>
          <span v-if="themeStore.themeName === name" class="option-check">✓</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useThemeStore, type ThemeName } from '@/stores/theme'

const themeStore = useThemeStore()
const switcherRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)

const currentThemeLabel = computed(() => {
  return themeStore.themes[themeStore.themeName]?.label || '主题'
})

const toggleOpen = () => {
  isOpen.value = !isOpen.value
}

const selectTheme = (name: ThemeName) => {
  themeStore.setTheme(name)
  isOpen.value = false
}

// 点击外部关闭下拉菜单
const handleClickOutside = (e: MouseEvent) => {
  if (switcherRef.value && !switcherRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped lang="scss">
.theme-switcher {
  position: relative;
}

.theme-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border: 1px solid var(--panel-border);
  border-radius: 8px;
  background: var(--bg-panel);
  color: var(--text-secondary);
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--accent-cyan);
    color: var(--text-primary);
  }
}

.trigger-icon,
.option-icon {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  flex-shrink: 0;

  &.icon-dark-space {
    background: linear-gradient(135deg, #070d16, #5accff);
  }

  &.icon-light-professional {
    background: linear-gradient(135deg, #F8FAFC, #2563EB);
  }

  &.icon-fintech-dark {
    background: linear-gradient(135deg, #0F172A, #F59E0B);
  }

  &.icon-high-contrast {
    background: linear-gradient(135deg, #000000, #ffffff);
  }
}

.trigger-arrow {
  font-size: 0.6rem;
  opacity: 0.6;
  transition: transform 0.2s ease;
}

.theme-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 160px;
  padding: 6px;
  background: var(--bg-panel-strong);
  border: 1px solid var(--panel-border);
  border-radius: 10px;
  box-shadow: var(--shadow-soft);
  z-index: 100;
}

.theme-option {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--text-secondary);
  font-size: 0.8rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: var(--table-row-hover);
    color: var(--text-primary);
  }

  &.active {
    background: rgba(54, 241, 205, 0.15);
    color: var(--accent-cyan);
  }
}

.option-check {
  margin-left: auto;
  color: var(--accent-cyan);
}

// 下拉动画
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
```

### 4. 集成到 SubScreenLayout

**文件: `src/components/SubScreenLayout.vue` 修改**

在 `header-meta` 区域添加主题切换组件：

```vue
<template>
  <div class="screen">
    <!-- ... -->
    <header class="screen-header panel">
      <div class="header-left" ...>
        <!-- 返回按钮 -->
      </div>

      <div class="header-title">
        <!-- 标题 -->
      </div>

      <div class="header-right">
        <!-- 新增：主题切换 -->
        <ThemeSwitcher />

        <div class="header-meta">
          <div class="meta-label">数据更新时间</div>
          <div class="meta-value">{{ meta }}</div>
        </div>
      </div>
    </header>
    <!-- ... -->
  </div>
</template>

<script setup lang="ts">
import ThemeSwitcher from './ThemeSwitcher.vue'
// ...
</script>

<style scoped lang="scss">
.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: flex-end;
}
</style>
```

### 5. 更新入口文件

**文件: `src/main.ts`**

```typescript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useThemeStore } from './stores/theme'

import './assets/styles/main.scss'
import './assets/styles/themes.scss'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// 初始化主题
const themeStore = useThemeStore()
themeStore.initSystemThemeListener()

app.mount('#app')
```

### 5. 更新 ParticlesBackground 组件

需要修改粒子背景组件以支持主题变量:

```vue
<!-- 在 ParticlesBackground.vue 中 -->
<script setup lang="ts">
// 获取 CSS 变量
const getThemeColor = () => {
  const style = getComputedStyle(document.documentElement)
  return style.getPropertyValue('--particles-color').trim() || '90, 204, 255'
}

// 在 onMounted 中使用
const particleColor = `rgba(${getThemeColor()}, 0.35)`
</script>
```

### 6. 更新图表主题

**文件: `src/utils/chartTheme.ts`**

需要添加一个函数来根据当前主题返回对应的图表配色:

```typescript
// 添加到 chartTheme.ts
export const getThemeSemanticColors = () => {
  const style = getComputedStyle(document.documentElement)

  return {
    revenue: style.getPropertyValue('--accent-blue').trim() || '#5accff',
    profit: style.getPropertyValue('--accent-cyan').trim() || '#36f1cd',
    cost: style.getPropertyValue('--accent-rose').trim() || '#ff6b6b',
    target: style.getPropertyValue('--accent-amber').trim() || '#f8c547',
    performance: style.getPropertyValue('--accent-lime').trim() || '#7cf29a',
    // ... 其他颜色
  }
}
```

---

## 实施步骤

### 阶段 1: 基础设施 (0.5 天)

- [ ] 创建 `src/stores/theme.ts` 主题 Store
- [ ] 创建 `src/assets/styles/themes.scss` 主题变量文件
- [ ] 更新 `index.html` 添加防闪烁脚本
- [ ] 更新 `main.ts` 初始化主题
- [ ] 更新 `main.scss` 引入主题样式

### 阶段 2: 组件开发 (1 天)

- [ ] 创建 `ThemeSwitcher.vue` 下拉选择组件
- [ ] 更新 `SubScreenLayout.vue` 集成主题切换入口
- [ ] 更新 `ParticlesBackground.vue` 支持主题变量
- [ ] 更新 `BaseChart.vue` 监听主题变化重绘图表

### 阶段 3: 样式适配 (1 天)

- [ ] 更新 `chartTheme.ts` 动态获取主题色
- [ ] 调整浅色模式下的面板透明度和阴影
- [ ] 检查所有组件的 CSS 变量使用情况
- [ ] 修复硬编码颜色值

### 阶段 4: 测试与优化 (0.5 天)

- [ ] 测试 4 套主题在所有页面的显示效果
- [ ] 测试 localStorage 持久化
- [ ] 测试主题切换时图表和粒子背景更新
- [ ] 检查浅色模式下所有文本对比度 >= 4.5:1
- [ ] 验证无闪烁加载

**预估总工期: 3 天**

---

## 文件变更清单

| 操作 | 文件路径 | 说明 |
|------|----------|------|
| 新建 | `src/stores/theme.ts` | 主题状态管理 |
| 新建 | `src/assets/styles/themes.scss` | 主题变量定义 |
| 新建 | `src/components/ThemeSwitcher.vue` | 主题切换下拉组件 |
| 修改 | `index.html` | 添加防闪烁脚本 |
| 修改 | `src/main.ts` | 初始化主题 Store |
| 修改 | `src/assets/styles/main.scss` | 引入主题样式 |
| 修改 | `src/components/ParticlesBackground.vue` | 支持主题变量 + 监听变化 |
| 修改 | `src/components/BaseChart.vue` | 监听主题变化重绘图表 |
| 修改 | `src/utils/chartTheme.ts` | 动态获取主题色 |
| 修改 | `src/components/SubScreenLayout.vue` | 添加主题切换入口 |

---

## 风险与注意事项

### 性能风险

| 风险 | 影响 | 缓解措施 |
|------|------|----------|
| 图表重绘开销 | 多图表页面切换主题时可能卡顿 | 使用 `requestAnimationFrame` 分批更新 |
| 粒子重建开销 | 切换主题时粒子动画重置 | 可接受，或使用颜色过渡而非重建 |

### 兼容性注意

- IE 不支持 CSS 变量，但本项目已不考虑 IE 支持
- Safari 对某些 CSS 变量语法支持有差异，需测试

### 扩展性

当前方案支持未来扩展：
- 添加新主题只需在 `themes.scss` 添加变量集和在 Store 注册
- 如需后端同步，只需在 `setTheme()` 中添加 API 调用

---

## 测试检查清单

### 视觉测试

- [ ] 深空模式下所有元素可见
- [ ] 浅色模式下文本对比度足够
- [ ] 金融科技模式下图表颜色正确
- [ ] 高对比度模式下边框清晰

### 功能测试

- [ ] 主题切换后立即生效
- [ ] 刷新页面后主题保持
- [ ] 系统主题变化时自动响应（如果启用跟随系统）

### 无障碍测试

- [ ] 键盘可以切换主题
- [ ] 屏幕阅读器可以识别当前主题
- [ ] 减少动画模式下无过渡效果

---

## 参考资源

- [Pinia 官方文档](https://pinia.vuejs.org/)
- [WCAG 对比度标准](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [prefers-color-scheme MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
- [prefers-reduced-motion MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
