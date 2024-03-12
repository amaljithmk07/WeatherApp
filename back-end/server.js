const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Userroutes = require("./routes/Userroutes");
const Loginroutes = require("./routes/Loginroutes");
const Registerroutes = require("./routes/Registerroutes");
const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

mongoose
  .connect(
    `mongodb+srv://amaljith:1234567890@cluster0.lfnavyq.mongodb.net/Weather`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });

server.use("/api/register", Registerroutes);
server.use("/api/login", Loginroutes);
server.use("/api/user", Userroutes);

const port = 2222;
server.listen(port, () => {
  console.log(`Server started on Port ${port}`);
});
