import { Router } from "express";
import authenticateToken from "../middlewares/authenticateToken.js";
import * as postController from "../controllers/postController.js"
const router = Router();

router.get("/", postController.get);
router.post("/", authenticateToken, postController.create);
router.put("/:id", authenticateToken, postController.update);
router.delete("/:id", authenticateToken, postController.remove);

export default router;
