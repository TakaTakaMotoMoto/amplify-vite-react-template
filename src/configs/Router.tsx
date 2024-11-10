import { createBrowserRouter } from 'react-router-dom';
import Register from '../pages/Register';  // 具材登録ページ
import NotFound from '../pages/NotFound';  // 404ページ
import Search from '../pages/Search';      // 検索ページ
import SearchResults from '../pages/SearchResult';  // 検索結果表示ページ
import PhotoDisplay from '../pages/PhotoDisplay';  // 写真表示ページ

const router = createBrowserRouter([
  {
    path: '/',
    element: <Register />,  // トップページ
  },
  {
    path: '/search',
    element: <Search />,  // 検索ページ
  },
  {
    path: '/search-results',
    element: <SearchResults />,  // 検索結果表示ページ
  },
  {
    path: '/photo/:photoId',
    element: <PhotoDisplay />,  // 写真表示ページ（パラメータ付き）
  },
  {
    path: '*',
    element: <NotFound />,  // 404ページ
  },
]);

export default router;
