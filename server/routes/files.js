// import express from "express";
// import multer from "multer";
// import { v2 as cloudinary } from "cloudinary";
// import file from "../models/File.js";
// import https from "https";
// import nodemailer from "nodemailer";
// import emailTemplate from "../utils/emailTemplate.js";
// import cors from "cors";
// import bcrypt from "bcrypt";
// import UserDetails from "../models/userDetails.js";
// import Email from '../models/Email.js';
// import logger from "../logger/logging.js";
// express().use(cors());
// const router = express.Router();
// const storage = multer.diskStorage({});

// let upload = multer({ storage });

// router.post("/upload", upload.single("myFile"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "Hey Bro Please Upload the File" });
//     }
//     logger.info(req.file);
//     let uploadedFile; // Semicolon added here
//     try {
//       uploadedFile = await cloudinary.uploader.upload(req.file.path, {
//         folder: "MajorProject",
//         resource_type: "auto",
//       });
//     } catch (error) {
//       console.log(error.message);
//       return res.status(400).json({ message: "Cloudinary error" });
//     }
//     const { originalname } = req.file;
//     const { secure_url, bytes, format } = uploadedFile;
//     const File = await file.create({
//       filename: originalname,
//       sizeInBytes: bytes,
//       secure_url,
//       format,
//     });
//     res.status(200).json({
//       id: File._id,
//       downloadPageLink: `${process.env.api_base_endpoint_client}download/${File._id}`,
//     });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ message: "server error" });
//   }
// });

// router.get("/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const check_File = await file.findById(id);
//     if (!check_File) {
//       return res.status(404).json({ message: "File Does Not Exist" });
//     }
//     const { filename, format, sizeInBytes } = check_File;
//     return res.status(200).json({
//       name: filename,
//       sizeInBytes,
//       format: format,
//       id,
//     });
//   } catch (error) {
//     return res.status(500).json({ message: "server error" });
//   }
// });

// router.get("/:id/download", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const check_File = await file.findById(id);
//     if (!check_File) {
//       return res.status(404).json({ message: "File Does Not Exist" });
//     }
//     https.get(check_File.secure_url, (fileStream) =>
//       fileStream.pipe(res)
//     );
//   } catch (error) {
//     return res.status(500).json({ message: "server error" });
//   }
// });

// router.post('/email', async (req, res) => {
//   console.log('Received request body:', req.body);

//   const { id, emailTo, emailFrom } = req.body;
//   if (!emailTo) {
//     return res.status(400).json({ message: 'Invalid Data' });
//   }

//   const check_File = await file.findById(id);
//   if (!check_File) {
//     return res.status(404).json({ message: 'File Does Not Exist' });
//   }
//   const transporter = nodemailer.createTransport({
//     //@ts-ignore
//     host: process.env.BREVO_SMTP_HOST,
//     port: process.env.BREVO_SMTP_PORT,
//     secure: false,
//     auth: {
//       user: process.env.BREVO_SMTP_USER,
//       pass: process.env.BREVO_SMTP_PASSWORD,
//     },
//   });

//   const { filename, sizeInBytes } = check_File;
//   const filesize = `${(Number(sizeInBytes) / (1024 * 1024)).toFixed(2)}MB`;
//   const downloadPageLink = check_File.secure_url;
//   const mailOptions = {
//     from: emailFrom,
//     to: emailTo,
//     subject: 'File shared with you',
//     text: `${emailFrom} shared one image with you `,
//     html: emailTemplate(emailFrom, emailTo, downloadPageLink, filename, filesize),
//   };

//   console.log('Ready to send the email', req.body);
//   transporter.sendMail(mailOptions, async (error, info) => {
//     if (error) {
//       console.log(error);
//       return res.status(500).json({ message: 'Server error', error: error.message });
//     }

//     try {
//       const user = await UserDetails.findOne({ email: emailFrom });
//       if (user) {
//         user.emailHistory.push({
//           to: emailTo,
//           subject: mailOptions.subject,
//           body: mailOptions.text,
//           timestamp: new Date(),
//         });
//         await user.save();
//       }

//       const newEmail = new Email({
//         file: check_File._id,
//         emailFrom,
//         emailTo,
//         filename,
//       });

//       await newEmail.save();

//       check_File.sender = emailFrom;
//       check_File.reciver = emailTo;
//       await check_File.save();

//       return res.status(200).json({ message: 'Email sent' });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: 'Error saving email history', error: error.message });
//     }
//   });
// });

