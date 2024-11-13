// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Authenticator } from '@aws-amplify/ui-react'; // Authenticator を追加
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports'; // Amplify 設定ファイル
import App from './App';
import '@aws-amplify/ui-react/styles.css'; // Authenticator 用のスタイルをインポート
import './style/tailwind.css';

// Amplify 設定
Amplify.configure(awsconfig); // aws-exports を使用

// React 18 での新しいレンダリング方法
const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Authenticator> {/* 認証のラップ */}
      <App />
    </Authenticator>
  </React.StrictMode>
);
