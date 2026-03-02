# DHQ Charts - 经营调度驾驶舱

> **重要**: 在此项目中，所有回复必须使用**中文**。

## 项目概述

这是一个企业级数据可视化大屏系统，用于展示集团经营管理的核心指标和数据。项目采用深色科技风格的 UI 设计，具有粒子动画背景和响应式布局。

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue | 3.5.x | 前端框架 (Composition API + `<script setup>`) |
| TypeScript | 5.9.x | 类型系统 |
| Vite | 7.x | 构建工具 |
| Vue Router | 4.6.x | 路由管理 |
| Pinia | 3.x | 状态管理 (已引入但暂未深度使用) |
| ECharts | 6.x | 图表库 |
| SCSS | 1.97.x | CSS 预处理器 |

## 项目结构

```
src/
├── assets/
│   └── styles/
│       └── main.scss          # 全局样式与设计系统
├── components/
│   ├── BaseChart.vue          # ECharts 图表封装组件
│   ├── ParticlesBackground.vue # 粒子动画背景
│   ├── SubScreenLayout.vue    # 子页面布局框架
│   ├── SubScreenTabs.vue      # 标签页组件
│   └── modules/               # 业务模块卡片组件
│       ├── GeneralView/
│       ├── FinanceBudget/
│       ├── TreasuryInvest/
│       ├── AssetOperation/
│       └── ProjectOperation/
├── data/
│   └── mockDashboard.ts       # Mock 数据源
├── router/
│   └── index.ts               # 路由配置
├── utils/
│   └── chartTheme.ts          # ECharts 主题与语义色彩系统
├── views/
│   ├── Portal.vue             # 首页入口门户
│   ├── GeneralDetail.vue      # 综合看板
│   ├── AdminDetail.vue        # 行政管理
│   ├── FinanceDetail.vue      # 财务管理
│   ├── TreasuryDetail.vue     # 资金分析
│   ├── InvestmentDetail.vue   # 投资管理
│   ├── HumanResourceDetail.vue # 人力管理
│   ├── AssetDetail.vue        # 资产管理
│   ├── ProjectDetail.vue      # 经营管控
│   ├── KeyProjectsDetail.vue  # 重点项目
│   └── TaskTrackingDetail.vue # 任务跟踪
├── App.vue                    # 根组件
└── main.ts                    # 应用入口
```

## 设计系统

### 色彩体系

| 变量 | 值 | 用途 |
|------|-----|------|
| `--bg-main` | `#070d16` | 主背景色 |
| `--bg-panel` | `rgba(12, 22, 36, 0.86)` | 面板背景 |
| `--accent-cyan` | `#36f1cd` | 主强调色 (青色) |
| `--accent-blue` | `#5accff` | 次强调色 (蓝色) |
| `--accent-amber` | `#f8c547` | 警示/标签色 (琥珀) |
| `--accent-rose` | `#ff6b6b` | 错误/下降趋势 |
| `--accent-lime` | `#7cf29a` | 成功/上升趋势 |
| `--text-primary` | `#e6f1ff` | 主文本色 |
| `--text-secondary` | `#c3d4ea` | 次文本色 |
| `--text-muted` | `#93a6c2` | 辅助文本色 |

### 字体

- **显示字体**: `'Chakra Petch'` - 用于标题、数值
- **正文字体**: `'Noto Sans SC'`, `'Microsoft YaHei'` - 用于正文内容

### 语义化图表颜色

图表系统支持语义化颜色映射 (定义在 `chartTheme.ts`):

```typescript
semanticColors = {
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

在图表 series 中使用 `semantic` 属性自动应用对应颜色:

```typescript
series: [{
  type: 'line',
  semantic: 'revenue',  // 自动应用 #5accff
  data: [...]
}]
```

## 核心组件

### BaseChart.vue

ECharts 封装组件，特性:
- 自动应用主题样式 (`applyChartTheme`)
- 支持 `prefers-reduced-motion` 减少动画
- ResizeObserver 自适应尺寸
- 延迟初始化确保容器有效尺寸

```vue
<BaseChart :options="chartOption" />
```

### SubScreenLayout.vue

子页面布局框架，包含:
- 顶部导航栏 (返回按钮、标题、数据更新时间)
- 内容区域插槽
- 底部导航菜单

```vue
<SubScreenLayout title="经营管控" subtitle="Operation Control" meta="数据更新时间 08:30">
  <div>页面内容</div>
</SubScreenLayout>
```

### ParticlesBackground.vue

Canvas 粒子动画背景:
- 可配置粒子数量和连接距离
- 支持 `prefers-reduced-motion`
- 自动适应窗口大小

```vue
<ParticlesBackground :particleCount="80" :connectionDistance="150" baseColor="70, 170, 230" />
```

## 路由结构

| 路径 | 名称 | 页面 |
|------|------|------|
| `/` | portal | 首页门户 |
| `/overall` | overall | 综合看板 |
| `/admin` | admin | 行政管理 |
| `/finance` | finance | 财务管理 |
| `/treasury` | treasury | 资金分析 |
| `/investment` | investment | 投资管理 |
| `/hr` | hr | 人力管理 |
| `/asset` | asset | 资产管理 |
| `/operation` | operation | 经营管控 |
| `/projects` | projects | 重点项目 |
| `/tasks` | tasks | 任务跟踪 |

## 响应式设计

- 基于 `clamp()` 的流式缩放系统
- 断点: 1200px (平板/小屏), 1400px (中等屏幕)
- 基准设计宽度: 1920px
- 缩放比例: `window.innerWidth / 1920` (范围 1.0 - 1.9)

## 无障碍特性

- 键盘导航支持 (`tabindex`, `@keydown.enter`, `@keydown.space`)
- `prefers-reduced-motion` 减少动画
- 焦点指示器 (`--focus-ring`)
- 表格支持文本选择

## 开发命令

```bash
# 安装依赖
npm install

# 开发服务器
npm run dev

# 类型检查 + 构建
npm run build

# 预览构建结果
npm run preview
```

## 代码规范

### Vue 组件

- 使用 `<script setup lang="ts">` 语法
- Props 使用 `defineProps<T>()` 类型定义
- 响应式数据使用 `ref()` 和 `computed()`
- 样式使用 `<style scoped lang="scss">`

### 图表配置

- 使用 `computed()` 包装图表选项确保响应式
- 通过 `semantic` 属性应用语义颜色
- 统一使用 `applyChartTheme()` 应用主题

### CSS 变量

- 全局变量定义在 `main.scss` 的 `:root`
- 组件级变量定义在组件 `<style>` 的根元素
- 使用 `clamp()` 实现响应式尺寸


