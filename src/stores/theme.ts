import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export type ThemeName = 'dark-space'
export type ColorScheme = 'dark'

export interface ThemeConfig {
  scheme: ColorScheme
  label: string
}

export const useThemeStore = defineStore('theme', () => {
  const themeName = ref<ThemeName>('dark-space')

  const themes: Record<ThemeName, ThemeConfig> = {
    'dark-space': { scheme: 'dark', label: '深空模式' }
  }

  const colorScheme = computed<ColorScheme>(() => 'dark')

  const currentTheme = computed(() => themes[themeName.value])

  const applyTheme = () => {
    const root = document.documentElement
    root.classList.remove('theme-light-professional', 'theme-fintech-dark')
    root.classList.add('theme-dark-space')
    root.style.colorScheme = 'dark'
  }

  const setTheme = (name: ThemeName) => {
    themeName.value = name
    applyTheme()
  }

  const initTheme = () => {
    themeName.value = 'dark-space'
    applyTheme()
  }

  return {
    themeName,
    colorScheme,
    currentTheme,
    themes,
    setTheme,
    initTheme
  }
})
