import express from "express";
const router =express.Router();
import { login, registerUser } from "../Controller/user.js";
router.post("/new",registerUser);
router.get("/login",login);
export default router;
