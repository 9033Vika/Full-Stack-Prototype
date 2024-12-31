import express from "express";
import { addClass, getClass, deleteClass } from "../controller/class.js";
import { isAuthenticated } from "../middleware/authenticated.js";

const router = express.Router();

router.get("/getClass", getClass);

router.use(isAuthenticated);

router.post("/addClass", addClass);
router.post("/deleteClass", deleteClass);

export default router;
