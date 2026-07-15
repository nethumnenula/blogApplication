const mongoose = require("mongoose");
const Post = require("../models/postModel");

// GET all posts
const getPosts = async (req, res) => {
  const posts = await Post.find({}).sort({ createdAt: -1 });
  res.status(200).json(posts);
};

// GET a single post
const getPost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Post" });
  }
  const post = await Post.findById(id);
  if (!post) {
    return res.status(404).json({ error: "No such Post" });
  }
  res.status(200).json(post);
};

// CREATE a new post
const createPost = async (req, res) => {
  const { title, description, content, author, dateCreated } = req.body;
  try {
    const post = await Post.create({
      title,
      description,
      content,
      author,
      dateCreated,
    });
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
};

// UPDATE a post
const updatePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }
  const post = await Post.findByIdAndUpdate(
    { id },
    { ...req.body },
    { new: true },
  );
  if(!post){
    return res.status(404).json({ error: "No such post" })
  }
  res.status(200).json(post);
};

// DELETE a post
const deletePost = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: "No such post" });
    }
    const post = await Post.findByIdAndDelete({id});
    if(!post){
        return res.status(404).json({ error: "No such post" })
    }
    res.status(200).json(post);
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
