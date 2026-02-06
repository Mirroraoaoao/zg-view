<template>
  <SubScreenLayout title="业务数据" subtitle="Business Metrics" meta="数据更新时间 08:30">
    <div class="operation-grid">
      <section class="panel investment-panel">
        <h3 class="panel-title">L1：产业招商</h3>
        <div class="investment-kpis">
          <div class="investment-kpi">
            <div class="kpi-header">
              <span class="kpi-label">合作区重大项目招引（新招引、累计招引）</span>
              <span class="kpi-badge">合作区</span>
            </div>
            <div class="kpi-value">新 {{ operationData.investment.hengqin.newProjects }} / 累计 {{ operationData.investment.hengqin.totalProjects }}</div>
          </div>
          <div class="investment-kpi">
            <div class="kpi-header">
              <span class="kpi-label">珠海市重大项目招引（新招引、累计招引）</span>
              <span class="kpi-badge zhuhai">珠海</span>
            </div>
            <div class="kpi-value">新 {{ operationData.investment.zhuhai.newProjects }} / 累计 {{ operationData.investment.zhuhai.totalProjects }}</div>
          </div>
          <div class="investment-kpi highlight">
            <div class="kpi-label">合作区招引企业税收贡献</div>
            <div class="kpi-value large">{{ operationData.investment.hengqin.taxContribution }}</div>
          </div>
          <div class="investment-kpi">
            <div class="kpi-label">珠海招引企业税收贡献</div>
            <div class="kpi-value large">{{ operationData.investment.zhuhai.taxContribution }}</div>
          </div>
        </div>
      </section>

      <section class="panel industry-panel">
        <h3 class="panel-title">L2：工业产值与新增签约面积（按载体）</h3>
        <div class="industry-main">
          <div class="industry-kpi primary">
            <div class="industry-label">工业产值</div>
            <div class="industry-value">{{ operationData.investment.industrialOutput }}</div>
          </div>
        </div>
        <div class="signed-area">
          <div class="signed-title">新增签约面积（按载体）</div>
          <div class="signed-list">
            <div class="signed-item">
              <span>园区</span>
              <strong>{{ operationData.investment.newSignedArea.park }}</strong>
            </div>
            <div class="signed-item">
              <span>厂房</span>
              <strong>{{ operationData.investment.newSignedArea.factory }}</strong>
            </div>
            <div class="signed-item">
              <span>办公</span>
              <strong>{{ operationData.investment.newSignedArea.office }}</strong>
            </div>
          </div>
        </div>
      </section>

      <section class="panel risk-panel">
        <h3 class="panel-title">L1：风险应对</h3>
        <div class="risk-list">
          <div class="risk-item warning">
            <div class="risk-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <div class="risk-info">
              <div class="risk-label">诉讼项目数量</div>
              <div class="risk-value">{{ operationData.risk.lawsuitCount }} 项</div>
            </div>
          </div>
          <div class="risk-item">
            <div class="risk-icon loss">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <div class="risk-info">
              <div class="risk-label">投资亏损金额</div>
              <div class="risk-value">{{ operationData.risk.investmentLoss }}</div>
            </div>
          </div>
          <div class="risk-item">
            <div class="risk-icon impairment">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              </svg>
            </div>
            <div class="risk-info">
              <div class="risk-label">资产减值金额</div>
              <div class="risk-value">{{ operationData.risk.assetImpairment }}</div>
            </div>
          </div>
          <div class="risk-item">
            <div class="risk-icon safety">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div class="risk-info">
              <div class="risk-label">其他经营类风险（安全风险）</div>
              <div class="risk-value">{{ operationData.risk.safetyRisk }}</div>
            </div>
          </div>
        </div>
      </section>

      <section class="panel construction-panel">
        <h3 class="panel-title">L1：投资情况</h3>
        <div class="construction-main">
          <div class="construction-kpi">
            <div class="construction-label">固定资产投资完成情况</div>
            <div class="construction-value">{{ operationData.fixedAssetInvestment.completed }}</div>
            <div class="construction-rate">
              <div class="progress">
                <div class="progress-bar" :style="{ width: operationData.fixedAssetInvestment.rate }"></div>
              </div>
              <span>完成率 {{ operationData.fixedAssetInvestment.rate }}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="panel hr-panel">
        <h3 class="panel-title">L1：人力</h3>
        <div class="hr-kpis">
          <div class="hr-kpi">
            <div class="hr-label">人均产出</div>
            <div class="hr-value">{{ operationData.hrBusiness.perCapitaOutput }}</div>
          </div>
          <div class="hr-kpi">
            <div class="hr-label">在岗人数</div>
            <div class="hr-value">{{ operationData.hrBusiness.headcount }}</div>
          </div>
        </div>
      </section>

      <section class="panel fund-panel">
        <h3 class="panel-title">L1：资金情况</h3>
        <div class="fund-list">
          <div class="fund-item">
            <span>资金整体情况</span>
            <strong class="stable">{{ operationData.fundStatus.overall }}</strong>
          </div>
          <div class="fund-item">
            <span>融资情况</span>
            <strong>{{ operationData.fundStatus.financing }}</strong>
          </div>
          <div class="fund-item highlight">
            <span>有息负债余额</span>
            <strong>{{ operationData.fundStatus.interestBearingDebt }}</strong>
          </div>
        </div>
      </section>

      <section class="panel summary-panel">
        <h3 class="panel-title">L1：资产运营情况</h3>
        <table class="data-table">
          <thead>
            <tr>
              <th>项目名称</th>
              <th>已售面积</th>
              <th>去化率</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in operationData.assetOperations.projectSales" :key="item.name">
              <td>{{ item.name }}</td>
              <td>{{ item.sold }}</td>
              <td>{{ item.rate }}</td>
            </tr>
          </tbody>
        </table>
        <div class="asset-total">
          <span>本年度已盘活资产规模</span>
          <strong>{{ operationData.assetOperations.revitalizedAssets }}</strong>
        </div>
      </section>
    </div>
  </SubScreenLayout>
