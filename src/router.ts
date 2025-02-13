import { Router } from "express";
import { createUser } from "./handlers/user";
import { createProfile } from "./handlers/profile";
import { createPost } from "./handlers/post";

const router = Router();

router.post("/user", createUser);
router.post("/profile", createProfile);
router.post("/post", createPost);

export default router;
