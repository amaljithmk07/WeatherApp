import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LoginRegister from "./components/Loginpage/LoginRegister";
import Weather from "./components/Weatherpage/Weather";
import Savedlocation from "./components/Weatherpage/Savedlocation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginRegister />} />
          <Route path="/loginregister" element={<LoginRegister />} />
          <Route path="/home" element={<Weather />} />
          <Route path="/location" element={<Savedlocation />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
