<template>
  <div class="particles-container">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useThemeStore } from '../stores/theme'

const props = withDefaults(defineProps<{ particleCount?: number; connectionDistance?: number }>(), {
  particleCount: 80,
  connectionDistance: 140
})

const themeStore = useThemeStore()
const canvas = ref<HTMLCanvasElement | null>(null)
let animationFrameId = 0
let resizeHandler: (() => void) | null = null
let particles: Particle[] = []
let ctx: CanvasRenderingContext2D | null = null
let w = 0
let h = 0
let shouldAnimate = true
let connectionDistance = 140

// 从 CSS 变量获取主题色
const getThemeColors = () => {
  const style = getComputedStyle(document.documentElement)
  return {
    enabled: style.getPropertyValue('--particles-enabled').trim() !== '0',
    particles: style.getPropertyValue('--particles-color').trim() || '90, 204, 255',
    bgStart: style.getPropertyValue('--particles-bg-start').trim() || '#0a0f1a',
    bgEnd: style.getPropertyValue('--particles-bg-end').trim() || '#0b1626'
  }
}

class Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number

  constructor(width: number, height: number) {
    this.x = Math.random() * width
    this.y = Math.random() * height
    this.vx = (Math.random() - 0.5) * 0.45
    this.vy = (Math.random() - 0.5) * 0.45
    this.size = Math.random() * 1.6 + 0.4
  }

  update(width: number, height: number) {
    this.x += this.vx
    this.y += this.vy
    if (this.x < 0 || this.x > width) this.vx *= -1
    if (this.y < 0 || this.y > height) this.vy *= -1
  }

  draw(context: CanvasRenderingContext2D, color: string) {
    context.fillStyle = color
    context.beginPath()
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    context.fill()
  }
}

const renderFrame = () => {
  if (!ctx) return

  const colors = getThemeColors()

  ctx.clearRect(0, 0, w, h)

  // 绘制背景渐变
  const grd = ctx.createLinearGradient(0, 0, 0, h)
  grd.addColorStop(0, colors.bgStart)
  grd.addColorStop(1, colors.bgEnd)
  ctx.fillStyle = grd
  ctx.fillRect(0, 0, w, h)

  // 如果粒子被禁用，只绘制背景
  if (!colors.enabled) {
    return
  }

  const particleColor = `rgba(${colors.particles}, 0.35)`

  // 绘制粒子和连线
  particles.forEach((p, i) => {
    if (shouldAnimate) p.update(w, h)
    p.draw(ctx!, particleColor)

    for (let j = i + 1; j < particles.length; j += 1) {
      const p2 = particles[j]
      const dx = p.x - p2.x
      const dy = p.y - p2.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < connectionDistance) {
        ctx!.strokeStyle = `rgba(${colors.particles}, ${0.16 - dist / 1000})`
        ctx!.lineWidth = 0.5
        ctx!.beginPath()
        ctx!.moveTo(p.x, p.y)
        ctx!.lineTo(p2.x, p2.y)
        ctx!.stroke()
      }
    }
  })

  if (shouldAnimate) {
    animationFrameId = requestAnimationFrame(renderFrame)
  }
}

const initParticles = () => {
  const cvs = canvas.value
  if (!cvs) return

  ctx = cvs.getContext('2d')
  if (!ctx) return

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const particleCount = prefersReducedMotion ? Math.round(props.particleCount * 0.4) : props.particleCount
  connectionDistance = prefersReducedMotion ? Math.round(props.connectionDistance * 0.4) : props.connectionDistance
  shouldAnimate = !prefersReducedMotion

  w = cvs.width = window.innerWidth
  h = cvs.height = window.innerHeight

  // 重新创建粒子
  particles = []
  for (let i = 0; i < particleCount; i += 1) {
    particles.push(new Particle(w, h))
  }

  // 取消之前的动画帧
  cancelAnimationFrame(animationFrameId)

  // 开始渲染
  renderFrame()
}

// 监听主题变化，重新渲染
watch(() => themeStore.themeName, () => {
  // 主题变化时，需要等待浏览器重新计算样式后再读取 CSS 变量
  // 使用双重 requestAnimationFrame 确保样式已更新
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (ctx) {
        // 无论动画是否运行，都强制重绘一帧以更新背景色
        renderFrame()
      }
    })
  })
})

onMounted(() => {
  // 延迟初始化，确保布局已完成
  requestAnimationFrame(() => {
    initParticles()
  })

  resizeHandler = () => {
    const cvs = canvas.value
    if (!cvs) return

    w = cvs.width = window.innerWidth
    h = cvs.height = window.innerHeight

    if (!shouldAnimate) {
      renderFrame()
    }
  }

  window.addEventListener('resize', resizeHandler)
})

onUnmounted(() => {
  if (resizeHandler) window.removeEventListener('resize', resizeHandler)
  cancelAnimationFrame(animationFrameId)
})
</script>

<style scoped>
.particles-container {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}
</style>
