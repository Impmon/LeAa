import { create } from 'zustand'

type User = {
  id: string
  name: string
  avatar_url?: string
  credit_score: number
}

type Activity = {
  id: string
  title: string
  type: string
  budget_per_person: number
  start_time: string
  location: string
}

type AppState = {
  user: User | null
  activities: Activity[]
  setUser: (user: User | null) => void
  setActivities: (activities: Activity[]) => void
}

export const useStore = create<AppState>((set) => ({
  user: null,
  activities: [],
  setUser: (user) => set({ user }),
  setActivities: (activities) => set({ activities }),
}))
