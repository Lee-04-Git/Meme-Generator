import React from "react";
import ReactDOM from "react-dom/client";  // Import createRoot from react-dom/client
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root')); // Attach to the root element in index.html
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
