import { Route, Routes } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import HomePage from '../pages/HomePage';
import SearchPage from '../pages/SearchPage';
import ItemDetailPage from '../pages/ItemDetailPage';
import NotFoundPage from '../pages/NotFoundPage';
import { ROUTES } from '../utils/routePaths';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.search} element={<SearchPage />} />
        <Route path={ROUTES.item} element={<ItemDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;