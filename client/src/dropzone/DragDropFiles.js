// import React, { useState, useRef, useCallback } from "react";
// import axios from 'axios';
// import { useDropzone } from "react-dropzone";
// import DownloadFile from "./DownloadFile";
// import "../styles/dragdropfile.css"; 
// import EmailForm from "./EmailForm";

// const DragDropFiles = () => {
//   const [files, setFiles] = useState([]);
//   const [downloadPageLink, setDownloadPageLink] = useState(null);
//   const [uploadState, setUploadState] = useState(null);
//   const [isDragReject, setIsDragReject] = useState(false);
//   const inputRef = useRef();

//   const extractIdFromDownloadPageLink = (downloadPageLink) => {
//     if (!downloadPageLink) {
//       return null;
//     }
//     const parts = downloadPageLink.split('/');
//     return parts[parts.length - 1];
//   };

//   const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
//     setIsDragReject(rejectedFiles.length > 0);

//     const isAllowedType = acceptedFiles.every(
//       (file) => ["image/jpeg", "image/png"].includes(file.type)
//     );

//     setIsDragReject(!isAllowedType);

//     if (isAllowedType) {
//       setFiles(Array.isArray(acceptedFiles) ? acceptedFiles : [acceptedFiles]);
//     }
//   }, []);

//   const formatBytes = (bytes, decimals = 2) => {
//     if (bytes === 0) return "0 Bytes";

//     const k = 1024;
//     const dm = decimals < 0 ? 0 : decimals;
//     const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

//     const i = Math.floor(Math.log(bytes) / Math.log(k));

//     return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
//   };

  // const { getRootProps, getInputProps } = useDropzone({
  //   onDrop,
  //   accept: "image/jpeg, image/png",
  // });

//   const handleUpload = async () => {
//     if (uploadState === "uploading" || !files) return;

//     setUploadState("uploading");

//     const formData = new FormData();
//     for (let i = 0; i < files.length; i++) {
//       formData.append("myFile", files[i]);
//     }

//     try {
//       const { data } = await axios.post("api/files/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       setDownloadPageLink(data.downloadPageLink);
//       console.log("this is the id", extractIdFromDownloadPageLink(data.downloadPageLink));
//       setUploadState("uploaded");
//     } catch (error) {
//       console.log(error.response.data);
//       setUploadState("upload failed");
//     }
//   };

//   if (files.length > 0) {
//     return (
//       <div className="uploads">
//         <ul>
//           {files.map((file, idx) => (
//             <li key={idx}>
//               {file.name} - {formatBytes(file.size)} - {file.type}
//             </li>
//           ))}
//         </ul>
//         <div className="actions">
//           <button onClick={() => setFiles([])}>Cancel</button>
//           <button onClick={handleUpload}>Upload</button>
//           {/* <button onClick={emailpage}>email</button> */}
//           {downloadPageLink && <DownloadFile downloadPageLink={downloadPageLink} />}
//           <EmailForm id={extractIdFromDownloadPageLink(downloadPageLink)} />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div
//         className={`dropzone ${isDragReject ? "rejected" : "accepted"}`}
//         onDragOver={(e) => e.preventDefault()}
//         onDragLeave={() => setIsDragReject(false)}
//         {...getRootProps()}
//       >
//         <h1>Drag and Drop Files to Upload</h1>
//         <h1>Or</h1>
//         <input
//           {...getInputProps()}
//           type="file"
//           multiple
//           accept="image/png, image/jpeg"
//           ref={inputRef}
//         />
//         <button onClick={() => inputRef.current.click()}>Select Files</button>
//       </div>
//       {isDragReject && (
//         <p className="text-red-500">
//           Sorry, this app only supports images, not PDF.
//         </p>
//       )}
//     </>
//   );
// };

// export default DragDropFiles;


import React, { useState, useRef, useCallback } from "react";
import axios from 'axios';
import { useDropzone } from "react-dropzone";
import DownloadFile from "./DownloadFile";
import "../styles/dragdropfile.css"; 
import EmailPage from "../emailpage/EmailPage" // Import the new EmailPage component
import { useNavigate } from 'react-router';
import EmailForm from "../emailform/EmailForm";
// improt EmailForm



const DragDropFiles = () => {
  const [files, setFiles] = useState([]);
  const [downloadPageLink, setDownloadPageLink] = useState(null);
  const [uploadState, setUploadState] = useState(null);
  const [isDragReject, setIsDragReject] = useState(false);
  const [emailFormVisible, setEmailFormVisible] = useState(false);  // State to control EmailForm visibility
  const navigate = useNavigate();
  const inputRef = useRef();

  const extractIdFromDownloadPageLink = (downloadPageLink) => {
    if (!downloadPageLink) {
      return null;
    }
    const parts = downloadPageLink.split('/');
    return parts[parts.length - 1];
  };

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setIsDragReject(rejectedFiles.length > 0);

    const isAllowedType = acceptedFiles.every(
      (file) => ["image/jpeg", "image/png"].includes(file.type)
    );

    setIsDragReject(!isAllowedType);

    if (isAllowedType) {
      setFiles(Array.isArray(acceptedFiles) ? acceptedFiles : [acceptedFiles]);
    }
  }, []);

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
  });

  const handleUpload = async () => {
    if (uploadState === "uploading" || !files) return;

    setUploadState("uploading");

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("myFile", files[i]);
    }

    try {
      const { data } = await axios.post("api/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setDownloadPageLink(data.downloadPageLink);
      setUploadState("uploaded");
      setEmailFormVisible(true);  // Show EmailForm after successful upload
      navigate(`/email-page/${extractIdFromDownloadPageLink(data.downloadPageLink)}`);  // Navigate to EmailPage
    } catch (error) {
      console.log(error.response.data);
      setUploadState("upload failed");
    }
  };

  if (files.length > 0) {
    return (
      <div className="uploads">
        <ul>
          {files.map((file, idx) => (
            <li key={idx}>
              {file.name} - {formatBytes(file.size)} - {file.type}
            </li>
          ))}
        </ul>
        <div className="actions">
          <button onClick={() => setFiles([])}>Cancel</button>
          <button onClick={handleUpload}>Upload</button>
          {downloadPageLink && <DownloadFile downloadPageLink={downloadPageLink} />}
          {emailFormVisible && <EmailForm id={extractIdFromDownloadPageLink(downloadPageLink)} />}
          {/* Remove EmailForm here */}
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`dropzone ${isDragReject ? "rejected" : "accepted"}`}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={() => setIsDragReject(false)}
        {...getRootProps()}
      >
        <h1>Drag and Drop Files to Upload</h1>
        <h1>Or</h1>
        <input
          {...getInputProps()}
          type="file"
          multiple
          accept="image/png, image/jpeg"
          ref={inputRef}
        />
        <button onClick={() => inputRef.current.click()}>Select Files</button>
      </div>
      {isDragReject && (
        <p className="text-red-500">
          Sorry, this app only supports images, not PDF.
        </p>
      )}
    </>
  );
};

export default DragDropFiles;







