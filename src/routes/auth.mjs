import express from "express";
const router = express.Router();
import { loginUser, signupUser, profileUser } from "../controllers/auth/auth.mjs";

router.post("/signup", signupUser);

router.post("/login", loginUser);

router.get("/profile", profileUser);

export { router };