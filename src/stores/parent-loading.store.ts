import { create } from 'zustand'

interface ParentLoadingStore {
  isParentLoading: boolean
  setIsParentLoading: (isParentLoading: boolean) => void
}

export const useParentLoadingStore = create<ParentLoadingStore>((set) => ({
  isParentLoading: false,
  setIsParentLoading: (isParentLoading: boolean) => set({ isParentLoading })
}))
