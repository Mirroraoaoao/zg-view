type ChartOption = Record<string, any>

type ChartTheme = {
  textStyle: ChartOption
  color: string[]
  tooltip: ChartOption
  legend: ChartOption
  xAxis: ChartOption
  yAxis: ChartOption
  grid: ChartOption
  series: {
    line: ChartOption
    bar: ChartOption
    pie: ChartOption
  }
  markPoint: ChartOption
  minLabelSize: number
  minLegendSize: number
}

// 从 CSS 变量动态获取主题色（带缓存，仅首次读取 DOM）
let _cachedColors: ReturnType<typeof _readThemeColors> | null = null

const _readThemeColors = () => {
  if (typeof window === 'undefined') {
    return {
      revenue: '#5accff',
      profit: '#36f1cd',
      cost: '#ff6b6b',
      target: '#f8c547',
      performance: '#7cf29a',
      textPrimary: '#e6f1ff',
      textSecondary: '#a6bad2',
      textMuted: '#6b7a8f',
      bgPanel: 'rgba(7, 14, 24, 0.92)',
      border: 'rgba(90, 204, 255, 0.45)',
      axisLine: '#2a3b54',
      splitLine: '#1d2a3d',
      labelLine: 'rgba(166, 186, 210, 0.6)',
      chartShadow: 'rgba(12, 24, 40, 0.6)',
      chartBorder: 'rgba(7, 14, 24, 0.6)'
    }
  }

  const style = getComputedStyle(document.documentElement)
  const get = (name: string, fallback: string) => style.getPropertyValue(name).trim() || fallback

  return {
    revenue: get('--chart-revenue', get('--accent-blue', '#5accff')),
    profit: get('--chart-profit', get('--accent-cyan', '#36f1cd')),
    cost: get('--chart-cost', get('--accent-rose', '#ff6b6b')),
    target: get('--chart-target', get('--accent-amber', '#f8c547')),
    performance: get('--chart-performance', get('--accent-lime', '#7cf29a')),
    textPrimary: get('--text-primary', '#e6f1ff'),
    textSecondary: get('--text-secondary', '#a6bad2'),
    textMuted: get('--text-muted', '#6b7a8f'),
    bgPanel: get('--bg-panel', 'rgba(7, 14, 24, 0.92)'),
    border: get('--panel-border', 'rgba(90, 204, 255, 0.45)'),
    axisLine: get('--chart-axis-line', '#2a3b54'),
    splitLine: get('--chart-split-line', '#1d2a3d'),
    labelLine: get('--chart-label-line', 'rgba(166, 186, 210, 0.6)'),
    chartShadow: get('--chart-shadow', 'rgba(12, 24, 40, 0.6)'),
    chartBorder: get('--chart-border', 'rgba(7, 14, 24, 0.6)')
  }
}

export const getThemeColors = () => {
  if (!_cachedColors) {
    _cachedColors = _readThemeColors()
  }
  return _cachedColors
}

/** Portal.vue 使用的别名 */
export const getChartColors = getThemeColors

// 静态语义色映射
export const semanticColors = {
  revenue: '#5accff',
  profit: '#36f1cd',
  cost: '#ff6b6b',
  target: '#f8c547',
  performance: '#7cf29a',
  cashIn: '#36f1cd',
  cashOut: '#ff6b6b',
  netCash: '#7cf29a',
  benchmark: '#f8c547'
} as const

type SemanticKey = keyof typeof semanticColors

const getScale = () => {
  if (typeof window === 'undefined') return 1
  const next = window.innerWidth / 1920
  return Math.min(1.9, Math.max(1, next))
}

