import { useLocation, useNavigate } from 'react-router-dom'
import { Users, Clock, DollarSign, Shield } from 'lucide-react'

type Scores = {
  financial: number
  time: number
  boundary: number
}

type LocationState = {
  scores: Scores
}

export default function Result() {
  const location = useLocation()
  const navigate = useNavigate()
  const scores = (location.state as LocationState)?.scores || { financial: 0, time: 0, boundary: 0 }

  const getDimensionLevel = (score: number) => {
    if (score >= 70) return '高'
    if (score >= 40) return '中'
    return '低'
  }

  const getProfile = () => {
    const { financial, time, boundary } = scores
    
    if (financial >= 70 && time >= 70 && boundary >= 70) {
      return { title: '社交达人', description: '你是一个注重平衡的社交达人，既尊重他人的时间和财务，也能清晰表达自己的边界。' }
    } else if (financial >= 70 && time >= 70) {
      return { title: '高效社交者', description: '你注重时间和财务的效率，善于在社交中保持平衡。' }
    } else if (financial >= 70 && boundary >= 70) {
      return { title: '独立社交者', description: '你注重财务独立和个人边界，在社交中保持清晰的自我认知。' }
    } else if (time >= 70 && boundary >= 70) {
      return { title: '有原则的社交者', description: '你注重时间管理和个人边界，在社交中保持自己的节奏。' }
    } else if (financial >= 70) {
      return { title: '财务敏感者', description: '你非常注重财务的平衡，在社交中倾向于AA制和清晰的财务界限。' }
    } else if (time >= 70) {
      return { title: '时间管理大师', description: '你非常注重时间的价值，在社交中倾向于高效和守时。' }
    } else if (boundary >= 70) {
      return { title: '边界守护者', description: '你非常注重个人边界，在社交中保持清晰的自我界限。' }
    } else {
      return { title: '社交探索者', description: '你正在探索适合自己的社交方式，乐见AA可以帮助你找到平衡。' }
    }
  }

  const profile = getProfile()

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-center">乐见AA</h1>
          <p className="text-zinc-400 text-center">你的社交偏好分析</p>
        </div>

        <div className="bg-zinc-800 rounded-2xl p-6 mb-6">
          <h2 className="text-2xl font-bold mb-6 text-center">{profile.title}</h2>
          <p className="text-zinc-300 text-center mb-8">{profile.description}</p>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-zinc-750 rounded-xl">
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-primary" />
                <span>财务敏感度</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">{scores.financial}%</span>
                <span className="text-sm text-zinc-400">{getDimensionLevel(scores.financial)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-zinc-750 rounded-xl">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <span>时间敏感度</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">{scores.time}%</span>
                <span className="text-sm text-zinc-400">{getDimensionLevel(scores.time)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-zinc-750 rounded-xl">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary" />
                <span>边界敏感度</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">{scores.boundary}%</span>
                <span className="text-sm text-zinc-400">{getDimensionLevel(scores.boundary)}</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate('/activities')}
          className="w-full py-4 bg-primary text-zinc-900 font-semibold rounded-xl hover:bg-primary/80 transition-colors"
        >
          进入活动广场
        </button>
      </div>
    </div>
  )
}
