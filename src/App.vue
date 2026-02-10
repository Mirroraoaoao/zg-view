<template>
  <router-view v-slot="{ Component, route }">
    <Transition :name="getTransitionName(route)" mode="out-in">
      <component :is="Component" :key="route.path" />
    </Transition>
  </router-view>
</template>

<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from 'vue-router'

function getTransitionName(route: RouteLocationNormalizedLoaded): string {
  return (route.meta.transition as string) || 'fade'
}
</script>

<style scoped>
</style>
