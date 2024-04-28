import { useIPCEvents } from './hooks/useIPCEvents';
import Toast from './components/Toast';
import BottomContainer from './components/BottomContainer';
import { HashRouter, Routes, Route } from 'react-router-dom';
import ContentSettings from './pages/ContentSettings';
import AppSettings from './pages/AppSettings';
import Versions from './components/Versions';
import Navigation from './components/Navigation';

function App() {
  const { runMailer } = useIPCEvents();

  return (
    <HashRouter>
      <div className="absolute inset-0 px-2 pt-8 pb-80 flex flex-col items-center">
        <Navigation />
        <Routes>
          <Route path="/" element={<ContentSettings />} />
          <Route path="/app-settings" element={<AppSettings />} />
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
