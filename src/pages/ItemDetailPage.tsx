import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ItemDetailPanel from '../components/ItemDetailPanel';
import { useWatchlist } from '../context/WatchlistContext';
import { ROUTES } from '../utils/routePaths';

const ItemDetailPage = () => {
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
        <h2 className="section-title mb-2">Item not found</h2>
        <p className="section-subtitle mx-auto mb-8 max-w-sm">
          It may have been removed from your watchlist or the link is invalid.
        </p>
        <Link to={ROUTES.home} className="btn-primary">
          Back to watchlist
        </Link>
      </section>
    );
  }

  return <ItemDetailPanel />;
};

export default ItemDetailPage;
