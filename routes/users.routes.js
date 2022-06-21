import { Router } from "express";
import * as userController from "../controllers/userController.js";

const router = Router();
const hashRounds = 10;

router.post("/signin", userController.signin);

router.post("/signup", userController.signup);

export default router;
