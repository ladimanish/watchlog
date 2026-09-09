import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ItemDetailPanel from '../components/ItemDetailPanel';
import { useWatchlist } from '../hooks/useWatchlist';
import { ROUTES } from '../utils/routePaths';

const ItemDetailPage = () => {
  const { t } = useTranslation('views');
  const { t: tc } = useTranslation('common');
  const { id } = useParams<{ id: string }>();
  const { watchlist, selectItem } = useWatchlist();

  const item = id ? watchlist.find((entry) => entry.id === id) : undefined;

  useEffect(() => {
    if (id && item) {
      selectItem(id);
    } else {
      selectItem(null);
    }
  }, [id, item, selectItem]);

  if (!id || !item) {
    return (
      <section className="glass-panel py-12 text-center">
        <h2 className="section-title mb-2">{t('detail.notFoundTitle')}</h2>
        <p className="section-subtitle mx-auto mb-8 max-w-sm">
          {t('detail.notFoundDescription')}
        </p>
        <Link to={ROUTES.home} className="btn-primary">
          {tc('actions.backToWatchlist')}
        </Link>
      </section>
    );
  }

  return <ItemDetailPanel />;
};

export default ItemDetailPage;
