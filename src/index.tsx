// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // ReactDOM.createRoot は 'react-dom/client' からインポート
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports'; // Amplify 設定ファイル
import App from './App';
import './index.css';

// Amplify 設定
Amplify.configure(awsconfig);

// React 18 での新しいレンダリング方法
const root = ReactDOM.createRoot(document.getElementById('root')!); // root 要素に対して root を作成

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
