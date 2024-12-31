import { store } from "./redux/store.js";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import React from "react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    <Toaster
      position="bottom-center"
      toastOptions={{
        className: "",
        style: {
          zIndex: "9999999",
        },
      }}
    />
  </React.StrictMode>
);
