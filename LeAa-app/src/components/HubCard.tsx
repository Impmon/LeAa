import { Link } from 'react-router-dom'
import { Users, MapPin } from 'lucide-react'

interface HubProps {
  id: string
  name: string
  description: string
  image: string
  members: number
  location: string
  tags: string[]
}

export default function HubCard({ 
  id, 
  name, 
  description, 
  image, 
  members, 
  location, 
  tags 
}: HubProps) {
  return (
    <Link
      key={id}
      to={`/hubs/${id}`}
      className="bg-zinc-800 rounded-2xl overflow-hidden hover:bg-zinc-750 transition-colors"
    >
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent flex items-end p-4">
          <h3 className="text-xl font-semibold">{name}</h3>
        </div>
      </div>
      <div className="p-4">
        <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-zinc-700 rounded-full text-xs text-zinc-300">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-zinc-400">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{members}人</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          </div>
          <button className="px-4 py-2 bg-primary text-zinc-900 rounded-full text-sm font-medium hover:bg-primary/80 transition-colors">
            加入
          </button>
        </div>
      </div>
    </Link>
  )
}