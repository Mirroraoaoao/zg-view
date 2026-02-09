import { ref, onMounted, onUnmounted } from 'vue'

/**
 * 基于 1920px 基准宽度的响应式缩放 composable
 * 缩放范围: 1.0 - 1.9
 */
export const useResponsiveScale = () => {
  const scale = ref(1)

  const updateScale = () => {
    scale.value = Math.min(1.9, Math.max(1, window.innerWidth / 1920))
  }

  const scaleNumber = (value: number, min = value) =>
    Math.max(min, Math.round(value * scale.value))

  const scaleFloat = (value: number, min = value) =>
    Math.max(min, Math.round(value * scale.value * 10) / 10)

  onMounted(() => {
    updateScale()
    window.addEventListener('resize', updateScale)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateScale)
  })

  return { scale, updateScale, scaleNumber, scaleFloat }
}
