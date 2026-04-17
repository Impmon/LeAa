import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { sampleActivities } from '../data/sampleActivities'
import { MapPin, Calendar, Users, DollarSign, Award, User, Heart, Clock, Shield, ChevronRight } from 'lucide-react'
import Layout from '../components/Layout'

export default function Profile() {
  const [activeTab, setActiveTab] = useState<'created' | 'joined'>('created')
  const [userScores] = useState({
    financial: 75,
    time: 80,
    boundary: 65
  })
  const navigate = useNavigate()

  // 模拟用户发起的活动
  const createdActivities = sampleActivities.slice(0, 2)
  // 模拟用户参加的活动
  const joinedActivities = sampleActivities.slice(2, 4)

  const getDimensionLevel = (score: number) => {
    if (score >= 70) return '高'
    if (score >= 40) return '中'
    return '低'
  }

  const getProfile = () => {
    const { financial, time, boundary } = userScores
    
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
    <Layout>
      <header className="sticky top-0 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800 p-4 z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">个人中心</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        {/* 用户信息 */}
        <div className="bg-zinc-800 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-zinc-700 flex items-center justify-center">
              <User className="w-10 h-10 text-zinc-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold">用户名</h2>
              <p className="text-zinc-400">ID: 123456</p>
            </div>
          </div>
        </div>

        {/* SBIT性格 */}
        <div className="bg-zinc-800 rounded-2xl p-6 mb-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            <span>我的社交性格</span>
          </h2>
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">{profile.title}</h3>
            <p className="text-zinc-400">{profile.description}</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-primary" />
                <span>财务敏感度</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{userScores.financial}%</span>
                <span className="text-sm text-zinc-400">{getDimensionLevel(userScores.financial)}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>时间敏感度</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{userScores.time}%</span>
                <span className="text-sm text-zinc-400">{getDimensionLevel(userScores.time)}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>边界敏感度</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{userScores.boundary}%</span>
                <span className="text-sm text-zinc-400">{getDimensionLevel(userScores.boundary)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 活动记录 */}
        <div className="bg-zinc-800 rounded-2xl p-6 mb-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            <span>活动记录</span>
          </h2>
          <div className="flex border-b border-zinc-700 mb-4">
            <button
              onClick={() => setActiveTab('created')}
              className={`flex-1 py-2 text-center transition-colors ${
                activeTab === 'created' ? 'text-primary border-b-2 border-primary' : 'text-zinc-400 hover:text-white'
              }`}
            >
              我发起的
            </button>
            <button
              onClick={() => setActiveTab('joined')}
              className={`flex-1 py-2 text-center transition-colors ${
                activeTab === 'joined' ? 'text-primary border-b-2 border-primary' : 'text-zinc-400 hover:text-white'
              }`}
            >
              我参加的
            </button>
          </div>
          <div className="space-y-4">
            {activeTab === 'created' ? (
              createdActivities.length > 0 ? (
                createdActivities.map((activity) => (
                  <Link
                    key={activity.id}
                    to={`/activities/${activity.id}`}
                    className="block p-4 bg-zinc-750 rounded-xl hover:bg-zinc-700 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{activity.title}</h3>
                      <span className="text-xs text-zinc-400">{activity.start_time}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-zinc-400 mt-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{activity.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>
                          {activity.current_participants}/{activity.max_participants}人
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-8 text-zinc-400">
                  <p>你还没有发起过活动</p>
                </div>
              )
            ) : (
              joinedActivities.length > 0 ? (
                joinedActivities.map((activity) => (
                  <Link
                    key={activity.id}
                    to={`/activities/${activity.id}`}
                    className="block p-4 bg-zinc-750 rounded-xl hover:bg-zinc-700 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{activity.title}</h3>
                      <span className="text-xs text-zinc-400">{activity.start_time}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-zinc-400 mt-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{activity.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>
                          {activity.current_participants}/{activity.max_participants}人
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-8 text-zinc-400">
                  <p>你还没有参加过活动</p>
                </div>
              )
            )}
          </div>
        </div>

        {/* 设置 */}
        <div className="bg-zinc-800 rounded-2xl p-6">
          <h2 className="font-semibold mb-4">设置</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 bg-zinc-750 rounded-xl hover:bg-zinc-700 transition-colors">
              <span>个人信息</span>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-zinc-750 rounded-xl hover:bg-zinc-700 transition-colors">
              <span>通知设置</span>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-zinc-750 rounded-xl hover:bg-zinc-700 transition-colors">
              <span>隐私设置</span>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-zinc-750 rounded-xl hover:bg-zinc-700 transition-colors">
              <span>关于我们</span>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </button>
          </div>
        </div>
      </main>
    </Layout>
  )
}
