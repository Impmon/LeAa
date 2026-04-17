import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { sampleActivities } from '../data/sampleActivities'
import { MapPin, Calendar, Users, DollarSign, ArrowLeft, Check } from 'lucide-react'

export default function ActivityDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const activity = sampleActivities.find((a) => a.id === id)
  const [showContract, setShowContract] = useState(false)
  const [agreeContract, setAgreeContract] = useState(false)
  const [icebreakerAnswer, setIcebreakerAnswer] = useState('')

  if (!activity) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        <p>活动不存在</p>
      </div>
    )
  }

  const handleJoin = () => {
    setShowContract(true)
  }

  const handleConfirmJoin = () => {
    if (agreeContract && icebreakerAnswer) {
      navigate('/activities')
    }
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white pb-24">
      <header className="relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-10 bg-zinc-900/80 backdrop-blur-sm p-2 rounded-full"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <img src={activity.image} alt={activity.title} className="w-full h-64 object-cover" />
      </header>

      <main className="p-4 max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-primary text-zinc-900 px-3 py-1 rounded-full text-sm font-medium">
              {activity.type}
            </span>
          </div>
          <h1 className="text-2xl font-bold mb-2">{activity.title}</h1>
          <div className="flex items-center gap-2 mb-4">
            <img
              src={activity.creator.avatar}
              alt={activity.creator.name}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-zinc-400">{activity.creator.name}发起</span>
          </div>
        </div>

        <div className="bg-zinc-800 rounded-2xl p-4 mb-6">
          <h2 className="font-semibold mb-4">活动信息</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-zinc-400">
              <Calendar className="w-5 h-5" />
              <span>{activity.start_time}</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-400">
              <MapPin className="w-5 h-5" />
              <span>{activity.location}</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-400">
              <DollarSign className="w-5 h-5" />
              <span>¥{activity.budget_per_person}/人</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-400">
              <Users className="w-5 h-5" />
              <span>
                {activity.current_participants}/{activity.max_participants}人
              </span>
            </div>
          </div>
        </div>

        <div className="bg-zinc-800 rounded-2xl p-4 mb-6">
          <h2 className="font-semibold mb-3">活动描述</h2>
          <p className="text-zinc-400">{activity.description}</p>
        </div>

        <div className="bg-zinc-800 rounded-2xl p-4 mb-6">
          <h2 className="font-semibold mb-3">破冰问题</h2>
          <p className="text-zinc-400 mb-3">{activity.icebreaker_question || '你最喜欢的一部电影是？'}</p>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 p-4">
        <div className="max-w-4xl mx-auto flex gap-3">
          <button
            onClick={() => navigate(`/chat/${id}`)}
            className="flex-1 py-4 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors"
          >
            群聊
          </button>
          <button
            onClick={() => navigate(`/settlement/${id}`)}
            className="flex-1 py-4 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors"
          >
            结算AA
          </button>
          <button
            onClick={handleJoin}
            className="flex-1 py-4 bg-primary hover:bg-primary/80 text-zinc-900 font-semibold rounded-xl transition-colors"
          >
            报名参加
          </button>
        </div>
      </div>

      {showContract && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-800 rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">社交契约</h2>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-zinc-400 text-sm">准时参加，迟到15分钟以上保证金不退</p>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-zinc-400 text-sm">活动费用AA，主动支付自己的份额</p>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-zinc-400 text-sm">尊重他人边界，不私自索要联系方式</p>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-zinc-400 text-sm">保持轻松愉快的氛围，不劝酒</p>
              </div>
            </div>

            <label className="flex items-start gap-3 mb-4 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeContract}
                onChange={(e) => setAgreeContract(e.target.checked)}
                className="mt-1 w-5 h-5 accent-primary"
              />
              <span className="text-sm">我已阅读并同意以上社交契约</span>
            </label>

            <div className="mb-6">
              <label className="block text-sm mb-2">回答破冰问题</label>
              <input
                type="text"
                value={icebreakerAnswer}
                onChange={(e) => setIcebreakerAnswer(e.target.value)}
                placeholder={activity.icebreaker_question || '你最喜欢的一部电影是？'}
                className="w-full px-4 py-3 bg-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#00FF88]"
              />
            </div>

            <div className="bg-zinc-700 rounded-xl p-4 mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-zinc-400">保证金</span>
                <span>¥20.00</span>
              </div>
              <p className="text-xs text-zinc-500">活动结束后原路退还</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowContract(false)}
                className="flex-1 py-3 bg-zinc-700 hover:bg-zinc-600 rounded-xl transition-colors"
              >
                取消
              </button>
              <button
              onClick={handleConfirmJoin}
              disabled={!agreeContract || !icebreakerAnswer}
              className="flex-1 py-3 bg-primary hover:bg-primary/80 disabled:bg-zinc-600 disabled:cursor-not-allowed text-zinc-900 font-semibold rounded-xl transition-colors"
            >
              确认报名
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
