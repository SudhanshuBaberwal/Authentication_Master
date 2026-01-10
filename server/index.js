import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import authRoute from "./routes/route.js";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
app.use(cors({origin : "http://localhost:5173", credentials : true}))
dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
// connect db
connectDB();

app.listen(3000, () => {
  console.log("Server running successfully");
});
