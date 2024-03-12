import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate=useNavigate()
  const logout = () => {
    sessionStorage.clear();
    navigate('/loginregister')
  };
  return (
    <div>
      <div className="navbar-main-body">
        <div className="navbar-title-sec">
          <img src="/title.png" alt="" className="navbar-title" />
        </div>

        <div className="navbar-menu-sec">
          {/* <Link to={"/"}>Saved Location</Link> */}
          <div className="navbar-menu-item">Saved Location</div>
          <div className="navbar-menu-item" onClick={logout}>
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
