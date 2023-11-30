import express from "express";
import multer from "multer";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import file from "../models/File";
const router=express.Router();
const storage=multer.diskStorage({});

let upload=multer({storage})
router.post("/upload",upload.single("myFile"),async(req,res)=>{
try {
    if(!req.file)
    {
        return res.status(400).json({message:"Hey Bro Please Upload the File"});
    }
    console.log(req.file);
    let uploadedFile:UploadApiResponse;
    try {
        uploadedFile = await cloudinary.uploader.upload(req.file.path,{
            folder:"MajorProject",
            resource_type:"auto"
        })
    } catch (error:any) {
        console.log(error.message);
        return res.status(400).json({message:"Cloudinary error"});
    }
    const {originalname}=req.file;
    const { secure_url, bytes, format } = uploadedFile;
    const File=await file.create({
        filename:originalname,
        sizeInBytes:bytes,
        secure_url,
        format,
    })
    res.status(200).json({
        id:File._id,
        downloadPageLink:`${process.env.api_base_endpoint_client}download/${File._id}`
    });
} catch (error:any) {
    console.log(error.message);
    res.status(500).json({message:"server error"});
}
})
export default router;