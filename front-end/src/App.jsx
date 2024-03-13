import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LoginRegister from "./components/Loginpage/LoginRegister";
import Weather from "./components/Weatherpage/Weather";
import Savedlocation from "./components/Weatherpage/Savedlocation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Demo from "./components/Weatherpage/Demo";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginRegister />} />
          <Route path="/home" element={<Weather />} />
          <Route path="/saved-location" element={<Savedlocation />} />
          {/* <Route path="/saved-location" element={<Demo />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
