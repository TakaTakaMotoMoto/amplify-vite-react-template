import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './configs/Router'; // Router.tsx から router をインポート

const App: React.FC = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
