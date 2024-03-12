const mongoose = require("mongoose");
const Registerschema = new mongoose.Schema({
  login_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "login_db",
    required: true,
  },
  phone: {
    type: Number,
    require: true,
  },
});
const data = mongoose.model("register_db", Registerschema);

module.exports = data;
