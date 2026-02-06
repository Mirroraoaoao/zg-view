<template>
  <div class="glass-panel module-card treasury-card">
    <div class="card-header">
      <h3>🏛️ 资金与投资管理</h3>
    </div>
    
    <div class="content">
       <div class="capital-pool">
          <div class="pool-icon">💰</div>
          <div class="pool-info">
             <div class="label">集团资金池余额</div>
             <div class="value">¥ 482.5 <small>亿</small></div>
             <div class="sub-val">归集率: <span class="highlight">92% ↑</span></div>
          </div>
       </div>
       
       <div class="investment-stats">
          <div class="stat-row">
             <div class="row-header">
                <span>年度投资计划</span>
                <span>75%</span>
             </div>
             <div class="progress-bar">
                <div class="fill" style="width: 75%"></div>
             </div>
          </div>
          
          <div class="stat-grid">
             <div class="stat-item">
                <div class="val">12</div>
                <div class="lbl">在投项目</div>
             </div>
             <div class="stat-item">
                <div class="val gold">8.4%</div>
                <div class="lbl">综合 IRR</div>
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
  border-bottom: 2px solid var(--accent-gold);
  padding-bottom: 5px;
  display: inline-block;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.capital-pool {
  background: linear-gradient(90deg, rgba(245, 158, 11, 0.1), transparent);
  padding: 15px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 15px;
  border-left: 4px solid var(--accent-gold);
  
  .pool-icon { font-size: 2rem; }
  .pool-info {
    .label { font-size: 0.9rem; color: var(--text-secondary); }
    .value { font-size: 1.8rem; font-weight: bold; color: var(--text-primary); }
    small { font-size: 0.9rem; color: var(--text-secondary); }
    .sub-val { font-size: 0.8rem; margin-top: 4px; }
    .highlight { color: var(--accent-green); font-weight: bold; }
  }
}

.investment-stats {
  margin-top: 10px;
  
  .stat-row {
     margin-bottom: 15px;
     .row-header {
       display: flex;
       justify-content: space-between;
       font-size: 0.85rem;
       margin-bottom: 5px;
       color: var(--text-secondary);
     }
     .progress-bar {
       width: 100%;
       height: 6px;
       background: rgba(255,255,255,0.1);
       border-radius: 3px;
       overflow: hidden;
       .fill {
         height: 100%;
         background: var(--accent-gold);
         box-shadow: 0 0 10px var(--accent-gold);
       }
     }
  }
  
  .stat-grid {
    display: flex;
    justify-content: space-between;
    .stat-item {
      text-align: center;
      background: rgba(0,0,0,0.2);
      padding: 10px;
      border-radius: 8px;
      min-width: 45%;
      
      .val { font-size: 1.4rem; font-weight: bold; }
      .gold { color: var(--accent-gold); }
      .lbl { font-size: 0.8rem; color: var(--text-secondary); margin-top: 2px; }
    }
  }
}
</style>
