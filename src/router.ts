import { Router } from "express";
import { createUser } from "./handlers/user";

const router = Router();

router.post("/user", createUser);

export default router;