// router.get('/history/:emailFrom', async (req, res) => {
//   try {
//     const { emailFrom } = req.params;
//     const fileHistory = await file.find({ $or: [{ sender: emailFrom }, { reciver: emailFrom }] }).sort({ createdAt: -1 });
    
//     return res.status(200).json({ fileHistory });
//   } catch (error) {
//     console.error('Error fetching file history:', error);
//     return res.status(500).json({ message: 'Error fetching file history', error: error.message });
//   }
// });

// router.post("/signup", async (req, res) => {
//   const { fname, lname, email, password } = req.body;
//   if (!fname || !lname || !email || !password) {
//     return res.status(400).json({ error: 'Please fill in all fields.' });
//   }
//   const encryptedPassword = await bcrypt.hash(password, 6);
//   try {
//     const existingUser = await UserDetails.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: 'Email is already registered.' });
//     }
//     const newUser = await UserDetails.create({
//       fname,
//       lname,
//       email,
//       password: encryptedPassword,
//     });
//     res.status(201).json({
//       status: 'ok',
//       user: {
//         _id: newUser._id,
//         fname: newUser.get('fname'),
//         lname: newUser.get('lname'),
//         email: newUser.get('email'),
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     if (error.code === 11000) {
//       // Duplicate key error
//       return res.status(400).json({ error: 'Email is already registered.' });
//     }
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(400).json({ error: 'Please provide email and password.' });
//   }
//   try {
//     const user = await UserDetails.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ error: 'Invalid password' });
//     }
//     res.status(200).json({
//       status: 'ok',
//       user: {
//         _id: user._id,
//         fname: user.fname,
//         lname: user.lname,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// router.delete('/delete-account', async (req, res) => {
//   const { email, fname, lname } = req.body;

//   if (!email || !fname || !lname) {
//     return res.status(400).json({ error: 'Email, fname, and lname are required for account deletion' });
//   }

//   try {
//     const deletedUser = await UserDetails.findOneAndDelete({ email, fname, lname });

//     if (deletedUser) {
//       return res.json({ status: 'ok', message: 'Account deleted successfully' });
//     } else {
//       return res.status(404).json({ error: 'User not found' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });  

// router.get("/profile/:id", async (req, res) => {
//   try {
//     const userId = req.params.id;
    
//     const user = await UserDetails.findById(userId);

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.status(200).json({
//       _id: user._id,
//       fname: user.fname,
//       lname: user.lname,
//       email: user.email,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// export default router;


import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import file from "../models/File.js";
import https from "https";
import nodemailer from "nodemailer";
import emailTemplate from "../utils/emailTemplate.js";
import cors from "cors";
import bcrypt from "bcrypt";
import UserDetails from "../models/userDetails.js";
import Email from '../models/Email.js';
import logger from "../logger/logging.js";
express().use(cors());
const router = express.Router();
const storage = multer.diskStorage({});

let upload = multer({ storage });

router.post("/upload", upload.single("myFile"), async (req, res) => {
  logger.info('upload button')
  try {
    if (!req.file) {
      logger.error('Please Upload the File');
      return res.status(400).json({ message: "Hey Bro Please Upload the File" });
    }
    logger.info('required file');
    let uploadedFile; // Semicolon added here
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "MajorProject",
        resource_type: "auto",
      });
    } catch (error) {
      logger.error('Cloudinary error:'+error.message);
      return res.status(400).json({ message: "Cloudinary error" });
    }
    const { originalname } = req.file;
    const { secure_url, bytes, format } = uploadedFile;
    const File = await file.create({
      filename: originalname,
      sizeInBytes: bytes,
      secure_url,
      format,
    });
    res.status(200).json({
      id: File._id,
      downloadPageLink: `${process.env.api_base_endpoint_client}download/${File._id}`,
    });
  } catch (error) {
    logger.error('Server error:'+error.message);
    res.status(500).json({ message: "server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const check_File = await file.findById(id);
    if (!check_File) {
      logger.info('file does not exist');
      return res.status(404).json({ message: "File Does Not Exist" });
    }
    const { filename, format, sizeInBytes } = check_File;
    return res.status(200).json({
      name: filename,
      sizeInBytes,
      format: format,
      id,
    });
  } catch (error) {
    logger.error('server error')
    return res.status(500).json({ message: "server error" });
  }
});

router.get("/:id/download", async (req, res) => {
  try {
    const id = req.params.id;
    const check_File = await file.findById(id);
    if (!check_File) {
      logger.info('file does not exist')
      return res.status(404).json({ message: "File Does Not Exist" });
    }
    https.get(check_File.secure_url, (fileStream) =>
      fileStream.pipe(res)
    );
  } catch (error) {
    logger.error('server error')
    return res.status(500).json({ message: "server error" });
  }
});

router.post('/email', async (req, res) => {
  // console.log('Received request body:', req.body);
  logger.info('recived req.body');
  const { id, emailTo, emailFrom } = req.body;
  
  if (!emailTo) {
    logger.error('Invalid Data');
    return res.status(400).json({ message: 'Invalid Data' });
  }

  const check_File = await file.findById(id);
  if (!check_File) {
    logger.error('File Does Not Exist');
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
  const downloadPageLink = check_File.secure_url;
  const mailOptions = {
    from: emailFrom,
    to: emailTo,
    subject: 'File shared with you',
    text: `${emailFrom} shared one image with you `,
    html: emailTemplate(emailFrom, emailTo, downloadPageLink, filename, filesize),
  };

  logger.info('Ready to send the email'+req.body);
  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      logger.error(error);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }

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

      const newEmail = new Email({
        file: check_File._id,
        emailFrom,
        emailTo,
        filename,
      });

      await newEmail.save();

      check_File.sender = emailFrom;
      check_File.reciver = emailTo;
      await check_File.save();
      logger.info(`email sent to ${emailTo}`);
      return res.status(200).json({ message: 'Email sent' });
    } catch (error) {
      logger.error('Error saving email history'+error);
      return res.status(500).json({ message: 'Error saving email history', error: error.message });
    }
  });
});

