import mongoose, { Document, Schema } from "mongoose";
const emailHistorySchema = new mongoose.Schema({
  to: { type: String, required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const userDetailsSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  emailHistory: [emailHistorySchema],
},
{
  collection: "userinfo"
});

const UserDetails = mongoose.model("userinfo", userDetailsSchema);

export default UserDetails;
