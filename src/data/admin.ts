export const adminData = {
  hierarchy: {
    l1: ['领导行程', '督办事项完成率', '三会议召开次数']
  },
  // 督办事项完成率
  supervision: {
    completionRate: '85%'
  },
  // 三会议召开次数
  meeting: {
    total: '36 次',
    detail: {
      partyCommittee: 12,
      executiveOffice: 14,
      special: 10
    }
  },
  // 领导行程
  schedule: {
    list: [
      { time: '09:00', leader: '董事长', agenda: '季度经营会', location: '总部' },
      { time: '11:00', leader: '总经理', agenda: '重点项目调度', location: '视频会议' },
      { time: '14:30', leader: '财务总监', agenda: '预算执行复盘', location: '财务中心' },
      { time: '16:00', leader: '人力总监', agenda: '人才盘点会', location: '人力中心' }
    ]
  }
}
