<template>
  <div class="glass-panel module-card general-card">
    <div class="card-header">
      <h2>🌐 集团综合态势</h2>
      <div class="alert-bubble" v-if="alertCount > 0">
        <span class="pulse"></span>
        {{ alertCount }} 条预警
      </div>
    </div>
    
    <div class="main-metrics">
      <div class="metric-box large">
         <div class="label">年度总营收</div>
         <div class="value neon-blue">¥ 1,452.8 <small>亿</small></div>
      </div>
      <div class="metric-box large">
         <div class="label">利润总额</div>
         <div class="value neon-gold">¥ 328.5 <small>亿</small></div>
      </div>
    </div>

    <!-- Map Placeholder / Central Visual -->
    <div class="central-visual">
       <div class="map-circle">
          <div class="radar-scan"></div>
          <span class="map-label">Global Presence</span>
       </div>
    </div>

    <div class="sub-metrics">
       <div class="metric-row">
          <span class="metric-label">净资产收益率 (ROE)</span>
          <span class="metric-val text-up">12.5% ↑</span>
       </div>
       <div class="metric-row">
          <span class="metric-label">全员劳动生产率</span>
          <span class="metric-val">85.4 万/人</span>
       </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const alertCount = ref(3) // Mock data
</script>

<style scoped lang="scss">
.module-card {
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  background: rgba(10, 20, 40, 0.6); /* Slightly darker for contrast */
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  h2 {
    margin: 0;
    font-size: 1.4rem;
    color: var(--text-highlight);
    text-shadow: 0 0 10px var(--accent-blue);
  }
}

.alert-bubble {
  background: var(--accent-danger);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  
  .pulse {
    width: 8px;
    height: 8px;
    background: white;
    border-radius: 50%;
    animation: pulse-anim 1s infinite;
  }
}

@keyframes pulse-anim {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(2); opacity: 0; }
}

.main-metrics {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  
  .metric-box {
    text-align: center;
    .label { font-size: 1rem; color: var(--text-secondary); margin-bottom: 5px; }
    .value { font-size: 2.2rem; font-weight: 800; font-family: 'Segoe UI', sans-serif; }
    .neon-blue { color: var(--accent-cyan); text-shadow: 0 0 10px rgba(6, 182, 212, 0.5); }
    .neon-gold { color: var(--accent-gold); text-shadow: 0 0 10px rgba(245, 158, 11, 0.5); }
    
    small { font-size: 1rem; opacity: 0.8; }
  }
}

.central-visual {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  .map-circle {
    width: 200px;
    height: 200px;
    border: 2px dashed rgba(255,255,255,0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%);
    
    .map-label { font-weight: bold; letter-spacing: 2px; color: var(--accent-blue); }
    
    .radar-scan {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      border-radius: 50%;
      border-top: 2px solid var(--accent-cyan);
      background: linear-gradient(180deg, rgba(6,182,212,0.2) 0%, transparent 50%);
      animation: scan 4s linear infinite;
    }
  }
}

@keyframes scan {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.sub-metrics {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  .metric-row {
    background: rgba(255,255,255,0.03);
    padding: 10px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .metric-label { font-size: 0.9rem; color: var(--text-secondary); }
    .metric-val { font-weight: bold; font-size: 1.1rem; }
    .text-up { color: var(--accent-green); }
  }
}
</style>
