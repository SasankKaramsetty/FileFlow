// models/Email.js

import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema({
  file: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',
    required: true,
  },
  emailFrom: {
    type: String,
    required: true,
  },
  emailTo: {
    type: String,
    required: true,
  },
});

const Email = mongoose.model('Email', emailSchema);

export default Email;
