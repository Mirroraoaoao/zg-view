<template>
  <div class="skeleton-panel panel">
    <div class="skeleton-bar title"></div>
    <div class="skeleton-bar subtitle"></div>
    <div class="skeleton-block chart"></div>
  </div>
</template>

<style scoped lang="scss">
.skeleton-bar {
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    rgba(90, 204, 255, 0.06) 0%,
    rgba(90, 204, 255, 0.12) 50%,
    rgba(90, 204, 255, 0.06) 100%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s ease-in-out infinite;
}

.skeleton-bar.title {
  width: 40%;
  height: var(--text-sm);
  margin-bottom: var(--space-2);
}

.skeleton-bar.subtitle {
  width: 25%;
  height: var(--text-xs);
  margin-bottom: var(--space-3);
}

.skeleton-block.chart {
  width: 100%;
  height: 180px;
  border-radius: var(--kpi-radius);
  background: linear-gradient(
    90deg,
    rgba(90, 204, 255, 0.04) 0%,
    rgba(90, 204, 255, 0.08) 50%,
    rgba(90, 204, 255, 0.04) 100%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s ease-in-out infinite;
}

@keyframes skeleton-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
