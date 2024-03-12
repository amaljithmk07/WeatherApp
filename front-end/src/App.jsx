import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LoginRegister from "./components/Loginpage/LoginRegister";
import Weather from "./components/Weatherpage/Weather";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <LoginRegister/> */}
      <Weather />
    </>
  );
}

export default App;
