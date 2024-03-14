import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Navbar = () => {
  const [hambruger, setHambruger] = useState(false);
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

  const hamburger = () => {
    setHambruger((prev) => !prev);
  };

  const hamburgerOff = () => {
    setHambruger(false);
  };
  return (
    <div>
      <Toaster />
      <div className="navbar-main-body">
        <div className="navbar-title-sec">
          <img src="/title.png" alt="" className="navbar-title" />
        </div>
        <div className="hamburger-sec">
          <img
            src="/hamburger.png"
            alt=""
            className="hamburger-img"
            onClick={hamburger}
          />
          {hambruger == true ? (
            <>
              <div className="hamburger-menu-sec">
                <Link
                  to={"/home"}
                  className="hamburger-menu-item"
                  onClick={hamburgerOff}
                >
                  Home
                </Link>
                <Link
                  to={"/saved-location"}
                  className="hamburger-menu-item"
                  onClick={hamburgerOff}
                >
                  Saved Location
                </Link>
                <Link to={""} className="hamburger-menu-item" onClick={logout}>
                  Logout
                </Link>
              </div>
            </>
          ) : (
            <></>
          )}
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
