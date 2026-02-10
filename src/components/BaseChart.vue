<template>
  <div
    ref="chartRef"
    class="chart-root"
    :class="{ 'is-ready': isReady }"
    :style="rootStyle"
    role="img"
    :aria-label="ariaLabel"
  ></div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import * as echarts from 'echarts'
import { applyChartTheme } from '../utils/chartTheme'

const props = withDefaults(defineProps<{
  options: any
  group?: string
  ariaLabel?: string
  enter?: boolean
  enterDelay?: number
}>(), {
  enter: true,
  ariaLabel: '数据图表',
  enterDelay: 0
})

const chartRef = ref<HTMLElement | null>(null)
let chart: echarts.ECharts | null = null
let resizeObserver: ResizeObserver | null = null
const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const isReady = ref(!props.enter || prefersReducedMotion)
const rootStyle = computed<Record<string, string>>(() => ({
  transitionDelay: `${Math.max(0, props.enterDelay || 0)}ms`
}))

const normalizeOptions = (options: any) => {
  // 为所有图表提供一致的默认动画参数（不覆盖用户显式传入的 animation 配置）。
  // prefers-reduced-motion 下会被强制禁用。
  const withDefaultAnimation = (input: any) => {
    if (!input || typeof input !== 'object') return input
    if (input.animation !== undefined) return input
    return {
      ...input,
      animation: true,
      animationDuration: 650,
      animationEasing: 'cubicOut',
      animationDurationUpdate: 450,
      animationEasingUpdate: 'cubicOut'
    }
  }

  if (prefersReducedMotion && options?.animation === undefined) {
    return {
      ...options,
      animation: false,
      animationDuration: 0,
      animationDurationUpdate: 0
    }
  }
  return withDefaultAnimation(options)
}

const initChart = () => {
  if (!chartRef.value) return

  // Check if container has valid dimensions
  const { clientWidth, clientHeight } = chartRef.value
  if (clientWidth <= 0 || clientHeight <= 0) {
    // Retry after a short delay
    setTimeout(initChart, 100)
    return
  }

  if (chart) {
    chart.dispose()
  }

  chart = echarts.init(chartRef.value)
  chart.setOption(applyChartTheme(normalizeOptions(props.options)), true)

  // 入场动效：保持尺寸不变，仅做透明度/位移动效，避免布局抖动
  if (props.enter && !prefersReducedMotion) {
    isReady.value = false
    requestAnimationFrame(() => { isReady.value = true })
  } else {
    isReady.value = true
  }

  // 图表联动
  if (props.group && chart) {
    chart.group = props.group
    echarts.connect(props.group)
  }
}

let resizeTimer = 0
const resizeHandler = () => {
  clearTimeout(resizeTimer)
  resizeTimer = window.setTimeout(() => { chart?.resize() }, 100)
}

// 监听 options 变化
watch(() => props.options, (newOptions) => {
  if (chart) {
    chart.setOption(applyChartTheme(normalizeOptions(newOptions)), true)
  } else {
    // If chart doesn't exist yet, try to initialize
    nextTick(initChart)
  }
}, { deep: true })

onMounted(() => {
  // Use nextTick to ensure DOM is fully rendered
  nextTick(() => {
    // Small delay to allow parent containers to establish size
    setTimeout(initChart, 50)
  })

  // Use ResizeObserver to handle all size changes (including window resize)
  if (chartRef.value) {
    resizeObserver = new ResizeObserver(() => {
      resizeHandler()
    })
    resizeObserver.observe(chartRef.value)
  }
})

onUnmounted(() => {
  clearTimeout(resizeTimer)
  resizeObserver?.disconnect()
  chart?.dispose()
})
</script>

<style scoped>
.chart-root {
  width: 100%;
  height: 100%;
  opacity: 0;
  transform: translateY(6px) scale(0.99);
  transition:
    opacity var(--transition-slow) var(--ease-smooth),
    transform var(--transition-slow) var(--ease-smooth);
}

.chart-root.is-ready {
  opacity: 1;
  transform: none;
}
</style>
