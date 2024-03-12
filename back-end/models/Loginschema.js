const mongoose = require("mongoose");
const Loginschema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
})

const Data = mongoose.model("login_db", Loginschema);
module.exports = Data;
