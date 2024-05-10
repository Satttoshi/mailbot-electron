import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const route = useLocation();

  return (
    <nav className="z-10 fixed top-2 left-2">
      <ul className="flex font-bold">
        <Link to="/">
          <li
            className={`rounded-full ${route.pathname === '/' ? 'text-white bg-4 px-4 py-3' : 'text-dark bg-2 px-4 py-3 hover:bg-3'}`}
          >
            Content Settings
          </li>
        </Link>
        <Link to="/app-settings">
          <li
            className={`rounded-full ${route.pathname === '/app-settings' ? 'text-white bg-4 px-4 py-3' : 'text-dark bg-2 px-4 py-3 hover:bg-3'}`}
          >
            App Options
          </li>
        </Link>
        <Link to="/mail-list">
          <li
            className={`rounded-full ${route.pathname === '/mail-list' ? 'text-white bg-4 px-4 py-3' : 'text-dark bg-2 px-4 py-3 hover:bg-3'}`}
          >
            Mail List
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navigation;