router.get('/history/:emailFrom', async (req, res) => {
  logger.info('clicked on the history')
  try {
    const { emailFrom } = req.params;
    const fileHistory = await file.find({ $or: [{ sender: emailFrom }, { reciver: emailFrom }] }).sort({ createdAt: -1 });
    logger.info('filehistory')
    return res.status(200).json({ fileHistory });
  } catch (error) {
    logger.error('Error fetching file history:'+error);
    return res.status(500).json({ message: 'Error fetching file history', error: error.message });
  }
});

router.post("/signup", async (req, res) => {
  logger.info('clicked on signup')
  const { fname, lname, email, password } = req.body;
  if (!fname || !lname || !email || !password) {
    logger.error('Please fill in all fields.');
    return res.status(400).json({ error: 'Please fill in all fields.' });
  }
  const encryptedPassword = await bcrypt.hash(password, 6);
  try {
    const existingUser = await UserDetails.findOne({ email });
    if (existingUser) {
      logger.error('Email is already registered.');
      return res.status(400).json({ error: 'Email is already registered.' });
    }
    const newUser = await UserDetails.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
    });
    res.status(201).json({
      status: 'ok',
      user: {
        _id: newUser._id,
        fname: newUser.get('fname'),
        lname: newUser.get('lname'),
        email: newUser.get('email'),
      },
    });
  } catch (error) {
    logger.error('Internal Server Error:'+error);
    if (error.code === 11000) {
      // Duplicate key error
      return res.status(400).json({ error: 'Email is already registered.' });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post("/login", async (req, res) => {
  logger.info('entered login')
  const { email, password } = req.body;
  if (!email || !password) {
    logger.error('please provide necessary requirements')
    return res.status(400).json({ error: 'Please provide email and password.' });
  }
  try {
    const user = await UserDetails.findOne({ email });
    if (!user) {
      logger.error('login user not found')
      return res.status(404).json({ error: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      logger.error('login invalid password');
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
    logger.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/delete-account', async (req, res) => {
  logger.info('clicked on delete account')
  const { email, fname, lname } = req.body;

  if (!email || !fname || !lname) {
    logger.info('removing the account');
    return res.status(400).json({ error: 'Email, fname, and lname are required for account deletion' });
  }

  try {
    const deletedUser = await UserDetails.findOneAndDelete({ email, fname, lname });

    if (deletedUser) {
      logger.info('account deleted sucessfully');
      return res.json({ status: 'ok', message: 'Account deleted successfully' });
    } else {
      logger.error('user not found');
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});  

router.get("/profile/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    
    const user = await UserDetails.findById(userId);
    logger.info('entered profile section')
    if (!user) {
      logger.error('user not found');
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;


