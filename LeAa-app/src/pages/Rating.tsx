import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { sampleActivities } from '../data/sampleActivities'
import { ArrowLeft, Star, Check, X } from 'lucide-react'

const tags = [
  '准时守信', '付款神速', '品味超赞', '聊天有趣',
  '积极参与', '善于沟通', '彬彬有礼', '氛围担当'
]

export default function Rating() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const activity = sampleActivities.find((a) => a.id === id)
  
  const [participants, setParticipants] = useState([
    { id: 1, name: '张三', avatar: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=user%20avatar&size=512x512', rating: 0, selectedTags: [], comment: '' },
    { id: 2, name: '李四', avatar: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=user%20avatar&size=512x512', rating: 0, selectedTags: [], comment: '' }
  ])

  if (!activity) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        <p>活动不存在</p>
      </div>
    )
  }

  const handleRatingChange = (participantId: number, rating: number) => {
    const newParticipants = participants.map(p => 
      p.id === participantId ? { ...p, rating } : p
    )
    setParticipants(newParticipants)
  }

  const handleTagToggle = (participantId: number, tag: string) => {
    const newParticipants = participants.map(p => {
      if (p.id === participantId) {
        const selectedTags = p.selectedTags.includes(tag)
          ? p.selectedTags.filter(t => t !== tag)
          : [...p.selectedTags, tag]
        return { ...p, selectedTags }
      }
      return p
    })
    setParticipants(newParticipants)
  }

  const handleCommentChange = (participantId: number, comment: string) => {
    const newParticipants = participants.map(p => 
      p.id === participantId ? { ...p, comment } : p
    )
    setParticipants(newParticipants)
  }

  const handleSubmit = () => {
    // 这里可以添加提交评价的逻辑
    console.log('评价数据:', participants)
    // 提交成功后导航回活动广场
    navigate('/activities')
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white pb-24">
      <header className="sticky top-0 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2">
            <ArrowLeft className="w-6 h-6" />
            <span>返回</span>
          </button>
          <h1 className="text-xl font-bold">活动评价</h1>
          <button
            onClick={handleSubmit}
            className="text-primary hover:text-primary/80 font-semibold"
          >
            提交
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        {/* 活动信息 */}
        <div className="bg-zinc-800 rounded-2xl p-4 mb-6">
          <h2 className="font-semibold mb-3">活动信息</h2>
          <div className="flex items-center gap-3 mb-3">
            <img
              src={activity.image}
              alt={activity.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-medium">{activity.title}</h3>
              <p className="text-sm text-zinc-400">{activity.start_time}</p>
            </div>
          </div>
        </div>

        {/* 参与者评价 */}
        <div className="space-y-6">
          {participants.map((participant) => (
            <div key={participant.id} className="bg-zinc-800 rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={participant.avatar}
                  alt={participant.name}
                  className="w-12 h-12 rounded-full"
                />
                <h3 className="font-medium">{participant.name}</h3>
              </div>

              {/* 评分 */}
              <div className="mb-4">
                <h4 className="text-sm text-zinc-400 mb-2">整体评分</h4>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRatingChange(participant.id, star)}
                      className={`text-2xl ${
                        star <= participant.rating ? 'text-primary' : 'text-zinc-600'
                      }`}
                    >
                      <Star className="w-6 h-6" />
                    </button>
                  ))}
                </div>
              </div>

              {/* 标签选择 */}
              <div className="mb-4">
                <h4 className="text-sm text-zinc-400 mb-2">信用标签</h4>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagToggle(participant.id, tag)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        participant.selectedTags.includes(tag)
                          ? 'bg-primary text-zinc-900'
                          : 'bg-zinc-700 text-zinc-400 hover:bg-zinc-600'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* 评论 */}
              <div>
                <h4 className="text-sm text-zinc-400 mb-2">补充评论</h4>
                <textarea
                  value={participant.comment}
                  onChange={(e) => handleCommentChange(participant.id, e.target.value)}
                  placeholder="分享一下你的体验..."
                  rows={3}
                  className="w-full px-4 py-3 bg-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#00FF88] resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
