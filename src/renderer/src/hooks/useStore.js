import { create } from 'zustand'

export const useStore = create((set) => ({
  messageLog: [],
  setMessageLog: (message) =>
    set((state) => {
      const timestamp = new Date().toLocaleTimeString()
      return { messageLog: [...state.messageLog, `[${timestamp}] - ${message}`] }
    }),

  contentText: '',
  setContentText: (content) => set({ contentText: content })
}))
