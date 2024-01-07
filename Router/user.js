import express from "express";
const router =express.Router();
import { isAuthenticated } from "../Middleware/Auth.js";
import { getMyProfile, login, logout, registerUser } from "../Controller/user.js";
router.post("/new",registerUser);
router.post("/login",login);
router.get("/logout",logout);
router.get("/profile",isAuthenticated,getMyProfile);
export default router;
