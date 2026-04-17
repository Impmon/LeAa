import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { sampleActivities } from '../data/sampleActivities'
import { ArrowLeft, Send, MoreVertical, Users, Clock } from 'lucide-react'

interface Message {
  id: number
  senderId: number
  senderName: string
  senderAvatar: string
  content: string
  timestamp: string
}

interface Participant {
  id: number
  name: string
  avatar: string
}

export default function Chat() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const activity = sampleActivities.find((a) => a.id === id)
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      senderId: 1,
      senderName: '系统',
      senderAvatar: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=system%20avatar&size=512x512',
      content: '欢迎加入活动群聊，活动将在24小时后开始',
      timestamp: '10:00'
    },
    {
      id: 2,
      senderId: 2,
      senderName: '张三',
      senderAvatar: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=user%20avatar&size=512x512',
      content: '大家好，我是张三',
      timestamp: '10:01'
    },
    {
      id: 3,
      senderId: 3,
      senderName: '李四',
      senderAvatar: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=user%20avatar&size=512x512',
      content: '大家好，我是李四',
      timestamp: '10:02'
    }
  ])
  
  const [participants, setParticipants] = useState<Participant[]>([
    { id: 2, name: '张三', avatar: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=user%20avatar&size=512x512' },
    { id: 3, name: '李四', avatar: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=user%20avatar&size=512x512' },
    { id: 4, name: '王五', avatar: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=user%20avatar&size=512x512' }
  ])
  
  const [inputValue, setInputValue] = useState('')
  const [showParticipants, setShowParticipants] = useState(false)

  if (!activity) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        <p>活动不存在</p>
      </div>
    )
  }

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        senderId: 1,
        senderName: '我',
        senderAvatar: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=user%20avatar&size=512x512',
        content: inputValue,
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      }
      setMessages([...messages, newMessage])
      setInputValue('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col">
      <header className="sticky top-0 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800 p-4 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="flex-shrink-0">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="font-semibold">{activity.title}</h1>
              <div className="flex items-center gap-1 text-xs text-zinc-400">
                <Users className="w-3 h-3" />
                <span>{participants.length}人</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowParticipants(!showParticipants)} className="flex-shrink-0">
              <Users className="w-6 h-6" />
            </button>
            <button className="flex-shrink-0">
              <MoreVertical className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.senderId === 1 ? 'justify-end' : 'justify-start'}`}>
              {message.senderId !== 1 && (
                <img
                  src={message.senderAvatar}
                  alt={message.senderName}
                  className="w-8 h-8 rounded-full flex-shrink-0 mr-2"
                />
              )}
              <div className={`max-w-[70%] ${message.senderId === 1 ? 'items-end' : 'items-start'} flex flex-col`}>
                {message.senderId !== 1 && (
                  <span className="text-xs text-zinc-400 mb-1">{message.senderName}</span>
                )}
                <div className={`px-4 py-2 rounded-lg ${message.senderId === 1 ? 'bg-primary text-zinc-900' : 'bg-zinc-800'}`}>
                  <p>{message.content}</p>
                </div>
                <span className="text-xs text-zinc-500 mt-1">{message.timestamp}</span>
              </div>
              {message.senderId === 1 && (
                <img
                  src={message.senderAvatar}
                  alt={message.senderName}
                  className="w-8 h-8 rounded-full flex-shrink-0 ml-2"
                />
              )}
            </div>
          ))}
        </div>
      </main>

      <footer className="sticky bottom-0 bg-zinc-900/95 backdrop-blur-sm border-t border-zinc-800 p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="输入消息..."
            className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-full focus:outline-none focus:ring-2 focus:ring-primary text-white"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-zinc-900 disabled:bg-zinc-700 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </footer>

      {showParticipants && (
        <div className="fixed inset-0 bg-black/80 flex items-end justify-center z-50">
          <div className="bg-zinc-800 rounded-t-2xl w-full max-h-[70vh] overflow-y-auto">
            <div className="p-4 border-b border-zinc-700">
              <h2 className="font-semibold text-lg">参与者 ({participants.length})</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {participants.map((participant) => (
                  <div key={participant.id} className="flex items-center gap-3">
                    <img
                      src={participant.avatar}
                      alt={participant.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <span>{participant.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 border-t border-zinc-700">
              <button
                onClick={() => setShowParticipants(false)}
                className="w-full py-3 bg-zinc-700 hover:bg-zinc-600 rounded-xl transition-colors"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
