import { create } from 'zustand';
import { toast } from 'react-toastify';

export const useStore = create((set, get) => ({
  isRunning: false,
  setIsRunning: (running) => set({ isRunning: running }),

  messageLog: [],
  setMessageLog: (message) =>
    set((state) => {
      const timestamp = new Date().toLocaleTimeString();
      return { messageLog: [...state.messageLog, `[${timestamp}] - ${message}`] };
    }),

  mailTitle: localStorage.getItem('mailTitle') || 'Photo and video editing services!',
  setMailTitle: (title) => {
    localStorage.setItem('mailTitle', title);
    set({ mailTitle: title });
  },

  contentText: '',
  setContentText: (content) => set({ contentText: content }),

  runToast: (message) => toast(message),

  mailNames: [],
  setMailNames: (mailNames) => set({ mailNames }),
  selectedMailIndex: localStorage.getItem('selectedMailIndex') || 0,
  setSelectedMailIndex: (index) => {
    localStorage.setItem('selectedMailIndex', index);
    set({ selectedMailIndex: index });
  },

  shouldShutdown: false,
  toggleShouldShutdown: () => set((state) => ({ shouldShutdown: !state.shouldShutdown })),

  mailList: JSON.parse(localStorage.getItem('mailList')) || [{ '#': 1, emails: '', sent: false }],
  setMailList: (mailList) => {
    set({ mailList });
    get().updateMailListInLocalStorage();
  },
  updateMailListInLocalStorage: () => {
    const mailList = get().mailList;
    localStorage.setItem('mailList', JSON.stringify(mailList));
  },
  updateMailSendStatus: (mail) => {
    const setMailList = get().setMailList;
    const mailList = get().mailList;
    const updatedMailList = mailList.map((row) => {
      if (row.emails === mail) {
        return { ...row, sent: true };
      }
      return row;
    });
    setMailList(updatedMailList);
  }
}));
