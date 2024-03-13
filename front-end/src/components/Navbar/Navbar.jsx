import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.clear();
    toast.success("Logout Successful", {
      position: "bottom-center",
    });
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  return (
    <div>
      <Toaster />
      <div className="navbar-main-body">
        <div className="navbar-title-sec">
          <img src="/title.png" alt="" className="navbar-title" />
          {/* <img src="/logo.png" alt="" className="navbar-logo" /> */}
        </div>

        <div className="navbar-menu-sec">
          <Link to={"/home"} className="navbar-menu-item">
            Home
          </Link>
          <Link to={"/saved-location"} className="navbar-menu-item">
            Saved Location
          </Link>
          <Link to={""} className="navbar-menu-item" onClick={logout}>
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
