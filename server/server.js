import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import fileRoute from "./routes/files.js";
import { v2 as cloudinary } from "cloudinary";
import bodyParser from 'body-parser'; 
const app=express();
dotenv.config();
cloudinary.config({
    cloud_name:process.env.cloudinary_cloud_name,
    api_key:process.env.cloudinary_api_key,
    api_secret:process.env.cloudinary_api_secret
})


connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '30mb' })) 
app.use("/api/files",fileRoute);
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`server is listening on PORT ${PORT}`));

export default app; 

