import mongoose,{Document} from "mongoose";
// import
const Schema=mongoose.Schema;

const fileSchema=new Schema({
    filename:{
        type:String,
        required:true,
    },
    secure_url:{
        type:String,
        required:true,
    },
    format:{
        type:String,
        required:true,
    },
    sizeInBytes:{
        type:String,
        required:true,
    },
    sender:{
        type:String,
        // required:true,
    },
    reciver:{
        type:String,
        // required:true,
    }
},{timestamps:true})

interface IFile extends Document{
    filename:string;
    secure_url:string;
    format:string;
    sizeInBytes:string;
    sender?:string;
    reciver?:string;
}
export default mongoose.model<IFile>("File",fileSchema);