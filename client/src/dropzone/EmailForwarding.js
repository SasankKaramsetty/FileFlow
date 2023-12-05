import React, { useState } from "react";
import axios from "axios";

const EmailForwarding = ({ fileId }) => {
  const [emailFrom, setEmailFrom] = useState("");
  const [emailTo, setEmailTo] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleEmail = async () => {
    try {
        console.log("Request Payload:", { fileId, emailFrom, emailTo });
      const response = await axios.post("/api/files/email", {
        id: fileId,
        emailFrom,
        emailTo,
      });

      if (response && response.status === 200) {
        setEmailSent(true);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setEmailSent(false);
    }
  };

  return (
    <div>
      <label>
        Email From:
        <input
          type="email"
          value={emailFrom}
          onChange={(e) => setEmailFrom(e.target.value)}
        />
      </label>
      <br />
      <label>
        Email To:
        <input
          type="email"
          value={emailTo}
          onChange={(e) => setEmailTo(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleEmail}>Send Email</button>
      {emailSent && <p>Email sent successfully!</p>}
    </div>
  );
};
export default EmailForwarding;
