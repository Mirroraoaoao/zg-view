<template>
  <div class="glass-panel module-card project-card">
    <div class="card-header">
      <h3>🚧 业务数据与项目</h3>
    </div>
    
    <div class="content">
      <div class="goal-section">
         <div class="label-row">
            <span>年度经营目标达成率</span>
            <span class="neon-green">88%</span>
         </div>
         <div class="progress-track">
            <div class="progress-fill" style="width: 88%"></div>
         </div>
      </div>
      
      <div class="project-grid">
         <div class="p-item normal">
            <div class="num">124</div>
            <div class="txt">重点项目</div>
         </div>
         <div class="p-item alert">
            <div class="num">5</div>
            <div class="txt">滞后/延期</div>
         </div>
      </div>
      
      <div class="task-info">
         <span class="icon">✅</span>
         <span>年度重点任务完成率: <b>92%</b></span>
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
  border-bottom: 2px solid var(--accent-danger);
  padding-bottom: 5px;
  display: inline-block;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.goal-section {
  .label-row {
     display: flex;
     justify-content: space-between;
     font-size: 0.9rem;
     margin-bottom: 5px;
     color: var(--text-secondary);
     .neon-green { color: var(--accent-green); font-weight: bold; }
  }
  .progress-track {
    width: 100%;
    height: 8px;
    background: rgba(255,255,255,0.1);
    border-radius: 4px;
    overflow: hidden;
    .progress-fill {
       height: 100%;
       background: linear-gradient(90deg, var(--accent-green), var(--accent-cyan));
    }
  }
}

.project-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  
  .p-item {
     text-align: center;
     padding: 10px;
     border-radius: 8px;
     background: rgba(255,255,255,0.03);
     
     .num { font-size: 1.6rem; font-weight: bold; }
     .txt { font-size: 0.8rem; color: var(--text-secondary); }
     
     &.alert {
        background: rgba(239, 68, 68, 0.1);
        border: 1px solid rgba(239, 68, 68, 0.3);
        .num { color: var(--accent-danger); animation: flash 2s infinite; }
        .txt { color: var(--accent-danger); }
     }
  }
}

@keyframes flash {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.task-info {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  padding: 8px;
  background: rgba(255,255,255,0.02);
  border-radius: 6px;
  color: var(--text-secondary);
  b { color: var(--text-primary); margin-left: 5px; }
}
</style>
