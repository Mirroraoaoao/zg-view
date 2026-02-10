<template>
  <div class="panel-header">
    <h3 class="panel-header__title">
      <slot>{{ title }}</slot>
    </h3>
    <p v-if="subtitle || $slots.subtitle" class="panel-header__subtitle">
      <slot name="subtitle">{{ subtitle }}</slot>
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  subtitle?: string
}>()
</script>

<style scoped lang="scss">
.panel-header {
  margin-bottom: var(--panel-title-gap);
}

.panel-header__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: var(--panel-title-size);
  letter-spacing: var(--panel-title-spacing);
  line-height: 1.2;
  text-transform: uppercase;
  color: var(--text-primary);
  text-shadow: none;
}

.panel-header__subtitle {
  margin: 4px 0 0;
  font-size: var(--panel-subtitle-size);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
}
</style>
