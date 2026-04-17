import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Calendar, Users, DollarSign, Loader2 } from 'lucide-react'
import Layout from '../components/Layout'
import { activityApi } from '../lib/api'

export default function Activities() {
  const [activities, setActivities] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTag, setSelectedTag] = useState('全部')
  const [selectedFilter, setSelectedFilter] = useState('时间最新')

  useEffect(() => {
    // 获取活动列表
    const fetchActivities = async () => {
      setIsLoading(true)
      try {
        const params: any = {}
        if (selectedTag !== '全部') {
          params.type = selectedTag
        }
        // 这里可以根据selectedFilter添加排序逻辑
        const data = await activityApi.listActivities(params)
        setActivities(data)
      } catch (error) {
        console.error('获取活动列表失败:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchActivities()
  }, [selectedTag, selectedFilter])

  return (
    <Layout>
      <header className="sticky top-0 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800 p-4 z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">乐见AA</h1>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {['全部', '美食', '运动', '娱乐', '文化', 'Citywalk'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  tag === selectedTag ? 'bg-primary text-zinc-900' : 'bg-zinc-800 hover:bg-zinc-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="flex gap-2 mt-3 overflow-x-auto pb-2" style={{ height: '35px' }}>
            {['距离最近', '时间最新', '价格最低'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  filter === selectedFilter ? 'bg-primary text-zinc-900' : 'bg-zinc-800 hover:bg-zinc-700'
                }`}
                style={{ fontSize: '10px', fontWeight: '300' }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <div className="grid gap-4">
            {activities.map((activity) => (
              <Link
                key={activity.id}
                to={`/activities/${activity.id}`}
                className="bg-zinc-800 rounded-2xl overflow-hidden hover:bg-zinc-750 transition-colors"
              >
                <div className="relative">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-primary text-zinc-900 px-3 py-1 rounded-full text-sm font-medium">
                    {activity.type}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{activity.title}</h3>
                  <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{activity.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{activity.startTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{activity.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      <span>¥{activity.budgetPerPerson}/人</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>
                        {activity.currentParticipants}/{activity.maxParticipants}人
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <img
                      src={activity.creator?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                      alt={activity.creator?.name || '未知'}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm text-zinc-400">{activity.creator?.name || '未知'}发起</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </Layout>
  )
}
