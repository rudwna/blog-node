import { Router } from "express";
import User from "../user.js";
import jwt from "jsonwebtoken";
import generator from "generate-password";
const router = Router();
const secret = "secret";

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  if (!(username && password)) {
    res.status(400).json({ error: "Username and password is required" });
  }

  const user = await User.findOne({ username: username });
  if (user && password == user.password) {
    const token = jwt.sign({ user_id: user._id, username }, secret, {
      expiresIn: "1h",
    });
    res.json({ ...user.toObject(), token: token });
  } else {
    res.status(401).json({ error: "Invalid username or password" });
  }
});

router.post("/signup", async (req, res) => {
  const payload = req.body;

  const existingUser = await User.findOne(payload);

  //TODO: Store hashed password
  if (!existingUser) {
    const user = new User({
      ...payload,
      password: generator.generate({ numbers: true }),
    });
    await user.save();

    // Unsecure way of returning password
    res.json(user);
  } else {
    res.status(409).json({ error: "Username already exists" });
  }
});

export default router;
