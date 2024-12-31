import express from "express";
import { register, login, logout, getMyProfile } from "../controller/user.js";
import { isAuthenticated } from "../middleware/authenticated.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.use(isAuthenticated);

router.get("/profile", getMyProfile);
router.get("/logout", logout);

export default router;
