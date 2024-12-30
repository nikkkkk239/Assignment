import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.route.js"
import addressRouter from "./routes/address.route.js"
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
app.use("/api/address",addressRouter);


app.listen(PORT,()=>{
    console.log(`Server started on : ${PORT}`)
    connectDb();
})