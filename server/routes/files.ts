import express from "express";
import multer from "multer";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import file from "../models/File";
import https from "https";
import nodemailer from "nodemailer";
import emailTemplate from "../utils/emailTemplate";
import { error } from "console";
import cors from "cors";
import bcrypt from "bcrypt";
import UserDetails from "../models/userDetails";
express().use(cors());
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

//creating a new route
//req->request res->response
//first we need to grab the id from the request.params
router.get("/:id",async (req,res)=>{
try {
    const id = req.params.id;
    const check_File=await file.findById(id);
    if(!check_File)
    {
        return res.status(404).json({message:"File Does Not Exist"})
    }
    const {filename,format,sizeInBytes}=check_File
    return res.status(200).json({
            name:filename,
            sizeInBytes,
            format:format,
            id,
    })
} catch (error) {
    return res.status(500).json({message:"server error"});
}
}) 

router.get("/:id/download",async (req,res)=>{
    try {
        const id = req.params.id;
        const check_File=await file.findById(id);
        if(!check_File)
        {
            return res.status(404).json({message:"File Does Not Exist"})
        }
        //this will give me the response as filestream 
        https.get(check_File.secure_url,(fileStream)=>
        //to make this as downloadable 
        fileStream.pipe(res));
        
    } catch (error) {
        return res.status(500).json({message:"server error"});
    }
}) 

router.post("/email",async (req,res)=>{
    console.log("Received request body:", req.body);
    //validate request 
    const{id,emailFrom,emailTo}=req.body;
    if(!emailFrom || !emailTo)
    {
        return(res.status(400).json({message:"Invalid Data"}))
    }
    //check if the file exists 
    const check_File=await file.findById(id);
    if(!check_File)
    {
        return res.status(404).json({message:"File Does Not Exist"})
    }
    //create transporter
    let transporter = nodemailer.createTransport({
        // @ts-ignore
        host:process.env.BREVO_SMTP_HOST,
        port: process.env.BREVO_SMTP_PORT,
        secure: false,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user:process.env.BREVO_SMTP_USER,
          pass:process.env.BREVO_SMTP_PASSWORD,
        },
      });

      //preparing the email data
      const{filename,sizeInBytes}=check_File;
      console.log("preparing the email data",req.body)
      const filesize=`${(Number(sizeInBytes)/(1024*1024)).toFixed(2)}MB`;
      
      const downloadPageLink=`${process.env.api_base_endpoint_client}download/${id}`
      const mailOptions={
        from: emailFrom, // sender address
        to: emailTo, // list of receivers
        subject: "file share with you ", // Subject line
        text: `${emailFrom} shared one image to you `, // plain text body
        html: emailTemplate(emailFrom,emailTo,downloadPageLink,filename,filesize), // html body
      }

      //sending email using tansporter
      console.log(error)
      console.log("ready to send the fail",req.body)
      
        transporter.sendMail(mailOptions,async (error,info)=>{
            if(error){
                console.log(error);
                return res.status(500).json({message:"server error",error:error.message});
            }
            check_File.sender=emailFrom;
            check_File.reciver=emailTo;

            await check_File.save();
            return res.status(200).json({message:"Email sent"});

        });
        

      // save the data and send the response

})

router.post("/signup",async(req,res)=>{
    const { fname, lname, email, password } = req.body;
     // Basic validation
     if (!fname || !lname || !email || !password) {
        return res.status(400).json({ error: 'Please fill in all fields.' });
    }
    const encryptedPassword=await bcrypt.hash(password,6);
    try {
        // Check if the email is already registered
        const existingUser: Document | null = await UserDetails.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered.' });
        }
        // Create a new user
        const newUser = await UserDetails.create({
            fname,
            lname,
            email,
            password:encryptedPassword, // Replace with hashedPassword if you decide to hash the password
        });
        res.status(201).json({
            status: 'ok',
            user: {
                _id: newUser._id,
                fname: newUser.get('fname'),
                lname: newUser.get('lname'),
                email: newUser.get('email'),
                // Omit the password for security reasons
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post("/login",async (req,res)=>{
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Please provide email and password.' });
      }
    try {
        const user = await UserDetails.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
          }
          res.status(200).json({
            status: 'ok',
            user: {
              _id: user._id,
              fname: user.fname,
              lname: user.lname,
              email: user.email,
            },
          });
    } catch (error) {
        console.error(error);
    res.status(500).json({ error: 'Internal Server Error' }); 
    }
})

router.delete('/delete-account', async (req, res) => {
    const { email, fname, lname } = req.body;
  
    if (!email || !fname || !lname) {
      return res.status(400).json({ error: 'Email, fname, and lname are required for account deletion' });
    }
  
    try {
      const deletedUser = await UserDetails.findOneAndDelete({ email, fname, lname });
  
      if (deletedUser) {
        return res.json({ status: 'ok', message: 'Account deleted successfully' });
      } else {
        return res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });  

router.get("/profile/:id", async (req, res) => {
    try {
      const userId = req.params.id;
      
      // Check if the user exists
      const user = await UserDetails.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Return user information
      res.status(200).json({
        _id: user._id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
export default router;