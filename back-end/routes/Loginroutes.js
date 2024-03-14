const express = require("express");
const Loginroutes = express.Router();
const loginDB = require("../models/Loginschema");
const registerDB = require("../models/Registerschema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

Loginroutes.post("/", async (req, res) => {
  try {
    //   console.log(req.body);
    const lower_email = req.body.email.toLowerCase();
    // console.log(lower_email);
    const olduser = await loginDB.findOne({
      email: lower_email,
    });

    if (!olduser) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "User does not exist",
      });
    }

    const passwordmatch = await bcrypt.compare(
      req.body.password,
      olduser.password
    );
    console.log(passwordmatch);

    if (!passwordmatch) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Incorrect Password",
      });
    }

    const token = await jwt.sign(
      {
        UserId: olduser._id,
        UserEmail: olduser.email,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1hr",
      }
    );
    if (token) {
      return res.status(200).json({
        success: true,
        error: false,
        message: "Login Successful",
        token: token,
      });
    } else
      (err) => {
        return res.status(400).json({
          success: false,
          error: true,
          message: "Login failed",
          errormessage: err.message,
        });
      };
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "Network Error",
      errormessage: err.message,
    });
  }
});

module.exports = Loginroutes;
