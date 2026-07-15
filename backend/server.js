const express = require("express");
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
  .connect("mongodb://localhost:27017/blog")
  .then(() => {
    // listen to the port
    app.listen(4000, () => {
      console.log("Connected to DB and listening on the port 4000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
