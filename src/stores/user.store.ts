import { create } from 'zustand'

import { IUserItem } from '@/interfaces'

interface UserStore {
  userProfile: IUserItem | null
  setUserProfile: (userProfile: IUserItem | null) => void
}

export const useUserStore = create<UserStore>((set) => ({
  userProfile: null,
  setUserProfile: (userProfile: IUserItem | null) => set({ userProfile })
}))
