// EmailPage.js
import React from "react";
import EmailForm from "../emailform/EmailForm";
import { useParams } from "react-router-dom";
const EmailPage = () => {
    const { id } = useParams();
  console.log("ID from URL:", id);
    // console.log("Received id in EmailPage:", id);
  return (
    
    <div>
      <h1>Email Page</h1>
      
      <EmailForm id={id}  />
    </div>
  );
};

export default EmailPage;
