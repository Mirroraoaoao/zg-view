# 集团数据驾驶舱 (zg-view)

<p align="center">
  <img src="src/assets/logo (2).png" alt="Logo" height="80">
</p>

<p align="center">
  <strong>企业经营全景态势一屏统览</strong>
</p>

<p align="center">
  <a href="#技术栈">技术栈</a> •
  <a href="#快速开始">快速开始</a> •
  <a href="#项目结构">项目结构</a> •
  <a href="#设计系统">设计系统</a> •
  <a href="#核心组件">核心组件</a> •
  <a href="#路由系统">路由系统</a>
</p>

---

## 项目简介

zg-view 是一个企业级数据可视化大屏系统，专为集团经营管理设计，用于展示核心经营指标和数据。项目采用深色科技风格的 UI 设计，配合动态粒子动画背景，提供沉浸式的数据展示体验。

### 主要特性

- **深色科技风格 UI** - 专业的指挥中心视觉设计，适合大屏展示
- **响应式布局** - 基于 `clamp()` 的流式缩放系统，适配 1200px ~ 1920px+ 各种屏幕
- **丰富的数据可视化** - 集成 ECharts 6.x，支持多种图表类型
- **语义化图表颜色** - 内置业务语义色彩映射（营收、利润、成本等）
- **粒子动画背景** - Canvas 渲染的动态粒子效果，支持 `prefers-reduced-motion`
- **无障碍支持** - 完整的键盘导航和焦点管理

