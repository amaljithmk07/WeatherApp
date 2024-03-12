import React, { useState } from "react";
import "./LoginRegister.css";
import axios from "axios";
import BASE_URI from "../Constant/BaseUrl";
import Navbar from "../Navbar/Navbar";

const LoginRegister = () => {
  const [showPass, setShopass] = useState(true); //show hide

  const [logreginputs, SeLogregInputs] = useState({}); //Login Inputs

  const [logReg, SetLogreg] = useState(true);

  //Form change Section

  const loginRegister = (e) => {
    SetLogreg((prev) => !prev);
  };
  //Password hide and show
  const showPassword = () => {
    setShopass((prev) => !prev);
  };

  //Login-register Inputs

  const inputHandler = (e) => {
    const { name, value } = e.target;
    SeLogregInputs({ ...logreginputs, [name]: value });
  };
  //   console.log(logininput);

  //login Submit

  const loginSubmit = (e) => {
    // console.log(e);
    e.preventDefault();
    axios
      .post(`${BASE_URI}/api/login`, logreginputs)
      .then((data) => {
        console.log(data);
        sessionStorage.setItem("token", data.data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Register Submit

  const RegisterSubmit = (e) => {
    // console.log(e);
    e.preventDefault();
    axios
      .post(`${BASE_URI}/api/register`, logreginputs)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="login-main-body">
        {logReg == true ? (
          //////////------Login Area

          <div className="login-sub-body">
            <div className="login-head">LOGIN</div>
            <form action="" className="login-form-content">
              <div className="login-input-sec">
                <img src="/userlogin.png" alt="" className="login-icon" />
                <input
                  type="text"
                  className="login-input"
                  placeholder="Email"
                  name="email"
                  onChange={inputHandler}
                />
              </div>
              <div className="login-input-sec">
                {showPass == true ? (
                  <img
                    src="/closed-eye-login.png"
                    alt=""
                    className="login-icon"
                    onClick={showPassword}
                  />
                ) : (
                  <img
                    src="/open-eye-login.png"
                    alt=""
                    className="login-icon"
                    onClick={showPassword}
                  />
                )}
                <input
                  type={showPass ? "password" : "text"}
                  className="login-input"
                  placeholder="Password"
                  name="password"
                  onChange={inputHandler}
                />
              </div>
              <div className="login-button-sec">
                <button className="login-button" onClick={loginSubmit}>
                  Submit
                </button>
              </div>
            </form>
            <div className="login-link-sec">
              Don't have an account?
              <button onClick={loginRegister} className="loginregister-button">
                Register
              </button>
            </div>
          </div>
        ) : (
          // /---------Register Area

          <div className="login-sub-body">
            <div className="login-head">REGISTER</div>
            <form action="" className="register-form-content">
              <div className="register-input-sec">
                <img src="/userlogin.png" alt="" className="login-icon" />
                <input
                  type="text"
                  className="register-input"
                  placeholder="Email"
                  name="email"
                  onChange={inputHandler}
                />
              </div>
              <div className="register-input-sec">
                <img src="/phone.png" alt="" className="login-icon" />
                <input
                  type="number"
                  className="register-input"
                  placeholder="Phone"
                  name="phone"
                  onChange={inputHandler}
                />
              </div>
              <div className="register-input-sec">
                {showPass == true ? (
                  <img
                    src="/closed-eye-login.png"
                    alt=""
                    className="login-icon"
                    onClick={showPassword}
                  />
                ) : (
                  <img
                    src="/open-eye-login.png"
                    alt=""
                    className="login-icon"
                    onClick={showPassword}
                  />
                )}
                <input
                  type={showPass ? "password" : "text"}
                  className="register-input"
                  placeholder="Password"
                  name="password"
                  onChange={inputHandler}
                />
              </div>
              <div className="register-button-sec">
                <button className="register-button" onClick={RegisterSubmit}>
                  Submit
                </button>
              </div>
            </form>
            <div className="login-link-sec">
              Sign into your account?{" "}
              <button onClick={loginRegister} className="loginregister-button">
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginRegister;
