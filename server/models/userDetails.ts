import mongoose, { Document, Schema } from "mongoose";

interface IEmailHistory {
  to: string;
  subject: string;
  body: string;
  timestamp: Date;
}

interface IUserDetails extends Document {
  fname: string;
  lname: string;
  email: string;
  password: string;
  emailHistory: IEmailHistory[];
}

const emailHistorySchema: Schema<IEmailHistory> = new Schema({
  to: { type: String, required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const userDetailsSchema: Schema<IUserDetails> = new Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  emailHistory: [emailHistorySchema], // Embed the email history schema
},
{
  collection: "userinfo"
});

const UserDetails = mongoose.model<IUserDetails>("userinfo", userDetailsSchema);

export default UserDetails;
