import express from "express";
import { isAuthenticated } from "../middleware/authenticated.js";
import { getSubject, addSubject, deleteSubject } from "../controller/subject.js";

const router = express.Router();

router.get("/getSubject/:id", getSubject);

router.use(isAuthenticated);

router.post("/addSubject/:id", addSubject);
router.post("/deleteSubject/:id", deleteSubject);

export default router;
