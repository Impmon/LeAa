import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { sampleActivities } from '../data/sampleActivities'
import { sampleHubs } from '../data/sampleHubs'
import { ChevronDown, Loader2, Users } from 'lucide-react'
import Layout from '../components/Layout'
import CitySelector from '../components/CitySelector'
import ActivityCard from '../components/ActivityCard'
import HubCard from '../components/HubCard'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'activities' | 'hubs'>('activities')
  const [currentCity, setCurrentCity] = useState('北京')
  const [isLocating, setIsLocating] = useState(false)
  const [showCitySelector, setShowCitySelector] = useState(false)
  const navigate = useNavigate()

  const cities = [
    '北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '西安',
    '南京', '重庆', '天津', '苏州', '郑州', '长沙', '沈阳', '青岛'
  ]

  useEffect(() => {
    // 尝试获取用户位置
    const getLocation = () => {
      if (navigator.geolocation) {
        setIsLocating(true)
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // 这里可以根据经纬度获取城市信息
            // 模拟获取到的城市
            setCurrentCity('北京')
            setIsLocating(false)
          },
          (error) => {
            console.error('定位失败:', error)
            setIsLocating(false)
          }
        )
      } else {
        console.error('浏览器不支持定位')
      }
    }

    getLocation()
  }, [])

  return (
    <Layout>
      <div className="mb-50">
        {/* 顶部导航栏 */}
        <header className="sticky top-0 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800 p-4 z-10">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">乐见AA</h1>
              <button 
                className="flex items-center gap-1 text-sm text-zinc-400 hover:text-white"
                onClick={() => !isLocating && setShowCitySelector(true)}
              >
                {isLocating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>定位中...</span>
                  </>
                ) : (
                  <>
                    <span>{currentCity}</span>
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
            <Link to="/profile" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </Link>
          </div>

          {/* 标签切换 */}
          <div className="max-w-4xl mx-auto mt-4 flex border-b border-zinc-800">
            <button
              onClick={() => setActiveTab('activities')}
              className={`flex-1 py-3 text-center transition-colors ${
                activeTab === 'activities' ? 'text-primary border-b-2 border-primary' : 'text-zinc-400 hover:text-white'
              }`}
            >
              活动
            </button>
            <button
              onClick={() => setActiveTab('hubs')}
              className={`flex-1 py-3 text-center transition-colors ${
                activeTab === 'hubs' ? 'text-primary border-b-2 border-primary' : 'text-zinc-400 hover:text-white'
              }`}
            >
              据点
            </button>
          </div>
        </header>

        <main className="max-w-4xl mx-auto p-4">
          {activeTab === 'activities' ? (
            <div className="grid gap-4">
              {sampleActivities.map((activity) => (
                <ActivityCard key={activity.id} {...activity} />
              ))}
            </div>
          ) : (
            <div className="grid gap-4">
              {sampleHubs.map((hub) => (
                <HubCard key={hub.id} {...hub} />
              ))}
            </div>
          )}
        </main>

        <CitySelector 
          currentCity={currentCity}
          onCityChange={setCurrentCity}
          isLocating={isLocating}
          onToggle={setShowCitySelector}
          isOpen={showCitySelector}
        />
      </div>
    </Layout>
  )
}
