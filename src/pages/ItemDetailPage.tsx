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
      <section className="detail-panel">
        <h2>Details</h2>
        <p className="detail-panel__empty">
          Item not found. It may have been removed or the link is invalid.
        </p>
        <Link to={ROUTES.home} className="not-found__link">
          Back to watchlist
        </Link>
      </section>
    );
  }

  return <ItemDetailPanel />;
};

export default ItemDetailPage;