import { Router } from "express";
import Post from "../post.js";
const router = Router();

//TODO: Add auth on write

//TODO: Add pagination
router.get("/", async (_, res) => {
  const posts = await Post.find();
  res.json(posts);
});

router.post("/", async (req, res) => {
  const payload = req.body;
  const post = new Post({ ...payload, createdAt: Date.now() });
  await post.save();
  res.status(201).json(post);
});

router.put("/:id", async (req, res) => {
  const payload = req.body;
  const { id } = req.params;
  const post = await Post.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true }
  );

  res.json(post);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Post.findByIdAndDelete(id);
  res.status(204).end();
});

export default router;
