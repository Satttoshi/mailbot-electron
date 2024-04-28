import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
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
  );
};

export default Navigation;
