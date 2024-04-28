import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const route = useLocation();

  return (
    <nav className="fixed top-2 left-2">
      <ul className="flex font-bold">
        <li
          className={`text-white rounded-full ${route.pathname === '/' ? 'bg-purple-900 px-4 py-3' : 'text-slate-900 bg-purple-300 px-4 py-3 hover:bg-purple-400'}`}
        >
          <Link to="/">Content Settings</Link>
        </li>
        <li
          className={`text-white rounded-full ${route.pathname === '/app-settings' ? 'bg-purple-900 px-4 py-3' : 'text-slate-900 bg-purple-300 px-4 py-3 hover:bg-purple-400'}`}
        >
          <Link to="/app-settings">App Options</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
