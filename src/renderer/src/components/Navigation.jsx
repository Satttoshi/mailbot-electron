import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const route = useLocation();

  return (
    <nav className="fixed top-2 left-2">
      <ul className="flex font-bold">
        <Link to="/">
          <li
            className={`rounded-full ${route.pathname === '/' ? 'text-white bg-purple-900 px-4 py-3' : 'text-slate-900 bg-purple-300 px-4 py-3 hover:bg-purple-400'}`}
          >
            Content Settings
          </li>
        </Link>
        <Link to="/app-settings">
          <li
            className={`rounded-full ${route.pathname === '/app-settings' ? 'text-white bg-purple-900 px-4 py-3' : 'text-slate-900 bg-purple-300 px-4 py-3 hover:bg-purple-400'}`}
          >
            App Options
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navigation;
