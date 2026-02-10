<template>
  <div class="sub-tabs" ref="tabsRef" role="tablist" aria-label="数据标签页">
    <div
      v-for="(tab, index) in tabs"
      :key="index"
      :ref="el => setTabRef(index, el)"
      class="tab-item"
      :class="{ active: modelValue === tab.value }"
      role="tab"
      :aria-selected="modelValue === tab.value"
      :tabindex="modelValue === tab.value ? 0 : -1"
      @click="$emit('update:modelValue', tab.value)"
      @keydown.enter="$emit('update:modelValue', tab.value)"
      @keydown.space.prevent="$emit('update:modelValue', tab.value)"
      @keydown.right.prevent="focusTab(index, 1)"
      @keydown.left.prevent="focusTab(index, -1)"
    >
      {{ tab.label }}
    </div>
    <!-- 滑动指示条 -->
    <div class="active-bar" :style="barStyle"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'

const props = defineProps<{ modelValue: string; tabs: { label: string; value: string }[] }>()
const emit = defineEmits(['update:modelValue'])

const tabsRef = ref<HTMLElement | null>(null)
const tabRefs: Record<number, HTMLElement | null> = {}

const setTabRef = (index: number, el: any) => {
  tabRefs[index] = el as HTMLElement | null
}

const activeIndex = computed(() =>
  props.tabs.findIndex(t => t.value === props.modelValue)
)

const barStyle = ref<Record<string, string>>({
  opacity: '0',
  width: '0px',
  transform: 'translateX(0px)'
})

const updateBar = () => {
  const idx = activeIndex.value
  const el = tabRefs[idx]
  if (!el || !tabsRef.value) {
    barStyle.value = { opacity: '0', width: '0px', transform: 'translateX(0px)' }
    return
  }
  const parentLeft = tabsRef.value.getBoundingClientRect().left + tabsRef.value.scrollLeft
  const elRect = el.getBoundingClientRect()
  barStyle.value = {
    opacity: '1',
    width: `${elRect.width}px`,
    transform: `translateX(${elRect.left - parentLeft + tabsRef.value.scrollLeft}px)`
  }
}

const focusTab = (currentIndex: number, direction: number) => {
  const nextIndex = (currentIndex + direction + props.tabs.length) % props.tabs.length
  const nextEl = tabRefs[nextIndex]
  if (nextEl) {
    nextEl.focus()
    emit('update:modelValue', props.tabs[nextIndex].value)
  }
}

watch(() => props.modelValue, () => nextTick(updateBar))
onMounted(() => nextTick(updateBar))

// 监听容器尺寸变化
let resizeObs: ResizeObserver | null = null
onMounted(() => {
  if (tabsRef.value) {
    resizeObs = new ResizeObserver(() => updateBar())
    resizeObs.observe(tabsRef.value)
  }
})
onUnmounted(() => resizeObs?.disconnect())
</script>

<style scoped lang="scss">
.sub-tabs {
  display: flex;
  gap: var(--space-3);
  padding: 0 var(--space-1) var(--space-1);
  border-bottom: 1px solid rgba(90, 204, 255, 0.15);
  overflow-x: auto;
  position: relative;
}

.tab-item {
  padding: var(--space-1) 0;
  font-family: var(--font-display);
  font-size: var(--text-sm);
  letter-spacing: 0.16em;
  color: var(--text-muted);
  cursor: pointer;
  position: relative;
  text-transform: uppercase;
  transition: var(--transition-color);
  white-space: nowrap;
}

.tab-item:hover {
  color: var(--text-primary);
}

.tab-item.active {
  color: var(--accent-cyan);
}

.active-bar {
  position: absolute;
  bottom: -1px;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, rgba(54, 241, 205, 0.9), rgba(90, 204, 255, 0.9));
  border-radius: 999px;
  box-shadow: 0 0 12px rgba(54, 241, 205, 0.4);
  transition:
    transform var(--transition-normal) var(--ease-default),
    width var(--transition-normal) var(--ease-default),
    opacity var(--transition-normal) var(--ease-default);
  pointer-events: none;
}
</style>
