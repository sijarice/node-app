import { Router } from "express";
import { createUser, loginUser } from "./handlers/user";
import { createProfile, deleteProfile } from "./handlers/profile";
import { createPost } from "./handlers/post";

const router = Router();

router.post("/user", createUser);
router.post("/login", loginUser);

router.post("/profile", createProfile);
router.delete("/profile/:id", deleteProfile);

router.post("/post", createPost);

export default router;
