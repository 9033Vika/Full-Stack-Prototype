import express from "express";
import { addCouse, getCourse, deleteCouse } from "../controller/cource.js";
import { isAuthenticated } from "../middleware/authenticated.js";

const router = express.Router();

router.get("/getCourse/:id", getCourse);

router.use(isAuthenticated);

router.post("/addCourse/:id", addCouse);
router.post("/deleteCourse/:id", deleteCouse);

export default router;
