import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './style/tailwind.css';  // グローバルCSSがある場合

const rootElement = document.getElementById("root") as HTMLElement;

// アプリケーションをDOMにマウント
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