const resolveSemanticKey = (series: ChartOption): SemanticKey | null => {
  const semantic = series.semantic as SemanticKey | undefined
  if (semantic && semanticColors[semantic]) return semantic

  const name = String(series.name ?? '')
  if (!name) return null
  if (name.includes('营收') || name.includes('收入')) return 'revenue'
  if (name.includes('利润') || name.includes('收益')) return 'profit'
  if (name.includes('成本') || name.includes('费用')) return 'cost'
  if (name.includes('目标') || name.includes('完成') || name.includes('达成')) return 'target'
  if (name.includes('绩效') || name.includes('表现')) return 'performance'
  if (name.includes('现金流入')) return 'cashIn'
  if (name.includes('现金流出')) return 'cashOut'
  if (name.includes('净流量')) return 'netCash'
  if (name.includes('对标') || name.includes('基准')) return 'benchmark'
  return null
}

const resolveSemanticColor = (series: ChartOption) => {
  const key = resolveSemanticKey(series)
  if (!key) return null

  const colors = getThemeColors()
  const colorMap: Record<SemanticKey, string> = {
    revenue: colors.revenue,
    profit: colors.profit,
    cost: colors.cost,
    target: colors.target,
    performance: colors.performance,
    cashIn: colors.profit,
    cashOut: colors.cost,
    netCash: colors.performance,
    benchmark: colors.target
  }

  return colorMap[key] || null
}

