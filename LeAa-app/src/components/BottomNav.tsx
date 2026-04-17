import { Link, useLocation } from 'react-router-dom'
import { Users, Plus, User } from 'lucide-react'

export default function BottomNav() {
  const location = useLocation()
  
  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 p-4">
      <div className="max-w-4xl mx-auto flex justify-around items-center">
        <Link 
          to="/" 
          className={`flex flex-col items-center gap-1 ${isActive('/') ? 'text-primary' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          <Users className="w-6 h-6" />
          <span className="text-xs">首页</span>
        </Link>
        <Link to="/create-activity" className="relative text-center">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center -mt-8 shadow-lg">
            <Plus className="w-6 h-6 text-zinc-900" />
          </div>
          <span className="text-xs text-zinc-400 mt-1">发布</span>
        </Link>
        <Link 
          to="/profile" 
          className={`flex flex-col items-center gap-1 ${isActive('/profile') ? 'text-primary' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs">我的</span>
        </Link>
      </div>
    </nav>
  )
}