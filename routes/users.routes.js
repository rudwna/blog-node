import { Router } from "express";
import User from "../user.js";
import generator from "generate-password";
const router = Router();

router.post("/signin", async (req, res) => {
  const payload = req.body;
  // logic
});

router.post("/signup", async (req, res) => {
  const payload = req.body;

  const existingUser = await User.findOne(payload);

  if (!existingUser) {
    const user = new User({
      ...payload,
      password: generator.generate({ numbers: true }),
    });
    await user.save();

    // Unsecure way of returning password
    res.json(user);
  } else {
    res.status(409).json({error: "Username already exists"})
  }
});

export default router;
