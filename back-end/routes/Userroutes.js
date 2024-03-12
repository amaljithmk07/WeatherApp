const express = require("express");
const CheckAuth = require("../middle-ware/CheckAuth");
const Userroutes = express.Router();
const LocationDB = require("../models/Locationschema");

//Location Save
Userroutes.post("/saved-location", CheckAuth, async (req, res) => {
  try {
    const Data = req.body[0];
    // console.log(Data);
    const oldlocation = await LocationDB.findOne({
      location: Data,
    });
    if (oldlocation) {
      return res.status(400).json({
        succes: false,
        error: true,
        message: "Location already added",
      });
    }

    const data = {
      login_id: req.userData.UserId,
      location: Data,
      status: "saved",
    };
    const result = await LocationDB(data).save();
    if (result) {
      return res.status(200).json({
        succes: true,
        error: false,
        message: "Location added successful",
      });
    }
  } catch (err) {
    return res.status(400).json({
      succes: false,
      error: true,
      errormessage: err.message,
      message: "Location added failed",
    });
  }
});

//View Saved Location
Userroutes.get("/view-saved-location", CheckAuth, async (req, res) => {
  try {
    await LocationDB.find({
      login_id: req.userData.UserId,
    })
      .then((data) => {
        res.status(200).json({
          success: false,
          error: true,
          data: data,
          message: "Saved location view failed",
        });
      })
      .catch((err) => {
        res.status(400).json({
          success: false,
          error: true,
          message: "Saved location view failed",
          errormessage: err.message,
        });
      });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: true,
      message: "Network Failed",
      errormessage: err.message,
    });
  }
});

module.exports = Userroutes;