</template>

<script setup lang="ts">
import SubScreenLayout from '../components/SubScreenLayout.vue'
import { operationData } from '../data/mockDashboard'
</script>

<style scoped lang="scss">
.operation-grid {
  width: 100%;
  height: 100%;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1.12fr) minmax(0, 0.9fr) minmax(0, 0.98fr);
  grid-template-rows: repeat(3, minmax(0, 1fr));
  grid-template-areas:
    'investment industry risk'
    'investment construction fund'
    'summary summary hr';
  gap: 14px;
}

.investment-panel {
  grid-area: investment;
}

.industry-panel {
  grid-area: industry;
}

.risk-panel {
  grid-area: risk;
}

.construction-panel {
  grid-area: construction;
}

.hr-panel {
  grid-area: hr;
}

.fund-panel {
  grid-area: fund;
}

.summary-panel {
  grid-area: summary;
}

.investment-panel,
.industry-panel,
.risk-panel,
.construction-panel,
.hr-panel,
.fund-panel,
.summary-panel {
  min-height: 0;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  background:
    radial-gradient(108% 72% at 0% 100%, rgba(54, 241, 205, 0.08), transparent 58%),
    radial-gradient(92% 68% at 100% 0%, rgba(90, 204, 255, 0.1), transparent 60%),
    var(--bg-panel);
}

.summary-panel {
  grid-template-rows: auto minmax(0, 1fr) auto;
}

.panel-title {
  font-size: 0.76rem;
  letter-spacing: 0.08em;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.investment-kpis {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 10px;
  min-height: 0;
}

.investment-kpi {
  padding: 12px 14px;
  border-radius: 12px;
  background: var(--subscreen-subcard-bg);
  border: 1px solid rgba(90, 204, 255, 0.1);
  min-height: 0;
  display: grid;
  align-content: center;
}

.investment-kpi.highlight {
  border-color: rgba(54, 241, 205, 0.3);
  background: linear-gradient(135deg, rgba(54, 241, 205, 0.12) 0%, rgba(90, 204, 255, 0.05) 100%);
  box-shadow: inset 0 0 16px rgba(54, 241, 205, 0.08);
}

.kpi-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.kpi-label {
  font-size: 0.65rem;
  color: var(--text-muted);
  line-height: 1.35;
}

.kpi-badge {
  font-size: 0.55rem;
  padding: 2px 8px;
  border-radius: 10px;
  background: rgba(54, 241, 205, 0.15);
  color: var(--accent-cyan);

  &.zhuhai {
    background: rgba(90, 204, 255, 0.15);
    color: var(--accent-blue);
  }
}

.kpi-value {
  font-size: 0.86rem;
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--text-primary);

  &.large {
    font-size: 1.3rem;
    margin-top: 6px;
  }
}

.industry-main {
  margin-top: 10px;
}

.industry-kpi.primary {
  padding: 16px;
  border-radius: 14px;
  background: var(--subscreen-card-bg);
  border: 1px solid rgba(90, 204, 255, 0.2);
  text-align: center;
  box-shadow: inset 0 0 18px rgba(90, 204, 255, 0.06);
}

