const express = require("express");
const Registerroutes = express.Router();
const RegisterDB = require("../models/Registerschema");
const LoginDB = require("../models/Loginschema");
const bcrypt = require("bcryptjs");

Registerroutes.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const lower_email = req.body.email.toLowerCase();
    const oldemail = await LoginDB.findOne({
      email: lower_email,
    });

    if (oldemail) {
      return res.status(400).json({
        success: true,
        error: false,
        message: "User already exist",
      });
    }
    const oldPhone = await RegisterDB.findOne({
      phone: req.body.phone,
    });

    if (oldPhone) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Phone Number already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    console.log(hashedPassword);
    const log = {
      email: lower_email,
      password: hashedPassword,
    };
    const logResult = await LoginDB(log).save();

    const reg = {
      login_id: logResult._id,
      phone: req.body.phone,
    };
    const regResult = await RegisterDB(reg).save();

    if (logResult && regResult) {
      return res.status(200).json({
        success: true,
        error: false,
        message: "Register Successful",
      });
    } else
      (err) => {
        return res.status(400).json({
          success: false,
          error: true,
          message: "Register Failed",
          errormessage: err.message,
        });
      };
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "Network error",
      errormessage: err.message,
    });
  }
});

module.exports = Registerroutes;
