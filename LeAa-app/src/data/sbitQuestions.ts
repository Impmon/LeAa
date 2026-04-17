export type SbitQuestion = {
  id: number
  question: string
  leftOption: string
  rightOption: string
  dimension: 'financial' | 'time' | 'boundary'
}

export const sbitQuestions: SbitQuestion[] = [
  {
    id: 1,
    question: '朋友聚餐买单时，你会？',
    leftOption: '主动抢着买单',
    rightOption: '坚持AA制',
    dimension: 'financial',
  },
  {
    id: 2,
    question: '约定时间见面，你通常？',
    leftOption: '提前15分钟到',
    rightOption: '踩点或稍晚几分钟',
    dimension: 'time',
  },
  {
    id: 3,
    question: '刚认识的朋友想约你单独吃饭，你会？',
    leftOption: '欣然答应',
    rightOption: '先拒绝，等更熟悉再说',
    dimension: 'boundary',
  },
  {
    id: 4,
    question: '朋友借钱忘记还，你会？',
    leftOption: '不好意思要，就算了',
    rightOption: '委婉提醒对方',
    dimension: 'financial',
  },
  {
    id: 5,
    question: '活动取消提前多久通知你能接受？',
    leftOption: '提前1天以上',
    rightOption: '提前几小时也可以',
    dimension: 'time',
  },
  {
    id: 6,
    question: '聚会时有人不停问你隐私问题，你会？',
    leftOption: '礼貌回答',
    rightOption: '巧妙转移话题',
    dimension: 'boundary',
  },
  {
    id: 7,
    question: '点外卖时朋友让你先垫付，你会？',
    leftOption: '没问题，谁先付都一样',
    rightOption: '马上转钱给对方',
    dimension: 'financial',
  },
  {
    id: 8,
    question: '约好的时间你有事耽误了，你会？',
    leftOption: '非常抱歉，主动补偿',
    rightOption: '说明情况，下次注意',
    dimension: 'time',
  },
  {
    id: 9,
    question: '刚加的微信好友就给你发语音通话，你会？',
    leftOption: '立刻接听',
    rightOption: '先问清楚什么事',
    dimension: 'boundary',
  },
  {
    id: 10,
    question: '旅游时朋友提议住一间房省钱，你会？',
    leftOption: '好的，能省则省',
    rightOption: '还是分开住吧',
    dimension: 'boundary',
  },
]