.industry-label {
  font-size: 0.7rem;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.industry-value {
  font-size: 1.6rem;
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--accent-blue);
}

.signed-area {
  margin-top: 12px;
}

.signed-title {
  font-size: 0.7rem;
  color: var(--text-muted);
  margin-bottom: 10px;
}

.signed-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.signed-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--subscreen-subcard-bg);
  border: 1px solid rgba(90, 204, 255, 0.08);
  font-size: 0.7rem;
  color: var(--text-secondary);

  strong {
    font-family: var(--font-display);
    color: var(--text-primary);
  }
}

.risk-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 10px;
  min-height: 0;
}

.risk-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 12px;
  background: var(--subscreen-subcard-bg);
  border: 1px solid rgba(90, 204, 255, 0.1);
  min-height: 0;
}

.risk-item.warning {
  border: 1px solid rgba(255, 107, 107, 0.3);
  background: rgba(255, 107, 107, 0.06);
}

.risk-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(255, 107, 107, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-rose);
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
  }

  &.loss {
    background: rgba(248, 197, 71, 0.15);
    color: var(--accent-amber);
  }

  &.impairment {
    background: rgba(90, 204, 255, 0.15);
    color: var(--accent-blue);
  }

  &.safety {
    background: rgba(124, 242, 154, 0.15);
    color: var(--accent-lime);
  }
}

.risk-info {
  flex: 1;
}

.risk-label {
  font-size: 0.65rem;
  color: var(--text-muted);
  margin-bottom: 4px;
}

.risk-value {
  font-size: 1rem;
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--text-primary);
}

.construction-main {
  margin-top: 10px;
  min-height: 0;
  display: grid;
}

.construction-kpi {
  padding: 18px;
  border-radius: 14px;
  background: var(--subscreen-subcard-bg);
  border: 1px solid rgba(90, 204, 255, 0.1);
  min-height: 0;
  display: grid;
  align-content: center;
}

.construction-label {
  font-size: 0.7rem;
  color: var(--text-muted);
  margin-bottom: 10px;
}

.construction-value {
  font-size: 1.5rem;
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.construction-rate {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.7rem;
  color: var(--text-secondary);
}

.construction-rate .progress {
  flex: 1;
}

.hr-kpis {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 10px;
  min-height: 0;
}

.hr-kpi {
  padding: 16px;
  border-radius: 12px;
  background: var(--subscreen-subcard-bg);
  border: 1px solid rgba(90, 204, 255, 0.1);
  text-align: center;
  display: grid;
  align-content: center;
}

.hr-label {
  font-size: 0.7rem;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.hr-value {
  font-size: 1.3rem;
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--text-primary);
}

.fund-list {
  display: grid;
  gap: 10px;
  margin-top: 10px;
  min-height: 0;
}

.fund-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 14px;
  border-radius: 12px;
  background: var(--subscreen-subcard-bg);
  border: 1px solid rgba(90, 204, 255, 0.1);
  font-size: 0.72rem;
  color: var(--text-secondary);
}

.fund-item strong {
  font-family: var(--font-display);
  color: var(--text-primary);
}

.fund-item .stable {
  color: var(--accent-lime);
}

.fund-item.highlight {
  border: 1px solid rgba(90, 204, 255, 0.3);
  background: linear-gradient(135deg, rgba(90, 204, 255, 0.14), rgba(90, 204, 255, 0.06));
}

.summary-panel .data-table {
  margin-top: 10px;
}

.asset-total {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(54, 241, 205, 0.14), rgba(54, 241, 205, 0.06));
  border: 1px solid rgba(54, 241, 205, 0.2);
  font-size: 0.72rem;
  color: var(--text-secondary);
}

.asset-total strong {
  font-family: var(--font-display);
  color: var(--accent-cyan);
}

@media (max-width: 1450px) {
  .operation-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: repeat(4, minmax(0, 1fr));
    grid-template-areas:
      'investment industry'
      'investment risk'
      'construction fund'
      'summary hr';
  }

  .signed-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 1200px) {
  .operation-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      'investment'
      'industry'
      'risk'
      'construction'
      'hr'
      'fund'
      'summary';
    overflow-y: auto;
  }

  .investment-kpis,
  .risk-list,
  .hr-kpis {
    grid-template-columns: 1fr;
  }

  .signed-list {
    grid-template-columns: 1fr;
  }
}
</style>
