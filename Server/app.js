const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());

app.use(cors());

const hotelRoutes = require("./routes/hotel");
const adminRoutes = require("./routes/admin");

app.use(hotelRoutes);
app.use("/admin", adminRoutes);

mongoose
  .connect(
    "mongodb+srv://quangvhfx22065:7UPuKTJnxLw00hNf@cluster0.nhlidry.mongodb.net/hoteldb?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((result) => {
    console.log("connected");
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
