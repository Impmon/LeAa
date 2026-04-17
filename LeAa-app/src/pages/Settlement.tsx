import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { sampleActivities } from '../data/sampleActivities'
import { ArrowLeft, Upload, DollarSign, Users, Check, X } from 'lucide-react'
import { useImageUpload } from '../hooks/useImageUpload'

export default function Settlement() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const activity = sampleActivities.find((a) => a.id === id)
  
  const [totalAmount, setTotalAmount] = useState('')
  const [expenseItems, setExpenseItems] = useState([{ name: '', amount: '' }])
  const [participants, setParticipants] = useState([
    { id: 1, name: '张三', avatar: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=user%20avatar&size=512x512', amount: '0', paid: false },
    { id: 2, name: '李四', avatar: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=user%20avatar&size=512x512', amount: '0', paid: false },
    { id: 3, name: '王五', avatar: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=user%20avatar&size=512x512', amount: '0', paid: false }
  ])
  const { image, handleImageChange } = useImageUpload()

  if (!activity) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        <p>活动不存在</p>
      </div>
    )
  }

  const handleAddExpenseItem = () => {
    setExpenseItems([...expenseItems, { name: '', amount: '' }])
  }

  const handleExpenseItemChange = (index: number, field: 'name' | 'amount', value: string) => {
    const newExpenseItems = [...expenseItems]
    newExpenseItems[index][field] = value
    setExpenseItems(newExpenseItems)
  }

  const handleRemoveExpenseItem = (index: number) => {
    const newExpenseItems = expenseItems.filter((_, i) => i !== index)
    setExpenseItems(newExpenseItems)
  }

  const calculateTotal = () => {
    const total = expenseItems.reduce((sum, item) => sum + parseFloat(item.amount || '0'), 0)
    setTotalAmount(total.toFixed(2))
    
    // 自动计算人均
    const perPerson = total / participants.length
    const newParticipants = participants.map(p => ({
      ...p,
      amount: perPerson.toFixed(2)
    }))
    setParticipants(newParticipants)
  }

  const handlePay = (participantId: number) => {
    const newParticipants = participants.map(p => 
      p.id === participantId ? { ...p, paid: true } : p
    )
    setParticipants(newParticipants)
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white pb-24">
      <header className="sticky top-0 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2">
            <ArrowLeft className="w-6 h-6" />
            <span>返回</span>
          </button>
          <h1 className="text-xl font-bold">AA结算</h1>
          <div className="flex gap-3">
            <button
              onClick={calculateTotal}
              className="text-zinc-400 hover:text-white font-semibold"
            >
              计算
            </button>
            <button
              onClick={() => navigate(`/rating/${id}`)}
              className="text-primary hover:text-primary/80 font-semibold"
            >
              评价
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        {/* 活动信息 */}
        <div className="bg-zinc-800 rounded-2xl p-4 mb-6">
          <h2 className="font-semibold mb-3">活动信息</h2>
          <div className="flex items-center gap-3 mb-3">
            <img
              src={activity.image}
              alt={activity.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-medium">{activity.title}</h3>
              <p className="text-sm text-zinc-400">{activity.start_time}</p>
            </div>
          </div>
        </div>

        {/* 上传票据 */}
        <div className="bg-zinc-800 rounded-2xl p-4 mb-6">
          <h2 className="font-semibold mb-3">上传票据</h2>
          <div className="relative rounded-xl overflow-hidden h-48 border-2 border-dashed border-zinc-700">
            {image ? (
              <img src={image} alt="票据" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500">
                <Upload className="w-12 h-12 mb-2" />
                <span>点击上传票据照片</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>

        {/* 费用明细 */}
        <div className="bg-zinc-800 rounded-2xl p-4 mb-6">
          <h2 className="font-semibold mb-3">费用明细</h2>
          {expenseItems.map((item, index) => (
            <div key={index} className="flex gap-3 mb-3">
              <input
                type="text"
                placeholder="费用项目"
                value={item.name}
                onChange={(e) => handleExpenseItemChange(index, 'name', e.target.value)}
                className="flex-1 px-3 py-2 bg-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#00FF88]"
              />
              <input
                type="number"
                placeholder="金额"
                value={item.amount}
                onChange={(e) => handleExpenseItemChange(index, 'amount', e.target.value)}
                className="w-32 px-3 py-2 bg-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#00FF88]"
              />
              {expenseItems.length > 1 && (
                <button
                  onClick={() => handleRemoveExpenseItem(index)}
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-zinc-700 rounded-lg hover:bg-zinc-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={handleAddExpenseItem}
            className="w-full py-2 border border-dashed border-zinc-700 rounded-lg flex items-center justify-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <Upload className="w-4 h-4" />
            <span>添加费用项目</span>
          </button>
        </div>

        {/* 总计 */}
        {totalAmount && (
          <div className="bg-zinc-800 rounded-2xl p-4 mb-6">
            <h2 className="font-semibold mb-3">总计</h2>
            <div className="flex justify-between items-center">
              <span>总金额</span>
              <span className="text-xl font-bold">¥{totalAmount}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span>参与人数</span>
              <span>{participants.length}人</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span>人均</span>
              <span>¥{(parseFloat(totalAmount) / participants.length).toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* 参与者 */}
        <div className="bg-zinc-800 rounded-2xl p-4">
          <h2 className="font-semibold mb-3">参与者</h2>
          <div className="space-y-3">
            {participants.map((participant) => (
              <div key={participant.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={participant.avatar}
                    alt={participant.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <span>{participant.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm">¥{participant.amount}</span>
                  {participant.paid ? (
                    <div className="flex items-center gap-1 text-[#00FF88]">
                      <Check className="w-4 h-4" />
                      <span className="text-sm">已支付</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handlePay(participant.id)}
                      className="px-4 py-1 bg-primary text-zinc-900 rounded-full text-sm font-medium hover:bg-primary/80 transition-colors"
                    >
                      支付
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
