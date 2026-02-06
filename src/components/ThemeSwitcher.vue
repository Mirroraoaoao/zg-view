<template>
  <div class="theme-switcher" ref="switcherRef">
    <button
      class="theme-trigger"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      aria-label="切换主题"
      @click="toggleOpen"
    >
      <span class="trigger-icon" :class="`icon-${themeStore.themeName}`"></span>
      <span class="trigger-label">{{ currentThemeLabel }}</span>
      <svg
        class="trigger-arrow"
        :class="{ open: isOpen }"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>

    <Transition name="dropdown">
      <div v-if="isOpen" class="theme-dropdown" role="listbox">
        <button
          v-for="(config, name) in themeStore.themes"
          :key="name"
          class="theme-option"
          :class="{ active: themeStore.themeName === name }"
          role="option"
          :aria-selected="themeStore.themeName === name"
          @click="selectTheme(name as ThemeName)"
        >
          <span class="option-icon" :class="`icon-${name}`"></span>
          <span class="option-label">{{ config.label }}</span>
          <svg
            v-if="themeStore.themeName === name"
            class="option-check"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useThemeStore, type ThemeName } from '../stores/theme'

const themeStore = useThemeStore()
const switcherRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)

const currentThemeLabel = computed(() => {
  return themeStore.themes[themeStore.themeName]?.label || '主题'
})

const toggleOpen = () => {
  isOpen.value = !isOpen.value
}

const selectTheme = (name: ThemeName) => {
  themeStore.setTheme(name)
  isOpen.value = false
}

// 点击外部关闭下拉菜单
const handleClickOutside = (e: MouseEvent) => {
  if (switcherRef.value && !switcherRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

// ESC 键关闭
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isOpen.value) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped lang="scss">
.theme-switcher {
  position: relative;
  z-index: 100;
}

.theme-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border: 1px solid var(--panel-border);
  border-radius: 8px;
  background: var(--bg-panel);
  color: var(--text-secondary);
  font-size: 0.75rem;
  font-family: var(--font-display);
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--accent-cyan);
    color: var(--text-primary);
  }

  &:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
    border-color: var(--focus-border);
  }
}

.trigger-icon,
.option-icon {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.2);

  &.icon-dark-space {
    background: linear-gradient(135deg, #070d16 30%, #5accff 100%);
  }

  &.icon-light-professional {
    background: linear-gradient(135deg, #f8fafc 30%, #2563eb 100%);
  }

  &.icon-fintech-dark {
    background: linear-gradient(135deg, #0f172a 30%, #f59e0b 100%);
  }
}

.trigger-arrow {
  opacity: 0.6;
  transition: transform 0.2s ease;

  &.open {
    transform: rotate(180deg);
  }
}

.theme-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 160px;
  padding: 6px;
  background: var(--bg-panel-strong);
  border: 1px solid var(--panel-border);
  border-radius: 10px;
  box-shadow: var(--shadow-soft);
  z-index: 1000;
}

.theme-option {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--text-secondary);
  font-size: 0.8rem;
  font-family: var(--font-body);
  text-align: left;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: var(--table-row-hover);
    color: var(--text-primary);
  }

  &:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }

  &.active {
    background: rgba(54, 241, 205, 0.12);
    color: var(--accent-cyan);
  }
}

.option-check {
  margin-left: auto;
  color: var(--accent-cyan);
}

// 下拉动画
.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
