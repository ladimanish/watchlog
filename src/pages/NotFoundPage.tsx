import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../utils/routePaths';

const NotFoundPage = () => {
  const { t } = useTranslation('views');
  const { t: tc } = useTranslation('common');

  return (
    <section className="glass-panel py-12 text-center">
      <p className="mb-4 text-6xl font-bold text-component-primary/20" aria-hidden="true">
        404
      </p>
      <h2 className="section-title mb-2">{t('notFound.title')}</h2>
      <p className="section-subtitle mx-auto mb-8 max-w-sm">
        {t('notFound.description')}
      </p>
      <Link to={ROUTES.home} className="btn-primary">
        {tc('actions.backToWatchlist')}
      </Link>
    </section>
  );
};

export default NotFoundPage;
