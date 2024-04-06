import { create } from 'zustand'
import { toast } from 'react-toastify'

export const useStore = create((set) => ({
  messageLog: [],
  setMessageLog: (message) =>
    set((state) => {
      const timestamp = new Date().toLocaleTimeString()
      return { messageLog: [...state.messageLog, `[${timestamp}] - ${message}`] }
    }),

  contentText: '',
  setContentText: (content) => set({ contentText: content }),

  runToast: (message) => toast(message),

  mailNames: [],
  setMailNames: (mailNames) => set({ mailNames }),
  selectedIndex: localStorage.getItem('selectedIndex') || 0,
  setSelectedIndex: (index) => {
    localStorage.setItem('selectedIndex', index)
    set({ selectedIndex: index })
  }
}))
