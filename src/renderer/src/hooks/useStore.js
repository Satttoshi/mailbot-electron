import { create } from 'zustand'

export const useStore = create((set) => ({
  messageLog: [],
  setMessageLog: (message) => set((state) => ({ messageLog: [...state.messageLog, message] }))
}))
