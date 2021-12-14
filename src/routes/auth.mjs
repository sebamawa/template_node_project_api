import express from "express";
const router = express.Router();
import { loginUser, signupUser, profileUser } from "../controllers/auth/auth.mjs";
import { verifyJWSToken } from "../helpers/auxiliaryFunctions.mjs";

router.post("/signup", signupUser);

router.post("/login", loginUser);

router.get("/profile", verifyJWSToken, profileUser);

export { router };