const hexToRgba = (hex: string, alpha: number) => {
  const normalized = hex.replace('#', '')
  if (normalized.length !== 6) return hex
  const r = parseInt(normalized.slice(0, 2), 16)
  const g = parseInt(normalized.slice(2, 4), 16)
  const b = parseInt(normalized.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const buildChartTheme = (): ChartTheme => {
  const scale = getScale()
  const scaleNumber = (value: number) => Math.round(value * scale)
  const colors = getThemeColors()

  const labelSize = scaleNumber(11)
  const legendSize = scaleNumber(11)

  return {
    textStyle: {
      color: colors.textPrimary,
      fontFamily: "'Noto Sans SC', 'Microsoft YaHei', sans-serif",
      fontSize: scaleNumber(12)
    },
    color: [
      colors.revenue,
      colors.profit,
      colors.target,
      colors.performance,
      colors.cost
    ],
    tooltip: {
      backgroundColor: colors.bgPanel,
      borderColor: colors.border,
      borderWidth: 1,
      padding: [scaleNumber(8), scaleNumber(10)],
      textStyle: { color: colors.textPrimary, fontSize: scaleNumber(12) },
      axisPointer: { type: 'line', lineStyle: { color: colors.border } }
    },
    legend: {
      textStyle: { color: colors.textSecondary, fontSize: legendSize },
      itemWidth: scaleNumber(10),
      itemHeight: scaleNumber(6),
      itemGap: scaleNumber(12),
      icon: 'roundRect'
    },
    xAxis: {
      axisLine: { lineStyle: { color: colors.axisLine } },
      axisTick: { show: false },
      axisLabel: { color: colors.textSecondary, fontSize: labelSize, margin: scaleNumber(8) },
      splitLine: { show: false }
    },
    yAxis: {
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: colors.textSecondary, fontSize: labelSize, margin: scaleNumber(8) },
      splitLine: { lineStyle: { color: colors.splitLine } }
    },
    grid: { containLabel: true },
    series: {
      line: { lineStyle: { width: scaleNumber(2) }, emphasis: { focus: 'series' } },
      bar: { itemStyle: { borderRadius: scaleNumber(6) }, emphasis: { focus: 'series' } },
      pie: {
        labelLine: {
          length: scaleNumber(10),
          length2: scaleNumber(10),
          lineStyle: { color: colors.labelLine }
        },
        emphasis: { scale: true }
      }
    },
    markPoint: {
      symbol: 'circle',
      symbolSize: scaleNumber(6),
      itemStyle: {
        color: 'rgba(0, 0, 0, 0)',
        borderWidth: 0,
        shadowBlur: 0
      },
      label: {
        show: true,
        position: 'inside',
        formatter: '{c} 亿',
        color: colors.textPrimary,
        fontFamily: "'Chakra Petch', 'Noto Sans SC', sans-serif",
        fontSize: scaleNumber(10),
        fontWeight: 600,
        padding: [scaleNumber(2), scaleNumber(6)],
        borderRadius: scaleNumber(6),
        backgroundColor: colors.bgPanel,
        borderColor: colors.border,
        borderWidth: 1,
        textShadowColor: colors.border,
        textShadowBlur: scaleNumber(6),
        offset: [0, 0]
      }
    },
    minLabelSize: labelSize,
    minLegendSize: legendSize
  }
}

const isPlainObject = (value: unknown) =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const mergeOptions = (base: ChartOption, extra: ChartOption) => {
  const result: ChartOption = { ...base }
  Object.keys(extra).forEach((key) => {
    const baseValue = result[key]
    const extraValue = extra[key]
    if (isPlainObject(baseValue) && isPlainObject(extraValue)) {
      result[key] = mergeOptions(baseValue, extraValue)
    } else {
      result[key] = extraValue
    }
  })
  return result
}

const normalizeFontSize = (value: unknown, minSize: number) =>
  typeof value === 'number' ? Math.max(value, minSize) : minSize

const applyAxisTheme = (axisOption: any, axisTheme: ChartOption, minLabelSize: number) => {
  const applySingle = (item: ChartOption) => {
    const merged = mergeOptions(axisTheme, item)
    if (isPlainObject(merged.axisLabel)) {
      merged.axisLabel = {
        ...merged.axisLabel,
        fontSize: normalizeFontSize(merged.axisLabel.fontSize, minLabelSize)
      }
    }
    return merged
  }

  if (Array.isArray(axisOption)) {
    return axisOption.map((item) => applySingle(item))
  }
  if (isPlainObject(axisOption)) {
    return applySingle(axisOption)
  }
  return axisOption
}

const applyLegendTheme = (legendOption: any, legendTheme: ChartOption, minLegendSize: number) => {
  const applySingle = (item: ChartOption) => {
    const merged = mergeOptions(legendTheme, item)
    if (isPlainObject(merged.textStyle)) {
      merged.textStyle = {
        ...merged.textStyle,
        fontSize: normalizeFontSize(merged.textStyle.fontSize, minLegendSize)
      }
    }
    return merged
  }

  if (Array.isArray(legendOption)) {
    return legendOption.map((item) => applySingle(item))
  }
  if (isPlainObject(legendOption)) {
    return applySingle(legendOption)
  }
  return legendOption
}

const applyTooltipTheme = (tooltipOption: any, tooltipTheme: ChartOption) => {
  if (tooltipOption === true) return { ...tooltipTheme }
  if (tooltipOption === false) return { show: false }
  if (isPlainObject(tooltipOption)) {
    return mergeOptions(tooltipTheme, tooltipOption)
  }
  return tooltipOption
}

const applyGridTheme = (gridOption: any, gridTheme: ChartOption) => {
  if (Array.isArray(gridOption)) {
    return gridOption.map((item) => mergeOptions(gridTheme, item))
  }
  if (isPlainObject(gridOption)) {
    return mergeOptions(gridTheme, gridOption)
  }
  return gridOption
}

const applySeriesTheme = (seriesOption: any, theme: ChartTheme) => {
  if (!Array.isArray(seriesOption)) return seriesOption

  return seriesOption.map((item) => {
    if (!isPlainObject(item)) return item

    const next = { ...item }
    const seriesType = item.type
    const semanticColor = resolveSemanticColor(item)
    const fallbackColor = theme.color[0]

    if (seriesType === 'line') {
      const lineStyle = isPlainObject(item.lineStyle) ? { ...item.lineStyle } : {}
      if (lineStyle.width === undefined) {
        lineStyle.width = theme.series.line.lineStyle.width
      }
      if (lineStyle.color === undefined && semanticColor) {
        lineStyle.color = semanticColor
      }
      next.lineStyle = lineStyle
      if (isPlainObject(item.areaStyle) && item.areaStyle.color === undefined && semanticColor) {
        next.areaStyle = { ...item.areaStyle, color: hexToRgba(semanticColor, 0.18) }
      }
      if (next.emphasis === undefined) {
        next.emphasis = theme.series.line.emphasis
      }
    }

    if (seriesType === 'bar') {
      const itemStyle = isPlainObject(item.itemStyle) ? { ...item.itemStyle } : {}
      if (itemStyle.borderRadius === undefined) {
        itemStyle.borderRadius = theme.series.bar.itemStyle.borderRadius
      }
      if (itemStyle.color === undefined && semanticColor) {
        itemStyle.color = semanticColor
      }
      next.itemStyle = itemStyle
      if (isPlainObject(item.label)) {
        const label = { ...item.label }
        if (label.color === undefined) {
          label.color = theme.textStyle.color
        }
        next.label = label
      }
      if (next.emphasis === undefined) {
        next.emphasis = theme.series.bar.emphasis
      }
    }

    if (seriesType === 'pie') {
      const colors = getThemeColors()

      const label = isPlainObject(item.label) ? { ...item.label } : {}
      if (label.color === undefined) label.color = theme.textStyle.color
      if (label.fontFamily === undefined) label.fontFamily = theme.textStyle.fontFamily
      if (label.fontSize === undefined) label.fontSize = theme.minLabelSize
      if (label.formatter === undefined) label.formatter = '{b} {d}%'
      next.label = label

      const labelLine = isPlainObject(item.labelLine) ? { ...item.labelLine } : {}
      next.labelLine = mergeOptions(theme.series.pie.labelLine, labelLine)

      // 默认开启避让，避免小屏/密集扇区 label 重叠导致的“糊成一团”
      ;(next as any).avoidLabelOverlap ??= true
      ;(next as any).minShowLabelAngle ??= 6
      ;(next as any).labelLayout ??= { hideOverlap: true, moveOverlap: 'shiftY' }

      const itemStyle = isPlainObject(item.itemStyle) ? { ...item.itemStyle } : {}
      if (itemStyle.borderWidth === undefined) itemStyle.borderWidth = 1
      if (itemStyle.borderColor === undefined) itemStyle.borderColor = colors.chartBorder
      if (itemStyle.shadowBlur === undefined) itemStyle.shadowBlur = Math.max(10, Math.round(theme.minLabelSize * 1.2))
      if (itemStyle.shadowColor === undefined) itemStyle.shadowColor = colors.chartShadow
      next.itemStyle = itemStyle

      if (next.emphasis === undefined) {
        next.emphasis = theme.series.pie.emphasis
      } else if (isPlainObject(next.emphasis)) {
        next.emphasis = mergeOptions(theme.series.pie.emphasis, next.emphasis)
      }

      if (isPlainObject(next.emphasis)) {
        const emph = next.emphasis as ChartOption
        if (!isPlainObject(emph.label)) {
          emph.label = {
            show: true,
            formatter: '{b}\n{d}%',
            color: theme.textStyle.color,
            fontFamily: theme.textStyle.fontFamily,
            fontSize: Math.max(theme.minLabelSize + 2, 12),
            fontWeight: 600
          }
        }
        next.emphasis = emph
      }
    }

    if (seriesType === 'gauge') {
      const detail = isPlainObject(item.detail) ? { ...item.detail } : {}
      if (detail.color === undefined) {
        detail.color = theme.textStyle.color
      }
      next.detail = detail
    }

    if (isPlainObject(item.markPoint)) {
      const markPointBase = mergeOptions(theme.markPoint, item.markPoint)
      if (semanticColor) {
        if (isPlainObject(markPointBase.itemStyle)) {
          markPointBase.itemStyle = {
            ...markPointBase.itemStyle,
            borderColor: markPointBase.itemStyle.borderColor ?? semanticColor,
            shadowColor: markPointBase.itemStyle.shadowColor ?? hexToRgba(semanticColor, 0.6)
          }
        }
        if (isPlainObject(markPointBase.label)) {
          markPointBase.label = {
            ...markPointBase.label,
            borderColor: markPointBase.label.borderColor ?? hexToRgba(semanticColor, 0.6),
            textShadowColor: markPointBase.label.textShadowColor ?? hexToRgba(semanticColor, 0.7)
          }
        }
      } else if (isPlainObject(markPointBase.itemStyle)) {
        markPointBase.itemStyle = {
          ...markPointBase.itemStyle,
          borderColor: markPointBase.itemStyle.borderColor ?? fallbackColor,
          shadowColor: markPointBase.itemStyle.shadowColor ?? hexToRgba(fallbackColor, 0.6)
        }
      }
      next.markPoint = markPointBase
    }

    return next
  })
}

export const applyChartTheme = (options: ChartOption = {}) => {
  const theme = buildChartTheme()
  const themed = mergeOptions({ textStyle: theme.textStyle, color: theme.color }, options)

  if (options.tooltip !== undefined) {
    themed.tooltip = applyTooltipTheme(options.tooltip, theme.tooltip)
  }

  if (options.legend !== undefined) {
    themed.legend = applyLegendTheme(options.legend, theme.legend, theme.minLegendSize)
  }

  if (options.xAxis !== undefined) {
    themed.xAxis = applyAxisTheme(options.xAxis, theme.xAxis, theme.minLabelSize)
  }

  if (options.yAxis !== undefined) {
    themed.yAxis = applyAxisTheme(options.yAxis, theme.yAxis, theme.minLabelSize)
  }

  if (options.grid !== undefined) {
    themed.grid = applyGridTheme(options.grid, theme.grid)
  }

  if (options.series !== undefined) {
    themed.series = applySeriesTheme(themed.series, theme)
  }

  return themed
}

// ── 渐变色工厂 ──

/**
 * 创建线性渐变色配置
 * @param color 语义色 key（如 'revenue'）或 hex 值
 * @param direction 渐变方向
 * @param startOpacity 起始透明度（默认 0.3）
 * @param endOpacity 结束透明度（默认 0）
 */
export function createGradient(
  color: string,
  direction: 'vertical' | 'horizontal' = 'vertical',
  startOpacity = 0.3,
  endOpacity = 0
) {
  const hex = (semanticColors as Record<string, string>)[color] || color
  const isVertical = direction === 'vertical'
  const toHexAlpha = (opacity: number) =>
    Math.round(opacity * 255).toString(16).padStart(2, '0')
  return {
    type: 'linear' as const,
    x: 0, y: 0,
    x2: isVertical ? 0 : 1,
    y2: isVertical ? 1 : 0,
    colorStops: [
      { offset: 0, color: hex + toHexAlpha(startOpacity) },
      { offset: 1, color: hex + toHexAlpha(endOpacity) }
    ]
  }
}

// ── 图表预设模板 ──

type ScaleHelper = { scaleNumber: (value: number, min?: number) => number }

export function getBaseGridConfig(scale: ScaleHelper) {
  return {
    top: scale.scaleNumber(24, 20),
    bottom: scale.scaleNumber(24, 20),
    left: scale.scaleNumber(48, 40),
    right: scale.scaleNumber(16, 12),
    containLabel: false
  }
}

export function getBaseTooltipConfig(colors: ReturnType<typeof getThemeColors>, scale: ScaleHelper) {
  return {
    trigger: 'axis' as const,
    backgroundColor: colors.bgPanel,
    borderColor: colors.border,
    textStyle: { color: colors.textPrimary, fontSize: scale.scaleNumber(11, 10) },
    axisPointer: { type: 'line' as const, lineStyle: { color: colors.border } }
  }
}

export function getBaseAxisConfig(colors: ReturnType<typeof getThemeColors>, scale: ScaleHelper) {
  return {
    xAxis: {
      axisLine: { lineStyle: { color: colors.axisLine } },
      axisTick: { show: false },
      axisLabel: { color: colors.textSecondary, fontSize: scale.scaleNumber(11, 10) }
    },
    yAxis: {
      axisLabel: { color: colors.textSecondary, fontSize: scale.scaleNumber(11, 10) },
      splitLine: { lineStyle: { color: colors.splitLine } }
    }
  }
}
