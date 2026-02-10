import { ref, watch, onMounted } from 'vue'

/**
 * KPI 数字滚动动画 composable
 * @param target 目标数值的 getter
 * @param duration 动画时长（毫秒）
 * @param decimals 小数位数（默认 0）
 */
export function useCountUp(target: () => number, duration = 1200, decimals = 0) {
  const display = ref<number>(0)

  const animate = (end: number) => {
    const start = display.value
    const startTime = performance.now()
    const factor = Math.pow(10, Math.max(0, decimals))

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      // ease-out 缓动
      const eased = 1 - Math.pow(1 - progress, 3)
      const next = start + (end - start) * eased
      display.value = Math.round(next * factor) / factor
      if (progress < 1) requestAnimationFrame(step)
    }

    // 尊重 prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      display.value = end
    } else {
      requestAnimationFrame(step)
    }
  }

  onMounted(() => animate(target()))
  watch(target, (val) => animate(val))

  return display
}
