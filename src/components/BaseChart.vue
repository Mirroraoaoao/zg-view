<template>
  <div ref="chartRef" class="chart-root"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import * as echarts from 'echarts'
import { applyChartTheme } from '../utils/chartTheme'
import { useThemeStore } from '../stores/theme'

const props = defineProps<{
  options: any
}>()

const themeStore = useThemeStore()
const chartRef = ref<HTMLElement | null>(null)
let chart: echarts.ECharts | null = null
let resizeObserver: ResizeObserver | null = null
const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const normalizeOptions = (options: any) => {
  if (prefersReducedMotion && options?.animation === undefined) {
    return {
      ...options,
      animation: false,
      animationDuration: 0,
      animationDurationUpdate: 0
    }
  }
  return options
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
}

const resizeHandler = () => {
  chart?.resize()
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

// 监听主题变化，重新应用图表主题
watch(() => themeStore.themeName, () => {
  nextTick(() => {
    if (chart) {
      // 重新应用主题后的配置
      chart.setOption(applyChartTheme(normalizeOptions(props.options)), true)
    }
  })
})

onMounted(() => {
  // Use nextTick to ensure DOM is fully rendered
  nextTick(() => {
    // Small delay to allow parent containers to establish size
    setTimeout(initChart, 50)
  })

  window.addEventListener('resize', resizeHandler)

  // Use ResizeObserver to handle dynamic size changes
  if (chartRef.value) {
    resizeObserver = new ResizeObserver(() => {
      resizeHandler()
    })
    resizeObserver.observe(chartRef.value)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeHandler)
  resizeObserver?.disconnect()
  chart?.dispose()
})
</script>

<style scoped>
.chart-root {
  width: 100%;
  height: 100%;
}
</style>
