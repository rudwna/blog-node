import { Router } from "express";
import Post from "../post.js";
import authenticateToken from "../middlewares/authenticateToken.js";
const router = Router();

//TODO: Add auth on write

//TODO: Add pagination
router.get("/", async (_, res) => {
  const posts = await Post.find();
  res.json(posts);
});

router.post("/", authenticateToken, async (req, res) => {
  const payload = req.body;
  const post = new Post({
    ...payload,
    createdAt: Date.now(),
    author: req.user.user_id,
  });

  await post.save();
  res.status(201).json(post);
});

router.put("/:id", authenticateToken, async (req, res) => {
  const payload = req.body;
  const { id } = req.params;


  const post = await Post.findById(id)
  console.log(post.author.toString())
  console.log(req.user.user_id)

  if (!post) {
    return res.status(404).end()
  } else if (post.author.toString() != req.user.user_id) {
    return res.status(403).end()
  }

  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true }
  );

  res.json(updatedPost);
});

router.delete("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id)
  if (!post) {
    return res.status(404).end()
  } else if (post.author != req.user.user_id) {
    return res.status(403).end()
  }

  await Post.findByIdAndDelete(id);
  res.status(204).end();
});

export default router;
