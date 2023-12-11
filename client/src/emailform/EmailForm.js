// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import "./EmailForm.css"
// const EmailForm = ({ id }) => {
//   const [emailFrom, setEmailFrom] = useState("");
//   const [emailTo, setEmailTo] = useState("");
//   const [message, setMessage] = useState(null);

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user) {
//       setEmailFrom(user.email);
//     }
//   }, []);

//   const handleEmail = async (e) => {
//     e.preventDefault();
//     try {
//       console.log("id in handleEmail:", id);
//       const response = await axios.post("api/files/email", {
//         id,
//         emailFrom,
//         emailTo,
//       });

//       const fetched_data = response.data;

//       if (!fetched_data) {
//         console.error("No 'fetched_data' property found in the response data.");
//         setMessage("An error occurred while processing your request.");
//         return;
//       }

//       setMessage(fetched_data.message);
//     } catch (error) {
//       if (error.response) {
//         console.error("Server responded with error:", error.response.data);
//         setMessage(error.response.data.message);
//       } else if (error.request) {
//         console.error("No response received from the server:", error.request);
//         setMessage("No response received from the server.");
//       } else {
//         console.error("Error setting up the request:", error.message);
//         setMessage("An error occurred while processing your request.");
//       }
//     }
//   };

//   return (
//     <div>
//       <h3>You can also </h3>
//       <form onSubmit={handleEmail}>
//         <input
//           type="email"
//           placeholder="EmailFrom"
//           required
//           onChange={(e) => setEmailFrom(e.target.value)}
//           value={emailFrom}
//           disabled 
//         />
//         <input
//           type="email"
//           placeholder="EmailTo"
//           required
//           onChange={(e) => setEmailTo(e.target.value)}
//           value={emailTo}
//         />
//         <button>send</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default EmailForm;
import axios from "axios";
import React, { useState, useEffect } from "react";
import "./EmailForm.css";  // Import the EmailForm.css file

const EmailForm = ({ id }) => {
  const [emailFrom, setEmailFrom] = useState("");
  const [emailTo, setEmailTo] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setEmailFrom(user.email);
    }
  }, []);

  const handleEmail = async (e) => {
    e.preventDefault();
    try {
      console.log("id in handleEmail:", id);
      const response = await axios.post("api/files/email", {
        id,
        emailFrom,
        emailTo,
      });

      const fetched_data = response.data;

      if (!fetched_data) {
        console.error("No 'fetched_data' property found in the response data.");
        setMessage("An error occurred while processing your request.");
        return;
      }

      setMessage(fetched_data.message);
    } catch (error) {
      if (error.response) {
        console.error("Server responded with error:", error.response.data);
        setMessage(error.response.data.message);
      } else if (error.request) {
        console.error("No response received from the server:", error.request);
        setMessage("No response received from the server.");
      } else {
        console.error("Error setting up the request:", error.message);
        setMessage("An error occurred while processing your request.");
      }
    }
  };

  return (
    <div className="email-form-container">
      <h3>You can also </h3>
      <form className="email-form-content" onSubmit={handleEmail}>
      <div className="mb-3">
  <input
    type="email"
    className="form-control"
    placeholder="EmailFrom"
    required
    onChange={(e) => setEmailFrom(e.target.value)}
    value={emailFrom}
    disabled
  />
</div>
<div className="mb-3">
  <input
    type="email"
    className="form-control"
    placeholder="EmailTo"
    required
    onChange={(e) => setEmailTo(e.target.value)}
    value={emailTo}
  />
</div>

        <button className="btn-primary">send</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EmailForm;
