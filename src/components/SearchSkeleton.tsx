const SearchSkeleton = () => {
  return (
    <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2" aria-label="Loading search results">
      {Array.from({ length: 4 }).map((_, index) => (
        <li
          key={index}
          className="flex animate-pulse gap-4 rounded-xl border border-border/50 bg-surface-muted/30 p-3"
        >
          <div className="h-24 w-16 shrink-0 rounded-lg bg-surface-muted" />
          <div className="flex flex-1 flex-col justify-between gap-2 py-1">
            <div className="space-y-2">
              <div className="h-4 w-3/4 rounded bg-surface-muted" />
              <div className="h-3 w-1/2 rounded bg-surface-muted" />
            </div>
            <div className="h-9 rounded-xl bg-surface-muted" />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SearchSkeleton;
