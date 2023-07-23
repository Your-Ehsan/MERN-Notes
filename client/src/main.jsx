import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NotesContextProvider } from "./contexts/NotesContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NotesContextProvider>
      <App />
    </NotesContextProvider>
  </React.StrictMode>
);
