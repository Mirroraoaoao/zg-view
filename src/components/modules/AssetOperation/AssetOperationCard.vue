<template>
  <div class="glass-panel module-card asset-card">
    <div class="card-header">
      <h3>🏢 资产运营与盘活</h3>
    </div>
    
    <div class="content">
      <div class="asset-scale">
         <span class="label">总资产账面价值</span>
         <span class="value">¥ 2,105 <small>亿</small></span>
      </div>
      
      <div class="gauge-section">
         <div class="gauge-chart">
            <svg viewBox="0 0 100 50" class="gauge-svg">
               <!-- Background Arc -->
               <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="10" />
               <!-- Value Arc (Approx 75%) -->
               <path d="M 10 50 A 40 40 0 0 1 80 20" fill="none" stroke="var(--accent-purple)" stroke-width="10" stroke-linecap="round" />
            </svg>
            <div class="gauge-value">
               85%
               <small>出租率</small>
            </div>
         </div>
         <div class="gauge-side-stats">
            <div class="stat">
               <span class="n">98%</span>
               <span class="l">满意度</span>
            </div>
            <div class="stat">
               <span class="n warning">12%</span>
               <span class="l">闲置率</span>
            </div>
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
  border-bottom: 2px solid var(--accent-purple);
  padding-bottom: 5px;
  display: inline-block;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.asset-scale {
  background: rgba(139, 92, 246, 0.1);
  padding: 12px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .label { color: var(--text-secondary); }
  .value { font-size: 1.4rem; font-weight: bold; color: var(--text-primary); }
  small { font-size: 0.9rem; }
}

.gauge-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  .gauge-chart {
    position: relative;
    width: 60%;
    
    .gauge-svg { width: 100%; height: auto; display: block; }
    
    .gauge-value {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      font-weight: bold;
      font-size: 1.2rem;
      line-height: 1;
      
      small { display: block; font-size: 0.6rem; color: var(--text-secondary); font-weight: normal; }
    }
  }
  
  .gauge-side-stats {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-end;
    
    .stat {
       text-align: right;
       .n { display: block; font-weight: bold; font-size: 1.1rem; }
       .l { font-size: 0.7rem; color: var(--text-secondary); }
       .warning { color: var(--accent-gold); }
    }
  }
}
</style>
