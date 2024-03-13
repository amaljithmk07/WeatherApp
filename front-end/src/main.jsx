import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Weather from "./components/Weatherpage/Weather.jsx";
import { Provider } from "react-redux";
import Store from "./redux/store/Store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="index-main">
    <Provider store={Store}>
      <App />
      {/* <Weather/> */}
    </Provider>
  </div>
);
