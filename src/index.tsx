// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
//import { Amplify } from 'aws-amplify';
//import awsconfig from './aws-exports'; // Amplify 設定ファイル
import App from './App';
import '@aws-amplify/ui-react/styles.css'; // Authenticator 用のスタイルをインポート
import './style/tailwind.css';
import { ApolloProvider } from '@apollo/client';
import client from './apollo/client'; 

// Amplify 設定
//Amplify.configure(awsconfig); // aws-exports を使用

// React 18 での新しいレンダリング方法
const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>{/* 認証のラップ */}
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
