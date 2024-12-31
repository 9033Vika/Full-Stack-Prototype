import express from "express";
import { isAuthenticated } from "../middleware/authenticated.js";
import { getNote, addNote, deleteNote, addImages } from "../controller/note.js";
import { multerUpload } from "../middleware/multer.js";

const router = express.Router();

router.get("/getNote/:id", getNote);

router.use(isAuthenticated);

router.post("/addImages/:id", multerUpload.array("files"), addImages);
router.post("/addNote/:id", addNote);
router.post("/deleteNote/:id", deleteNote);

export default router;
