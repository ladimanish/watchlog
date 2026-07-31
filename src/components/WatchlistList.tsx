import { useNavigate } from 'react-router-dom';
import WatchItemCard from './WatchItemCard';
import { useWatchlist } from '../context/WatchlistContext';
import { getItemPath } from '../utils/routePaths';

const WatchlistList = () => {
  const navigate = useNavigate();
  const { watchlist, selectedId, removeItem, selectItem } = useWatchlist();

  const handleSelect = (id: string) => {
    selectItem(id);
    navigate(getItemPath(id));
  };

  if (watchlist.length === 0) {
    return (
      <section className="watchlist-list">
        <h2>My Watchlist</h2>
        <p className="watchlist-list__empty">
          Your watchlist is empty. Go to Search to add movies or books.
        </p>
      </section>
    );
  }

  return (
    <section className="watchlist-list">
      <h2>My Watchlist ({watchlist.length})</h2>

      {watchlist.map((item) => (
        <WatchItemCard
          key={item.id}
          item={item}
          isSelected={selectedId === item.id}
          onSelect={handleSelect}
          onRemove={removeItem}
        />
      ))}
    </section>
  );
};

export default WatchlistList;