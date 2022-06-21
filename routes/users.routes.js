import { Router } from "express";
import User from "../user.js";
import jwt from "jsonwebtoken";
import generator from "generate-password";
import bcrypt from "bcrypt";
const router = Router();
const hashRounds = 10;

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  if (!(username && password)) {
    res.status(400).json({ error: "Username and password is required" });
  }

  const user = await User.findOne({ username: username });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ user_id: user._id, username }, req.app.locals.secret, {
      expiresIn: "1h",
    });

    const { password, ...userWithoutPassword } = user.toObject();

    res.json({ ...userWithoutPassword, token: token });
  } else {
    res.status(401).json({ error: "Invalid username or password" });
  }
});

router.post("/signup", async (req, res) => {
  const payload = req.body;
  const existingUser = await User.findOne(payload);

  if (!existingUser) {
    const generatedPassword = generator.generate({ numbers: true });
    const encryptedPassword = await bcrypt.hash(generatedPassword, hashRounds);
    const user = new User({
      ...payload,
      password: encryptedPassword,
    });
    await user.save();

    // Unsecure way of returning password but should be ok for demo app
    res.json({ ...user.toObject(), password: generatedPassword });
  } else {
    res.status(409).json({ error: "Username already exists" });
  }
});

export default router;