---

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| [Vue](https://vuejs.org/) | 3.5.x | 前端框架 (Composition API + `<script setup>`) |
| [TypeScript](https://www.typescriptlang.org/) | 5.9.x | 类型系统 |
| [Vite](https://vite.dev/) | 7.x | 构建工具 |
| [Vue Router](https://router.vuejs.org/) | 4.6.x | 路由管理 |
| [Pinia](https://pinia.vuejs.org/) | 3.x | 状态管理 |
| [ECharts](https://echarts.apache.org/) | 6.x | 图表库 |
| [SCSS](https://sass-lang.com/) | 1.97.x | CSS 预处理器 |

---

## 快速开始

### 环境要求

- Node.js >= 18.x
- npm >= 9.x 或 yarn >= 1.22.x

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

开发服务器将在 `http://localhost:5173` 启动。

### 生产构建

```bash
# 类型检查 + 构建
npm run build

# 预览构建结果
npm run preview
```

---

## 项目结构

```
src/
├── assets/
│   ├── styles/
│   │   ├── main.scss          # 全局样式与设计系统
│   │   └── themes.scss        # 主题变量定义
│   ├── doc/                   # 项目文档资料
│   └── *.png / *.webp         # 静态图片资源
│
├── components/
│   ├── BaseChart.vue          # ECharts 图表封装组件
│   ├── ParticlesBackground.vue # Canvas 粒子动画背景
│   ├── SubScreenLayout.vue    # 子页面布局框架
│   ├── SubScreenTabs.vue      # 标签页组件
│   ├── ThemeSwitcher.vue      # 主题切换器
│   └── modules/               # 业务模块卡片组件
│       ├── GeneralView/       # 综合视图模块
│       ├── FinanceBudget/     # 财务预算模块
│       ├── TreasuryInvest/    # 资金投资模块
│       ├── AssetOperation/    # 资产运营模块
│       └── ProjectOperation/  # 项目运营模块
│
├── data/
│   └── mockDashboard.ts       # Mock 数据源
│
├── router/
│   └── index.ts               # 路由配置
│
├── stores/
│   └── theme.ts               # 主题状态管理 (Pinia)
│
├── utils/
│   └── chartTheme.ts          # ECharts 主题与语义色彩系统
│
├── views/
│   ├── Portal.vue             # 首页入口门户
│   ├── GeneralDetail.vue      # 综合看板（经营数据）
│   ├── FinanceDetail.vue      # 财务管理
│   ├── TreasuryDetail.vue     # 资金分析
│   ├── InvestmentDetail.vue   # 投资运营
│   ├── KeyProjectsDetail.vue  # 重点项目
│   ├── AssetDetail.vue        # 资产管理
│   ├── ProjectDetail.vue      # 业务数据
│   ├── HumanResourceDetail.vue # 人力资源
│   └── AdminDetail.vue        # 行政管理
│
├── App.vue                    # 根组件
└── main.ts                    # 应用入口
```

---

## 设计系统

### 色彩体系

项目采用深色科技风格的色彩方案，所有颜色通过 CSS 变量定义，便于统一管理和主题切换。

#### 背景色

| 变量 | 值 | 用途 |
|------|-----|------|
| `--bg-main` | `#070d16` | 主背景色 |
| `--bg-panel` | `rgba(12, 22, 36, 0.86)` | 面板背景 |
| `--bg-panel-strong` | `rgba(14, 28, 46, 0.96)` | 强调面板背景 |
| `--panel-border` | `rgba(90, 204, 255, 0.26)` | 面板边框 |

#### 强调色

| 变量 | 值 | 用途 |
|------|-----|------|
| `--accent-cyan` | `#36f1cd` | 主强调色（青色） |
| `--accent-blue` | `#5accff` | 次强调色（蓝色） |
| `--accent-amber` | `#f8c547` | 警示/标签色（琥珀） |
| `--accent-rose` | `#ff6b6b` | 错误/下降趋势（玫红） |
| `--accent-lime` | `#7cf29a` | 成功/上升趋势（青柠） |

#### 文本色

| 变量 | 值 | 用途 |
|------|-----|------|
| `--text-primary` | `#e6f1ff` | 主文本色 |
| `--text-secondary` | `#c3d4ea` | 次文本色 |
| `--text-muted` | `#93a6c2` | 辅助文本色 |
| `--text-strong` | `#f4f8ff` | 强调文本色 |

### 字体系统

```scss
// 显示字体 - 用于标题、数值
--font-display: 'Chakra Petch', 'Noto Sans SC', sans-serif;

// 正文字体 - 用于正文内容
--font-body: 'Noto Sans SC', 'Microsoft YaHei', sans-serif;
```

项目使用 Google Fonts 加载 `Chakra Petch` 和 `Noto Sans SC` 字体。

### 语义化图表颜色

图表系统内置语义化颜色映射，在 `src/utils/chartTheme.ts` 中定义：

```typescript
const semanticColors = {
  revenue: '#5accff',      // 营收
  profit: '#36f1cd',       // 利润
  cost: '#ff6b6b',         // 成本
  target: '#f8c547',       // 目标
  performance: '#7cf29a',  // 绩效
  cashIn: '#36f1cd',       // 现金流入
  cashOut: '#ff6b6b',      // 现金流出
  netCash: '#7cf29a',      // 净现金流
  benchmark: '#f8c547'     // 对标
}
```

在图表 series 中使用 `semantic` 属性自动应用对应颜色：

```typescript
const chartOption = {
  series: [{
    type: 'line',
    semantic: 'revenue',  // 自动应用 #5accff
    data: [...]
  }]
}
```

### 响应式设计

项目采用基于 `clamp()` 的流式缩放系统：

- **基准设计宽度**: 1920px
- **缩放范围**: 1.0 - 1.9
- **断点**:
  - 1200px: 平板/小屏适配
  - 1400px: 中等屏幕适配

```scss
// 缩放计算
scale = window.innerWidth / 1920

// 示例 - 响应式间距
--space-2: clamp(10px, 0.7vw, 18px);
--space-3: clamp(14px, 0.9vw, 24px);
--space-4: clamp(18px, 1.1vw, 32px);
```

---

## 核心组件

### BaseChart.vue

ECharts 图表封装组件，提供统一的图表渲染和主题应用。

**特性：**
- 自动应用主题样式 (`applyChartTheme`)
- 支持 `prefers-reduced-motion` 减少动画
- ResizeObserver 自适应尺寸
- 延迟初始化确保容器有效尺寸
- 响应主题切换自动更新

**使用方式：**

```vue
<template>
  <BaseChart :options="chartOption" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseChart from '@/components/BaseChart.vue'

const chartOption = computed(() => ({
  xAxis: {
    type: 'category',
    data: ['一月', '二月', '三月', '四月']
  },
  yAxis: { type: 'value' },
  series: [{
    type: 'bar',
    semantic: 'revenue',
    data: [120, 200, 150, 80]
  }]
}))
</script>
```

### SubScreenLayout.vue

子页面布局框架，提供统一的页面结构。

**特性：**
- 顶部导航栏（返回按钮、标题、数据更新时间）
- 内容区域插槽
- 底部导航菜单（快速切换各功能模块）
- 粒子动画背景

**使用方式：**

```vue
<template>
  <SubScreenLayout
    title="经营管控"
    subtitle="Operation Control"
    meta="数据更新时间 08:30"
  >
    <div class="content">
      <!-- 页面内容 -->
    </div>
  </SubScreenLayout>
</template>
```

**Props：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | - | 页面标题（必填） |
| `subtitle` | `string` | - | 英文副标题 |
| `meta` | `string` | `'今日 08:30'` | 数据更新时间 |

### ParticlesBackground.vue

Canvas 粒子动画背景组件。

**特性：**
- 可配置粒子数量和连接距离
- 支持 `prefers-reduced-motion` 自动禁用动画
- 自动适应窗口大小
- 优化的渲染性能

**使用方式：**

```vue
<template>
  <ParticlesBackground
    :particleCount="80"
    :connectionDistance="150"
    baseColor="70, 170, 230"
  />
</template>
```

**Props：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `particleCount` | `number` | `80` | 粒子数量 |
| `connectionDistance` | `number` | `150` | 粒子连线距离 |
| `baseColor` | `string` | `'70, 170, 230'` | 基础颜色（RGB 格式） |

---

## 路由系统

项目使用 Vue Router 管理页面导航，采用 HTML5 History 模式。

### 路由配置

| 路径 | 名称 | 页面 | 说明 |
|------|------|------|------|
| `/` | `portal` | Portal.vue | 首页门户入口 |
| `/overall` | `overall` | GeneralDetail.vue | 综合看板（经营数据） |
| `/finance` | `finance` | FinanceDetail.vue | 财务管理 |
| `/treasury` | `treasury` | TreasuryDetail.vue | 资金分析 |
| `/investment` | `investment` | InvestmentDetail.vue | 投资运营 |
| `/projects` | `projects` | KeyProjectsDetail.vue | 重点项目 |
| `/asset` | `asset` | AssetDetail.vue | 资产管理 |
| `/operation` | `operation` | ProjectDetail.vue | 业务数据 |
| `/hr` | `hr` | HumanResourceDetail.vue | 人力资源 |
| `/admin` | `admin` | AdminDetail.vue | 行政管理 |

### 页面导航流程

```
┌─────────────────────────────────────────────────────────────┐
│                      Portal (首页门户)                        │
│                                                             │
│  ┌─────────┐    ┌─────────────────┐    ┌─────────┐        │
│  │ 财务管理  │    │    经营数据      │    │ 资产管理  │        │
│  │ 资金分析  │    │   (核心入口)     │    │ 业务数据  │        │
│  │ 投资运营  │    │                 │    │ 人力资源  │        │
│  │ 重点项目  │    │                 │    │ 行政管理  │        │
│  └─────────┘    └─────────────────┘    └─────────┘        │
│        │               │                     │             │
│        └───────────────┼─────────────────────┘             │
│                        ▼                                    │
│              ┌─────────────────┐                            │
│              │    子页面详情     │                            │
│              │  (SubScreenLayout) │                          │
│              │                 │                            │
│              │  底部导航可快速   │                            │
│              │  切换各功能模块   │                            │
│              └─────────────────┘                            │
└─────────────────────────────────────────────────────────────┘
```

---

## 数据管理

### Mock 数据

当前版本使用 Mock 数据进行开发，数据定义在 `src/data/mockDashboard.ts`：

```typescript
// 门户页面数据结构
export const portalData = {
  header: {
    title: '集团数据驾驶舱',
    subtitle: '企业经营全景态势一屏统览',
    status: '数据同步正常'
  },
  hero: {
    name: 'overall',
    title: '经营数据',
    subtitle: '集团核心经营成果总览',
    badge: '核心入口',
    metrics: [
      { label: '总营收', value: '￥ 1,452 亿' },
      // ...
    ]
  },
  // ...
}
```

### 状态管理

项目已集成 Pinia 状态管理，当前主要用于主题切换：

```typescript
// src/stores/theme.ts
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    themeName: 'dark'
  }),
  // ...
})
```

---

## 无障碍特性

项目注重无障碍访问体验：

- **键盘导航**: 所有交互元素支持 `tabindex`、`@keydown.enter`、`@keydown.space`
- **动画偏好**: 支持 `prefers-reduced-motion` 媒体查询，自动减少或禁用动画
- **焦点指示器**: 统一的焦点样式 (`--focus-ring`)
- **语义化标签**: 合理使用 `role` 属性和 ARIA 标签

```scss
// 焦点样式
:where(button, [role='button'], a, input, select, textarea, [tabindex]):focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
  border-color: var(--focus-border);
}

// 减少动画
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 开发指南

### Vue 组件规范

```vue
<script setup lang="ts">
// 1. 使用 <script setup lang="ts"> 语法
// 2. Props 使用 defineProps<T>() 类型定义
// 3. 响应式数据使用 ref() 和 computed()

import { ref, computed } from 'vue'

const props = defineProps<{
  title: string
  subtitle?: string
}>()

const count = ref(0)
const doubled = computed(() => count.value * 2)
</script>

<template>
  <!-- 模板内容 -->
</template>

<style scoped lang="scss">
// 使用 scoped 样式
// 组件级变量定义在根元素
.component {
  --local-var: 10px;
}
</style>
```

### 图表配置规范

```typescript
// 1. 使用 computed() 包装图表选项确保响应式
// 2. 通过 semantic 属性应用语义颜色
// 3. BaseChart 会自动应用 applyChartTheme()

const chartOption = computed(() => ({
  tooltip: { trigger: 'axis' },
  xAxis: {
    type: 'category',
    data: ['Q1', 'Q2', 'Q3', 'Q4']
  },
  yAxis: { type: 'value' },
  series: [
    {
      name: '营收',
      type: 'bar',
      semantic: 'revenue',  // 自动应用营收颜色
      data: [320, 302, 341, 374]
    },
    {
      name: '利润',
      type: 'line',
      semantic: 'profit',   // 自动应用利润颜色
      data: [120, 132, 101, 134]
    }
  ]
}))
```

### CSS 变量使用

```scss
// 全局变量定义在 main.scss 的 :root
:root {
  --bg-main: #070d16;
  --accent-cyan: #36f1cd;
}

// 组件级变量定义在组件 <style> 的根元素
.my-component {
  --local-padding: clamp(8px, 0.6vw, 16px);
  padding: var(--local-padding);
}

// 使用 clamp() 实现响应式尺寸
.responsive-text {
  font-size: clamp(12px, 0.75vw, 18px);
}
```

---



## 许可证

私有项目，仅限内部使用。

---

<p align="center">
  <sub>zg-view - Built with Vue 3 + Vite + ECharts</sub>
</p>
