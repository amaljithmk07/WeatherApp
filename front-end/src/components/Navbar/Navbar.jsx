import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Navbar = () => {
  const token = sessionStorage.getItem("token");
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
          {hambruger !== true ? (
            <img
              src="/hamburger.png"
              alt=""
              className="hamburger-img"
              onClick={hamburger}
            />
          ) : (
            <img
              src="/hamburger1.png"
              alt=""
              className="hamburger-img"
              onClick={hamburger}
            />
          )}
          {hambruger == true ? (
            <>
              <div className="hamburger-menu-sec">
                <Link
                  to={"/home"}
                  className="hamburger-menu-item"
                  onClick={hamburgerOff}
                >
                  <img
                    src="/search-weather.png"
                    alt=""
                    className="hamburger-menu-title-img"
                  />{" "}
                </Link>
                {token != null ? (
                  <>
                    <Link
                      to={"/saved-location"}
                      className="hamburger-menu-item"
                      onClick={hamburgerOff}
                    >
                      <img
                        src="/saved-location.png"
                        alt=""
                        className="hamburger-menu-title-img"
                      />{" "}
                      {/* Saved Location */}
                    </Link>
                    <Link
                      to={""}
                      className="hamburger-menu-item"
                      onClick={logout}
                    >
                      <img
                        src="/logout.png"
                        alt=""
                        className="hamburger-menu-title-img"
                        style={{
                          height: "14px",
                        }}
                      />{" "}
                      {/* Logout */}
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to={"/"} className="hamburger-menu-item">
                      <img
                        src="/login.png"
                        alt=""
                        className="hamburger-menu-title-img"
                        style={{
                          height: "14px",
                        }}
                      />{" "}
                      {/* Login */}
                    </Link>
                  </>
                )}
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
          {token != null ? (
            <>
              <Link to={"/saved-location"} className="navbar-menu-item">
                Saved Location
              </Link>
              <Link to={""} className="navbar-menu-item" onClick={logout}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to={"/"} className="navbar-menu-item">
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
