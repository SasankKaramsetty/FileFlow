import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HistoryPage = () => {
  const [fileHistory, setFileHistory] = useState([]);
  const [emailFrom, setEmailFrom] = useState(''); // Set the emailFrom state

  useEffect(() => {
    // Fetch emailFrom from localStorage or wherever it is stored
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setEmailFrom(user.email);
    }

    // Fetch file history when the component mounts
    const fetchFileHistory = async () => {
      try {
        // Make a GET request to the endpoint with the emailFrom parameter
        const response = await axios.get(`/api/files/history/${emailFrom}`);
        
        // Update the state with the file history data
        setFileHistory(response.data.fileHistory);
      } catch (error) {
        console.error('Error fetching file history:', error.message);
      }
    };

    // Call the fetchFileHistory function
    fetchFileHistory();
  }, [emailFrom]); // Add emailFrom as a dependency to trigger the effect when it changes

  return (
    <div>
      <h1>File History Page</h1>
      <ul>
        {fileHistory.map((file) => (
          <li key={file._id}>
            <p>
              <strong>Filename:</strong> {file.filename}
            </p>
            <p>
              <strong>Sender:</strong> {file.sender}
            </p>
            <p>
              <strong>Receiver:</strong> {file.reciver}
            </p>
            <p>
              <strong>Timestamp:</strong> {new Date(file.createdAt).toLocaleString()}
            </p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryPage;
