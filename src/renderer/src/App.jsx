import { useIPCEvents } from './hooks/useIPCEvents';
import Toast from './components/Toast';
import BottomContainer from './components/BottomContainer';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import ContentSettings from './pages/ContentSettings';
import AppSettings from './pages/AppSettings';
import Versions from './components/Versions';

function App() {
  const { runMailer } = useIPCEvents();

  return (
    <HashRouter>
      <div className="bg-fuchsia-300 p-2 flex flex-col items-center justify-center">
        <nav>
          <ul>
            <li>
              <Link to="/">content-settings</Link>
            </li>
            <li>
              <Link to="/app-settings">app-settings</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<AppSettings />} />
          <Route path="/app-settings" element={<ContentSettings />} />
        </Routes>
        <BottomContainer runMailer={runMailer} />
        <Toast />
        <Versions />
      </div>
    </HashRouter>
  );
}

export default App;
