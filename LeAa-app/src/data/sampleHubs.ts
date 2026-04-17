export type Hub = {
  id: string
  name: string
  description: string
  members: number
  location: string
  image: string
  tags: string[]
}

export const sampleHubs: Hub[] = [
  {
    id: '1',
    name: '北京周末Citywalk小队',
    description: '每周六一起探索北京的胡同和文化景点，用脚步丈量城市的魅力',
    members: 42,
    location: '北京',
    image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=citywalk%20in%20beijing%20hutong&size=1024x768',
    tags: ['Citywalk', '文化', '周末']
  },
  {
    id: '2',
    name: '上海独立书店爱好者',
    description: '探索上海的独立书店，分享阅读心得，举办小型读书会',
    members: 28,
    location: '上海',
    image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=independent%20bookstore%20in%20shanghai&size=1024x768',
    tags: ['阅读', '文化', '书店']
  },
  {
    id: '3',
    name: '广州美食探索团',
    description: '寻找广州最地道的美食，从早茶到夜宵，一起打卡网红店和隐藏美食',
    members: 56,
    location: '广州',
    image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=guangzhou%20food%20tour&size=1024x768',
    tags: ['美食', '探店', '广州']
  }
]
