import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, MapPin, Calendar, ChevronRight, Plus, Image as ImageIcon, Loader2 } from 'lucide-react'
import Layout from '../components/Layout'
import { hubApi } from '../lib/api'

interface Hub {
  id: string
  name: string
  description: string
  members: number
  location: string
  image: string
  tags: string[]
}

export default function Hubs() {
  const [hubs, setHubs] = useState<Hub[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // 获取据点列表
    const fetchHubs = async () => {
      setIsLoading(true)
      try {
        const data = await hubApi.listHubs({})
        setHubs(data)
      } catch (error) {
        console.error('获取据点列表失败:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHubs()
  }, [])

  const handleJoinHub = async (hubId: string) => {
    try {
      // 模拟用户ID
      const userId = 1
      await hubApi.joinHub(hubId, userId)
      // 重新获取据点列表
      const data = await hubApi.listHubs({})
      setHubs(data)
    } catch (error) {
      console.error('加入据点失败:', error)
    }
  }

  return (
    <Layout>
      <header className="sticky top-0 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800 p-4 z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">兴趣据点</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <div className="grid gap-4">
            {hubs.map((hub) => (
              <div key={hub.id} className="bg-zinc-800 rounded-2xl overflow-hidden hover:bg-zinc-750 transition-colors">
                <div className="relative">
                  <img
                    src={hub.image}
                    alt={hub.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent flex items-end p-4">
                    <h3 className="text-xl font-semibold">{hub.name}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{hub.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hub.tags?.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-zinc-700 rounded-full text-xs text-zinc-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-zinc-400">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{hub.members}人</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{hub.location}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleJoinHub(hub.id)}
                      className="px-4 py-2 bg-primary text-zinc-900 rounded-full text-sm font-medium hover:bg-primary/80 transition-colors"
                    >
                      加入
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <div className="fixed bottom-20 right-4 z-10">
        <button
          onClick={() => setShowCreateModal(true)}
          className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg hover:bg-primary/80 transition-colors"
        >
          <Plus className="w-6 h-6 text-zinc-900" />
        </button>
      </div>

      {/* 创建据点弹窗 */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-800 rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">创建兴趣据点</h2>
            <div className="space-y-4">
              {/* 据点封面 */}
              <div className="relative rounded-xl overflow-hidden h-40 bg-zinc-700">
                <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500">
                  <ImageIcon className="w-10 h-10 mb-2" />
                  <span>添加据点封面</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* 据点名称 */}
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">据点名称</label>
                <input
                  type="text"
                  placeholder="给你的据点起个名字"
                  className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-white"
                />
              </div>

              {/* 据点描述 */}
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">据点描述</label>
                <textarea
                  placeholder="描述你的据点..."
                  rows={4}
                  className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-white resize-none"
                />
              </div>

              {/* 据点位置 */}
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">据点位置</label>
                <input
                  type="text"
                  placeholder="输入城市名称"
                  className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-white"
                />
              </div>

              {/* 据点标签 */}
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">据点标签</label>
                <input
                  type="text"
                  placeholder="输入标签，用逗号分隔"
                  className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-white"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-3 bg-zinc-700 hover:bg-zinc-600 rounded-xl transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-3 bg-primary hover:bg-primary/80 text-zinc-900 font-semibold rounded-xl transition-colors"
                >
                  创建
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
