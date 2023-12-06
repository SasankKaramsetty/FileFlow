import mongoose, { Document, Schema } from "mongoose";

interface IUserDetails extends Document {
    fname: string;
    lname: string;
    email: string;
    password: string;
}

const userDetailsSchema: Schema<IUserDetails> = new Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
},
{
    collection: "userinfo"
});

const UserDetails = mongoose.model<IUserDetails>("userinfo", userDetailsSchema);

export default UserDetails;
