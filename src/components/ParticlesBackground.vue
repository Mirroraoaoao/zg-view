<template>
  <div class="particles-container">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const props = withDefaults(defineProps<{ particleCount?: number; connectionDistance?: number }>(), {
  particleCount: 80,
  connectionDistance: 140
})

const canvas = ref<HTMLCanvasElement | null>(null)
let animationFrameId = 0
let resizeHandler: (() => void) | null = null
let particles: Particle[] = []
let ctx: CanvasRenderingContext2D | null = null
let w = 0
let h = 0
let shouldAnimate = true
let connectionDistance = 140

// 缓存颜色和渐变，避免每帧 DOM 查询
let cachedParticleColor = ''
let cachedParticleRgb = ''
let cachedGradient: CanvasGradient | null = null

const cacheColors = () => {
  const style = getComputedStyle(document.documentElement)
  const rgb = style.getPropertyValue('--particles-color').trim() || '90, 204, 255'
  const bgStart = style.getPropertyValue('--particles-bg-start').trim() || '#0a0f1a'
  const bgEnd = style.getPropertyValue('--particles-bg-end').trim() || '#0b1626'
  cachedParticleRgb = rgb
  cachedParticleColor = `rgba(${rgb}, 0.35)`
  if (ctx) {
    cachedGradient = ctx.createLinearGradient(0, 0, 0, h)
    cachedGradient.addColorStop(0, bgStart)
    cachedGradient.addColorStop(1, bgEnd)
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

  ctx.clearRect(0, 0, w, h)

  // 绘制缓存的背景渐变
  if (cachedGradient) {
    ctx.fillStyle = cachedGradient
    ctx.fillRect(0, 0, w, h)
  }

  // 绘制粒子和连线
  particles.forEach((p, i) => {
    if (shouldAnimate) p.update(w, h)
    p.draw(ctx!, cachedParticleColor)

    for (let j = i + 1; j < particles.length; j += 1) {
      const p2 = particles[j]
      const dx = p.x - p2.x
      const dy = p.y - p2.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < connectionDistance) {
        ctx!.strokeStyle = `rgba(${cachedParticleRgb}, ${0.16 - dist / 1000})`
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

  // 缓存颜色和渐变
  cacheColors()

  // 开始渲染
  renderFrame()
}

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

    // 重建渐变（高度变化）
    cacheColors()

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
