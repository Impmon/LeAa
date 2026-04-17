import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, MapPin, Users, DollarSign, Plus, Image as ImageIcon } from 'lucide-react'
import { useImageUpload } from '../hooks/useImageUpload'

const activityTypes = [
  { value: 'food', label: '美食' },
  { value: 'sports', label: '运动' },
  { value: 'entertainment', label: '娱乐' },
  { value: 'culture', label: '文化' },
  { value: 'citywalk', label: 'Citywalk' }
]

export default function CreateActivity() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    date: '',
    time: '',
    location: '',
    budget_per_person: '',
    max_participants: '',
    icebreaker_question: ''
  })
  const { image, handleImageChange } = useImageUpload()
  const navigate = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 这里可以添加表单验证和提交逻辑
    console.log('活动发布数据:', formData, image)
    // 提交成功后导航回活动广场
    navigate('/activities')
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col">
      <header className="sticky top-0 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate('/activities')} className="text-zinc-400 hover:text-white">
            取消
          </button>
          <h1 className="text-xl font-bold">发布活动</h1>
          <button
            onClick={handleSubmit}
            className="text-primary hover:text-primary/80 font-semibold"
          >
            发布
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 活动封面 */}
          <div className="relative rounded-2xl overflow-hidden h-48 bg-zinc-800">
            {image ? (
              <img src={image} alt="活动封面" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500">
                <ImageIcon className="w-12 h-12 mb-2" />
                <span>添加活动封面</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* 活动标题 */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">活动标题</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="给你的活动起个名字"
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-white"
              required
            />
          </div>

          {/* 活动描述 */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">活动描述</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="详细描述你的活动..."
              rows={4}
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-white resize-none"
              required
            />
          </div>

          {/* 活动类型 */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">活动类型</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-white"
              required
            >
              <option value="">选择活动类型</option>
              {activityTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          {/* 活动时间 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">日期</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-5 h-5" />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-white"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">时间</label>
              <div className="relative">
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-white"
                  required
                />
              </div>
            </div>
          </div>

          {/* 活动地点 */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">活动地点</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-5 h-5" />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="输入活动地点"
                className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-white"
                required
              />
            </div>
          </div>

          {/* 预算和人数 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">预估人均</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-5 h-5" />
                <input
                  type="number"
                  name="budget_per_person"
                  value={formData.budget_per_person}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-white"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">人数限制</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-5 h-5" />
                <input
                  type="number"
                  name="max_participants"
                  value={formData.max_participants}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="2"
                  max="10"
                  className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-white"
                  required
                />
              </div>
            </div>
          </div>

          {/* 破冰话题 */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">破冰话题</label>
            <input
              type="text"
              name="icebreaker_question"
              value={formData.icebreaker_question}
              onChange={handleInputChange}
              placeholder="提一个问题，帮助筛选同频的人"
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-white"
              required
            />
          </div>

          {/* AA制声明 */}
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="aa_agreement"
              className="mt-1"
              required
            />
            <label htmlFor="aa_agreement" className="text-sm text-zinc-400">
              我承诺本次活动采用AA制，公平分摊费用，遵守平台的信用规则
            </label>
          </div>
        </form>
      </main>
    </div>
  )
}
