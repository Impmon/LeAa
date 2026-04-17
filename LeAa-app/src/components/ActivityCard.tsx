import { Link } from 'react-router-dom'
import { Calendar, MapPin, DollarSign, Users } from 'lucide-react'

interface ActivityProps {
  id: string
  title: string
  description: string
  image: string
  type: string
  start_time: string
  location: string
  budget_per_person: number
  current_participants: number
  max_participants: number
  creator: {
    name: string
    avatar: string
  }
}

export default function ActivityCard({ 
  id, 
  title, 
  description, 
  image, 
  type, 
  start_time, 
  location, 
  budget_per_person, 
  current_participants, 
  max_participants, 
  creator 
}: ActivityProps) {
  return (
    <Link
      key={id}
      to={`/activities/${id}`}
      className="bg-zinc-800 rounded-2xl overflow-hidden hover:bg-zinc-750 transition-colors"
    >
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-3 left-3 bg-primary text-zinc-900 px-3 py-1 rounded-full text-sm font-medium">
          {type}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{start_time}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            <span>¥{budget_per_person}/人</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>
              {current_participants}/{max_participants}人
            </span>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <img
            src={creator.avatar}
            alt={creator.name}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm text-zinc-400">{creator.name}发起</span>
        </div>
      </div>
    </Link>
  )
}