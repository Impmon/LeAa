export type Activity = {
  id: string
  title: string
  type: string
  budget_per_person: number
  max_participants: number
  current_participants: number
  start_time: string
  location: string
  description: string
  image: string
  creator: {
    name: string
    avatar: string
  }
  icebreaker_question?: string
}

export const sampleActivities: Activity[] = [
  {
    id: '1',
    title: '周末火锅局',
    type: '美食',
    budget_per_person: 80,
    max_participants: 4,
    current_participants: 2,
    start_time: '2024-04-13 18:00',
    location: '朝阳区 海底捞',
    description: '周末想吃火锅，找3-4个朋友一起AA，不劝酒，聊聊天～',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hotpot%20restaurant%20with%20friends%20eating%20together%20warm%20cozy%20atmosphere&image_size=square_hd',
    creator: {
      name: '小明',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xiaoming',
    },
    icebreaker_question: '你最喜欢的火锅食材是什么？',
  },
  {
    id: '2',
    title: 'Citywalk 胡同探索',
    type: '运动',
    budget_per_person: 30,
    max_participants: 6,
    current_participants: 4,
    start_time: '2024-04-14 14:00',
    location: '西城区 南锣鼓巷',
    description: '周末一起走胡同，探索北京的老城区，拍照打卡，最后找个咖啡店休息～',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beijing%20hutong%20alleyway%20traditional%20chinese%20architecture%20people%20walking&image_size=square_hd',
    creator: {
      name: '小红',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xiaohong',
    },
    icebreaker_question: '你最喜欢北京的哪个胡同？',
  },
  {
    id: '3',
    title: '桌游夜：狼人杀',
    type: '娱乐',
    budget_per_person: 50,
    max_participants: 8,
    current_participants: 5,
    start_time: '2024-04-12 19:00',
    location: '海淀区 桌游吧',
    description: '下班后狼人杀，新手友好，会教学，大家一起开心玩～',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=board%20game%20night%20friends%20playing%20werewolf%20fun%20atmosphere&image_size=square_hd',
    creator: {
      name: '小李',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xiaoli',
    },
    icebreaker_question: '你最喜欢的桌游是什么？',
  },
  {
    id: '4',
    title: '看展：现代艺术展',
    type: '文化',
    budget_per_person: 100,
    max_participants: 4,
    current_participants: 1,
    start_time: '2024-04-13 10:00',
    location: '朝阳区 798艺术区',
    description: '一起看现代艺术展，门票AA，看完可以一起讨论～',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20art%20gallery%20exhibition%20contemporary%20paintings%20people%20viewing&image_size=square_hd',
    creator: {
      name: '小王',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xiaowang',
    },
    icebreaker_question: '你最喜欢的艺术家是谁？',
  },
]
