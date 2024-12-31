import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import courceRoute from "./routes/cource.js";
import classRoute from "./routes/class.js";
import userRoute from "./routes/user.js";
import cartRoute from "./routes/cart.js";
import subjectRoute from "./routes/subject.js";
import noteRoute from "./routes/note.js";
import connection from "./utils/connectDb.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import Razorpay from "razorpay";

const app = express();

dotenv.config({ path: "./.env" });

cloudinary.config({
  cloud_name: process.env.NAME,
  api_key: process.env.KEY,
  api_secret: process.env.SEC,
});

export const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

connection(process.env.MONGO_URI);

app.use(urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["https://coursesellingfullstackprototypefrontend.onrender.com"],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/courses", classRoute);
app.use("/api/class", courceRoute);
app.use("/api/course", subjectRoute);
app.use("/api/note", noteRoute);
app.use("/api/user", userRoute);
app.use("/api/cart", cartRoute);

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});

export default app;
