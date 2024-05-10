import { useIPCEvents } from './hooks/useIPCEvents';
import Toast from './components/Toast';
import BottomContainer from './components/BottomContainer';
import { HashRouter, Routes, Route } from 'react-router-dom';
import ContentSettings from './pages/ContentSettings';
import AppSettings from './pages/AppSettings';
import Versions from './components/Versions';
import Navigation from './components/Navigation';
import { loadMailNames } from './utils/read-private-config';
import MailList from './pages/MailList';
import { useStore } from './hooks/useStore';
import { useEffect } from 'react';

function App() {
  const setInitialData = useStore((state) => state.setInitialData);
  const setMailTitleInLocalStorage = useStore((state) => state.setMailTitleInLocalStorage);
  const { runMailer, writeMailContentToTxt } = useIPCEvents();

  useEffect(() => {
    loadMailNames()
      .then(() => setInitialData().catch(console.error))
      .catch(console.error);
  }, []);

  const handleSave = () => {
    writeMailContentToTxt();
    setMailTitleInLocalStorage();
  };

  return (
    <HashRouter>
      <div className="absolute inset-0 px-2 pt-8 pb-80 flex flex-col items-center">
        <Navigation />
        <Routes>
          <Route path="/" element={<ContentSettings onSave={handleSave} />} />
          <Route path="/app-settings" element={<AppSettings />} />
          <Route path="/mail-list" element={<MailList />} />
        </Routes>
      </div>
      <div className="fixed inset-x-0 bottom-0 flex flex-col items-center p-2">
        <BottomContainer runMailer={runMailer} />
        <Toast />
        <Versions />
      </div>
    </HashRouter>
  );
}

export default App;
