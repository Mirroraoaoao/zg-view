## 项目UI优化方案

### 范围与依据
本方案基于现有源码样式与页面结构进行评估，重点参考了 `src/assets/styles/main.scss`、`src/components/SubScreenLayout.vue`、`src/views/Portal.vue`、`src/views/GeneralDetail.vue`、`src/views/AdminDetail.vue`、`src/views/FinanceDetail.vue`、`src/views/TaskTrackingDetail.vue`、`src/utils/chartTheme.ts`、`src/components/ParticlesBackground.vue`。

本方案不涉及代码改动，仅提供可执行的优化方向与落地建议。

### 当前视觉与体验亮点
- 视觉语言统一：暗色指挥舱风格与网格背景、霓虹高亮一致。
- 组件体系较完整：panel、kpi、chip、table、progress 已形成统一基底。
- 图表主题集中管理：ECharts 主题与字体缩放策略可控（`src/utils/chartTheme.ts`）。
- 模块化布局清晰：入口页与各业务子屏具备明确分区与动线。

### 主要问题与优化目标
- 信息层级偏“平”：大量文本使用相同字重与相似对比度，关键指标不够“跳出”。
- 可读性偏弱：中文大量字距与小字号并存（如 0.7rem），长表格与列表易疲劳。
- 动效过量风险：粒子背景与多处高光动画同时存在，缺少“减少动态”策略。
- 响应式策略不统一：部分页面使用 JS scale，部分仅依赖 CSS，导致尺度不一致。
- 表格与列表效率：缺少“定位辅助”（如粘性表头、重点高亮、行层级）。

## 优化方向与实施建议

### 信息层级与排版
- 统一“层级三段式”规则：标题（高对比、较大字重）/ 关键数值（最大字号）/ 说明文字（降低对比），建议在 `src/assets/styles/main.scss` 定义全局层级变量并逐步替换散落样式。
- 中文标题字距降低：如 `src/views/Portal.vue` 的 `.brand-title`、`.card-title`、`.title-cn` 建议降低 letter-spacing，保留英文字母的字距扩展。
- KPI 数字对齐：对 `src/assets/styles/main.scss` 的 `.kpi-value` 与表格数值列增加数字对齐策略（等宽数字或右对齐），提高扫读效率。
- 统一小字号下限：当前多处 0.7rem~0.78rem（如 `src/components/SubScreenTabs.vue`、表格），建议设定最小字号阈值，保证大屏距离可读性。

### 色彩与对比
- 明暗层级再拉开：`--bg-panel` 与 `--bg-panel-strong` 差值偏小，建议增加对比度，让“主要面板”更突出，次级信息更退后（`src/assets/styles/main.scss`）。
- 语义色系统化：当前上升/下降/预警分布在局部组件，建议在根级变量中统一语义色并对表格、趋势标签、进度条统一调用。
- 低对比文字校正：`--text-muted` 与 `--text-secondary` 在小字号下偏弱，建议提升亮度或在小字号场景自动提高对比（尤其是表格与长文案）。

### 导航与结构
- 导航密度优化：`src/components/SubScreenLayout.vue` 的底部导航项密集且换行，建议引入“分组或折叠”策略，减少一次性可见项数量。
- 入口页模块层级优化：`src/views/Portal.vue` 中左右模块卡片密度较高，建议加入“主次级视觉权重”，例如：主入口更高亮、次入口降低对比。
- 点击区域一致化：所有可点击卡片/模块应有一致的 hover/focus 反馈（`Portal` 与 `SubScreenLayout` 已有部分实现，建议补齐）。

### 图表与数据展示
- 图表“读数辅助”增强：在关键图表增加“值标签/峰值标记/数据注释”策略，降低对 tooltip 的依赖（参考 `src/views/GeneralDetail.vue` 与 `src/views/FinanceDetail.vue`）。
- 颜色与系列控制：跨页面多色混用时避免“同色不同义”，建议基于 `src/utils/chartTheme.ts` 统一“系列-语义”映射。
- 表格可读性提升：为大表格增加粘性表头、重点行高亮、行组分隔，以降低长表滚动的定位成本（`src/assets/styles/main.scss`）。

### 动效与性能
- 背景动效分层：`src/components/ParticlesBackground.vue` 的粒子与连线在高密度页面容易喧宾夺主，建议支持“静态模式”或低密度模式。
- 适配减少动态：引入 `prefers-reduced-motion` 策略，降低粒子与高频动画的运动量（参考 UX 动效规范）。
- 动效优先级控制：同屏最多保留 1-2 个高注意力动效，避免数据密集场景分散注意力。

### 响应式与大屏适配
- 统一缩放策略：部分页面使用 JS scale，部分使用 CSS clamp，建议统一为“CSS clamp 为主 + 图表字体最小值保护”的方案，减少跨屏尺寸不一致（`src/views/Portal.vue`、`src/views/GeneralDetail.vue`、`src/utils/chartTheme.ts`）。
- 高分辨率密度控制：在 2K/4K 下增加“内容最大宽度”与“视觉分区留白”，避免信息过于铺满。
- 小屏可用性校验：当前多处设置 `overflow: hidden` 与多重网格，建议补充“移动端阅读模式”以避免横向滚动。

### 可访问性与可用性
- 焦点与键盘可达：为可交互元素补齐键盘焦点样式，避免只能鼠标操作。
- 数据可复制性：全局 `user-select: none` 会限制数据复制与复核，建议对表格或数值区域开放选择（`src/assets/styles/main.scss`）。
- 色盲友好提示：趋势上涨/下降仅靠颜色区分，建议加入方向符号或图标。

## 优先级与落地建议

### P0（高收益、低改动）
- 统一小字号下限与中文字距规则（排版可读性立即提升）。
- 增加表格粘性表头与数值对齐策略（数据阅读效率提升）。
- 降低粒子动效密度并支持减少动态策略（避免干扰与眩晕）。

### P1（中收益、中改动）
- 建立语义色统一规范并落地到趋势标签/进度条/表格。
- 入口页与导航的主次层级拉开，提高动线清晰度。
- 图表读数辅助增强（标签、关键节点提示）。

### P2（长期优化）
- 大屏与小屏双模式设计（数据密度与布局策略分离）。
- 建立“可交互组件”统一交互规范（hover、focus、active）。

## 预期效果与验证方式

### 预期效果
- 关键数据更易被第一时间识别与对比。
- 大屏观看距离下文本可读性提升。
- 动效干扰降低，信息扫读更顺畅。

### 验证方式
- 对比优化前后截图（1:1 屏幕尺度）。
- 统一字号与对比度指标抽查（KPI、表格、图表）。
- 低动效模式与正常模式切换体验检查。
