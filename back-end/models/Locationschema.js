const mongoose = require("mongoose");
const Locationschema = new mongoose.Schema({
  login_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "login_db",
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "",
    required: true,
  },
});
const data = mongoose.model("location_db", Locationschema);
module.exports = data;
