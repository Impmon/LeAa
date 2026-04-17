import { useState } from 'react'

interface CitySelectorProps {
  currentCity: string
  onCityChange: (city: string) => void
  isLocating?: boolean
  onToggle?: (open: boolean) => void
  isOpen: boolean
}

export default function CitySelector({ 
  currentCity, 
  onCityChange, 
  isLocating = false, 
  onToggle, 
  isOpen 
}: CitySelectorProps) {
  const cities = [
    '北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '西安',
    '南京', '重庆', '天津', '苏州', '郑州', '长沙', '沈阳', '青岛'
  ]

  const handleCitySelect = (city: string) => {
    onCityChange(city)
    onToggle?.(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-zinc-800 rounded-2xl w-full max-w-md max-h-[80vh] overflow-y-auto">
        <div className="p-4 border-b border-zinc-700 flex justify-between items-center">
          <h2 className="font-semibold text-lg">选择城市</h2>
          <button
            onClick={() => onToggle?.(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-700"
          >
            ✕
          </button>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-4 gap-3">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => handleCitySelect(city)}
                className={`py-2 px-3 rounded-lg text-center transition-colors ${ 
                  city === currentCity ? 'bg-primary text-zinc-900' : 'bg-zinc-700 text-white hover:bg-zinc-600'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}