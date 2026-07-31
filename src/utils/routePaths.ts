export const ROUTES = {
  home: '/',
  search: '/search',
  item: '/item/:id',
} as const;

export const getItemPath = (id: string): string => `/item/${id}`;