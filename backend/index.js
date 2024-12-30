import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.route.js"
import locationRouter from "./routes/location.route.js"
import { connectDb } from "./lib/connectDb.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001 ;

app.use(cors(
    {origin:"http://localhost:5173",credentials:true}
));
app.use(express.json());
app.use(cookieParser())

app.use("/api/auth",authRouter);
app.use("/api/location",locationRouter)

app.listen(PORT,()=>{
    console.log(`Server started on : ${PORT}`)
    connectDb();
})