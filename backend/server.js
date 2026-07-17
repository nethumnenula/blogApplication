const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const postRoutes = require("./routes/postRoutes")

const app = express();

app.use(cors());

app.use(express.json());
app.use((req, res, next) => {
  console.log("Middleware executed");
  console.log("Method:", req.method);
  console.log("Path:", req.path);
  next();
});

// Routes
app.use("/blog", postRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_LOCAL)
  .then(() => {
    // listen to the port
    app.listen(process.env.PORT, () => {
      console.log(`Connected to DB and listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });