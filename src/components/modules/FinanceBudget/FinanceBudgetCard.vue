<template>
  <div class="glass-panel module-card finance-card">
    <div class="card-header">
      <h3>📈 财务与预算监测</h3>
    </div>
    
    <div class="content">
      <!-- Budget Ring Chart Area -->
      <div class="chart-section">
         <div class="ring-chart-container">
            <div class="ring-chart">
               <span class="center-text">85%<small>预算进度</small></span>
            </div>
         </div>
         <div class="chart-legend">
            <div class="item"><span class="dot spent"></span>已用</div>
            <div class="item"><span class="dot remain"></span>剩余</div>
         </div>
      </div>

      <div class="metrics-grid">
         <div class="mini-stat">
            <div class="label">营收利润率</div>
            <div class="value neon-cyan">18.4%</div>
            <div class="trend up">↑ 2.1%</div>
         </div>
         <div class="mini-stat">
            <div class="label">资产负债率</div>
            <div class="value neon-warning">45.2%</div>
            <div class="trend down">↓ 0.5%</div>
         </div>
         <div class="mini-stat">
            <div class="label">综合税负率</div>
            <div class="value">6.8%</div>
         </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.module-card {
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
}

.card-header h3 {
  margin: 0 0 15px 0;
  font-size: 1.1rem;
  color: var(--text-highlight);
  border-bottom: 2px solid var(--accent-cyan);
  padding-bottom: 5px;
  display: inline-block;
}

.content {
  flex: 1;
  display: flex;
  gap: 15px;
}

.chart-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.ring-chart {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: conic-gradient(var(--accent-cyan) 0% 85%, rgba(255,255,255,0.1) 85% 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::after {
    content: '';
    position: absolute;
    width: 80px;
    height: 80px;
    background: var(--bg-color); /* Match card bg roughly or transparent */
    background: #131b2e; /* Hardcoded to match dark feel */
    border-radius: 50%;
  }
  
  .center-text {
    position: relative;
    z-index: 2;
    font-weight: bold;
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1;
    small { font-size: 0.6rem; color: var(--text-secondary); margin-top: 2px; }
  }
}

.metrics-grid {
  flex: 1.2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  .mini-stat {
    background: rgba(255,255,255,0.05);
    padding: 8px 12px;
    border-radius: 6px;
    position: relative;
    
    .label { font-size: 0.8rem; color: var(--text-secondary); }
    .value { font-size: 1.2rem; font-weight: bold; margin: 4px 0; }
    .trend { font-size: 0.75rem; position: absolute; right: 10px; top: 10px; }
    .up { color: var(--accent-green); }
    .down { color: var(--accent-green); } /* Down is good for liability usually, or bad? Green usually good. */
    
    .neon-cyan { color: var(--accent-cyan); }
    .neon-warning { color: var(--accent-gold); }
  }
}
</style>
