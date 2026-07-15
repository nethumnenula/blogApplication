const express = require("express");
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const postRoutes = express.Router();

// GET all
postRoutes.get("/posts", getPosts);

// GET a one
postRoutes.get("/posts/:id", getPost);

// CREATE a one
postRoutes.post("/posts", createPost);

// UPDATE a one
postRoutes.patch("/posts/:id", updatePost);

// DELETE a one
postRoutes.delete("/posts/:id", deletePost);

module.exports = postRoutes;
