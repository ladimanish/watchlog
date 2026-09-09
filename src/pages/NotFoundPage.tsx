import { Link } from 'react-router-dom';
import { ROUTES } from '../utils/routePaths';

const NotFoundPage = () => {
  return (
    <section className="glass-panel py-12 text-center">
      <p className="mb-4 text-6xl font-bold text-component-primary/20" aria-hidden="true">
        404
      </p>
      <h2 className="section-title mb-2">Page not found</h2>
      <p className="section-subtitle mx-auto mb-8 max-w-sm">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link to={ROUTES.home} className="btn-primary">
        Back to watchlist
      </Link>
    </section>
  );
};

export default NotFoundPage;
