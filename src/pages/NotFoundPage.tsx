import { Link } from 'react-router-dom';
import { ROUTES } from '../utils/routePaths';

const NotFoundPage = () => {
  return (
    <section className="not-found">
      <h2>Page not found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to={ROUTES.home} className="not-found__link">
        Back to watchlist
      </Link>
    </section>
  );
};

export default NotFoundPage;