<template>
  <div class="sub-tabs">
    <div
      v-for="(tab, index) in tabs"
      :key="index"
      class="tab-item"
      :class="{ active: modelValue === tab.value }"
      role="tab"
      tabindex="0"
      @click="$emit('update:modelValue', tab.value)"
      @keydown.enter="$emit('update:modelValue', tab.value)"
      @keydown.space.prevent="$emit('update:modelValue', tab.value)"
    >
      {{ tab.label }}
      <div class="active-bar" v-if="modelValue === tab.value"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ modelValue: string; tabs: { label: string; value: string }[] }>()

defineEmits(['update:modelValue'])
</script>

<style scoped lang="scss">
.sub-tabs {
  display: flex;
  gap: 18px;
  padding: 0 8px 8px;
  border-bottom: 1px solid rgba(90, 204, 255, 0.15);
  overflow-x: auto;
}

.tab-item {
  padding: 8px 0;
  font-family: var(--font-display);
  font-size: 0.9rem;
  letter-spacing: 0.16em;
  color: var(--text-muted);
  cursor: pointer;
  position: relative;
  text-transform: uppercase;
  transition: color 0.2s ease;
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
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, rgba(54, 241, 205, 0.9), rgba(90, 204, 255, 0.9));
  border-radius: 999px;
  box-shadow: 0 0 12px rgba(54, 241, 205, 0.4);
}
</style>
