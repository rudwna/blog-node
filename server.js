import express, { json } from "express";
import { mongoose } from "mongoose";
import Post from "./post.js";
const { connect } = mongoose;
const app = express();
const port = 3000;

connect("mongodb://blog-node:blog-node@localhost:27017/blog-node");

app.use(json());

app.get("/posts", async (_, res) => {
  const posts = await Post.find();
  res.json(posts);
});

app.post("/posts", async (req, res) => {
  const payload = req.body;
  const post = new Post(payload);
  await post.save();
  res.status(201).end();
});

app.put("/posts/:id", async (req, res) => {
  const payload = req.body;
  const { id } = req.params;
  const post = await Post.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true }
  );

  res.json(post);
});

app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  await Post.findByIdAndDelete(id);
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Blog running on port ${port}`);
});
