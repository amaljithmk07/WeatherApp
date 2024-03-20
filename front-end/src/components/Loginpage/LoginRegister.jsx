import React, { useState } from "react";
import "./LoginRegister.css";
import axios from "axios";
import BASE_URI from "../Constant/BaseUrl";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../Weatherpage/Loading";

const LoginRegister = () => {
  const navigate = useNavigate();

  const [load, setLoad] = useState(false); //loading State

  const [showPass, setShopass] = useState(true); //show hide

  const [logreginputs, SeLogregInputs] = useState({}); //Login Inputs

  const [logReg, SetLogreg] = useState(true);

  //Form change Section

  const loginregisterShowHandler = (e) => {
    if (logReg == true) {
      SetLogreg(false);
    } else {
      window.location.reload();
    }
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

    ///form validation
    setLoad(true);
    let email = document.forms["loginForm"]["email"].value;
    let password = document.forms["loginForm"]["password"].value;
    if (email == "") {
      toast.error("Email is Empty", {
        position: "bottom-center",
      });
      return false;
    } else if (password == "") {
      toast.error("Password is Empty", {
        position: "bottom-center",
      });
      return false;
    }

    axios
      .post(`${BASE_URI}/api/login`, logreginputs)
      .then((data) => {
        console.log(data);
        sessionStorage.setItem("token", data.data.token);
        toast.success("Login Successful", {
          position: "bottom-center",
        });

        setTimeout(() => {
          navigate("/home");
        }, 1000);
      })
      .catch((err) => {
        setLoad(false);
        console.log(err);
        toast.error(err.response.data.message, {
          position: "bottom-center",
        });
      });
  };

  //Register Submit

  const RegisterSubmit = (e) => {
    // console.log(e);
    e.preventDefault();

    setLoad(true);

    ///form validation

    let email = document.forms["registerForm"]["email"].value;
    let password = document.forms["registerForm"]["password"].value;
    let phone = document.forms["registerForm"]["phone"].value;
    if (email == "") {
      toast.error("Email is Empty", {
        position: "bottom-center",
      });
      return false;
    } else if (phone == "") {
      toast.error("Phone is Empty", {
        position: "bottom-center",
      });
      return false;
    } else if (password == "") {
      toast.error("Password is Empty", {
        position: "bottom-center",
      });
      return false;
    }

    axios
      .post(`${BASE_URI}/api/register`, logreginputs)
      .then((data) => {
        console.log(data);
        toast.success("Register Successful", {
          position: "bottom-center",
        });

        setTimeout(() => {
          window.location.reload();
          setLoad(false);
        }, 1000);
      })
      .catch((err) => {
        setLoad(false);
        console.log(err);
        toast.error(err.response.data.message, {
          position: "bottom-center",
        });
      });
  };

  return (
    <div>
      <Toaster />
      <Navbar />
      <div className="login-main-body">
        {load == true ? (
          <>
            <Loading name={load} />
          </>
        ) : (
          <>
            {logReg == true ? (
              //////////------Login Area

              <div className="login-sub-body">
                <div className="login-head">LOGIN</div>
                <form action="" className="login-form-content" name="loginForm">
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
                  <button
                    onClick={loginregisterShowHandler}
                    className="loginregister-button"
                  >
                    Register
                  </button>
                </div>
              </div>
            ) : (
              // /---------Register Area

              <div className="login-sub-body">
                <div className="login-head">REGISTER</div>
                <form
                  action=""
                  className="register-form-content"
                  name="registerForm"
                >
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
                    <button
                      className="register-button"
                      onClick={RegisterSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </form>
                <div className="login-link-sec">
                  Sign into your account?{" "}
                  <button
                    onClick={loginregisterShowHandler}
                    className="loginregister-button"
                  >
                    Login
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LoginRegister;
