import express from "express";
import multer from "multer";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import file from "../models/File";
import https from "https";
import nodemailer from "nodemailer";
import emailTemplate from "../utils/emailTemplate";
import cors from "cors";
import bcrypt from "bcrypt";
import UserDetails from "../models/userDetails";
import Email from '../models/Email';
// import { any } from "prop-types";
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

router.post('/email', async (req, res) => {
    console.log('Received request body:', req.body);

    const { id, emailTo, emailFrom } = req.body;
    if (!emailTo) {
      return res.status(400).json({ message: 'Invalid Data' });
    }
  
    // Check if the file exists
    const check_File = await file.findById(id);
    if (!check_File) {
      return res.status(404).json({ message: 'File Does Not Exist' });
    }
    const transporter = nodemailer.createTransport({
      //@ts-ignore
      host: process.env.BREVO_SMTP_HOST,
      port: process.env.BREVO_SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_PASSWORD,
      },
    });

    const { filename, sizeInBytes } = check_File;
    const filesize = `${(Number(sizeInBytes) / (1024 * 1024)).toFixed(2)}MB`;
    const downloadPageLink=check_File.secure_url;
    const mailOptions = {
      from: emailFrom,
      to: emailTo,
      subject: 'File shared with you',
      text: `${emailFrom} shared one image with you `,
      html: emailTemplate(emailFrom, emailTo, downloadPageLink, filename, filesize),
    };
  
    // Sending email using transporter
    console.log('Ready to send the email', req.body);
    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
      }
  
      // Save email history
      try {
        const user = await UserDetails.findOne({ email: emailFrom });
        if (user) {
          user.emailHistory.push({
            to: emailTo,
            subject: mailOptions.subject,
            body: mailOptions.text,
            timestamp: new Date(),
          });
          await user.save();
        }
  
        // Save email information in the Email schema
        const newEmail = new Email({
          file: check_File._id,
          emailFrom,
          emailTo,
          filename,
        });
  
        await newEmail.save();
  
        // Update file sender and receiver
        check_File.sender = emailFrom;
        check_File.reciver = emailTo;
        await check_File.save();
  
        return res.status(200).json({ message: 'Email sent' });
      } catch (error:any) {
        console.error(error);
        return res.status(500).json({ message: 'Error saving email history', error: error.message });
      }
    });
  });
  
router.get('/history/:emailFrom', async (req, res) => {
  try {
    const {emailFrom } = req.params;
    const fileHistory=await file.find({ $or: [{ sender: emailFrom }, { reciver: emailFrom }] }).sort({ createdAt: -1 });
    
    return res.status(200).json({ fileHistory });
  } catch (error:any) {
    console.error('Error fetching file history:', error);
    return res.status(500).json({ message: 'Error fetching file history', error: error.message });
  }
});

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