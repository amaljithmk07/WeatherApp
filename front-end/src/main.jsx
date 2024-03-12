import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Weather from "./components/Weatherpage/Weather.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="index-main">
    {/* <App /> */}
    <Weather/>
  </div>
);
