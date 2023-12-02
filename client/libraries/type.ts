export interface IFile{
    name:string;
    sizeInBytes:string;
    format:string;
    secure_url:string;
    id?:string;//optional property
    sender?:string;
    reciver?:string;
}