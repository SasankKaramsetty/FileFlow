// import mongoose,{Document} from "mongoose";
// // import
// const userSchema=mongoose.Schema;

// const userDetails=new userSchema({
//     fname:String,
//     lname:String,
//     email:String,
//     password:String
// },
// {
//     collection :"userinfo"
// })
// export default mongoose.model("userinfo",userDetails);

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
