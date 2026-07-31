import { NavLink } from 'react-router-dom';
import { ROUTES } from '../utils/routePaths';

const NavBar = () => {
  return (
    <nav className="nav-bar" aria-label="Main navigation">
      <NavLink
        to={ROUTES.home}
        className={({ isActive }) =>
          `nav-bar__link${isActive ? ' nav-bar__link--active' : ''}`
        }
        end
      >
        Home
      </NavLink>

      <NavLink
        to={ROUTES.search}
        className={({ isActive }) =>
          `nav-bar__link${isActive ? ' nav-bar__link--active' : ''}`
        }
      >
        Search
      </NavLink>
    </nav>
  );
};

export default NavBar;