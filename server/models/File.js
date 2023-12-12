import mongoose,{Document} from "mongoose";
const Schema = mongoose.Schema;
const fileSchema = new Schema({
    filename: {
        type: String,
        required: true,
    },
    secure_url: {
        type: String,
        required: true,
    },
    format: {
        type: String,
        required: true,
    },
    sizeInBytes: {
        type: String,
        required: true,
    },
    sender: {
        type: String,
    },
    reciver: {
        type: String,
    }
}, { timestamps: true });

const IFile = mongoose.model("File", fileSchema);

export default IFile;
