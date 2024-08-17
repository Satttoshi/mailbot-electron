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

  initialData: { contentSettings: { mailTitle: '', contentText: '' } },
  setInitialData: async () => {
    const mailTitle = localStorage.getItem('mailTitle') || 'Insert mail title here...';
    const contentText = await window.api.readContentFile(get().contentFileIndex);
    set({ initialData: { contentSettings: { mailTitle, contentText } } });
    get().setContentText(contentText);
  },
  updateInitialDataContentSettings: () => {
    set({
      initialData: {
        contentSettings: { mailTitle: get().mailTitle, contentText: get().contentText }
      }
    });
  },

  mailTitle: localStorage.getItem('mailTitle') || 'Insert mail title here...',
  setMailTitle: (title) => {
    set({ mailTitle: title });
  },
  setMailTitleInLocalStorage: () => {
    const title = get().mailTitle;
    localStorage.setItem('mailTitle', title);
  },

  contentText: '',
  setContentText: (content) => set({ contentText: content }),

  contentFileIndex: localStorage.getItem('contentFileIndex') || 0,
  setContentFileIndex: (index) => {
    localStorage.setItem('contentFileIndex', index);
    set({ contentFileIndex: index });
  },

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
  },

  theme: localStorage.getItem('theme') || 'default',
  setTheme: (newTheme) => {
    set({ theme: newTheme });
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('color-theme', newTheme);
  }
}));
