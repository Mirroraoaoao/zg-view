/**
 * 面板交错入场动画 composable
 * 生成每个面板的 animationDelay 样式对象
 */
export function useStaggerAnimation(count: number, baseDelay = 80) {
  return Array.from({ length: count }, (_, i) => ({
    animationDelay: `${i * baseDelay}ms`
  }))
}
