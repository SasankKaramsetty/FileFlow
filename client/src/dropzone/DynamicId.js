import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fileDownload from "js-file-download";
// import EmailForm from "./EmailForm";

const DynamicId = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/files/${id}`);
        const result = await response.json();

        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [id]);

  const handleDownload = async () => {
    try {
      const { data: fileBlob } = await axios.get(`http://localhost:8000/api/files/${id}/download`, {
        responseType: "blob",
      });

      // Use data.name for the file name
      fileDownload(fileBlob, data.name);
    } catch (error) {
      console.error("Error downloading file:", error);
      // Handle error, show a message to the user, etc.
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Download Page</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
      {data && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "20px", borderRadius: "5px" }}>
          <h2>File Details</h2>
          <p>
            <strong>Filename:</strong> {data.name}
          </p>
          <p>
            <strong>File Format:</strong> {data.format}
          </p>
          <p>
            <strong>Image Size:</strong> {data.sizeInBytes} Bytes
          </p>
          {/* Assuming data.url is the URL for the image */}
          <img src={data.url} alt="Download" style={{ maxWidth: "100%", marginTop: "10px" }} />
          <div style={{ marginTop: "20px" }}>
            {/* Use handleDownload instead of the direct download link */}
            <button
              onClick={handleDownload}
              style={{
                padding: "10px",
                background: "#007bff",
                color: "#fff",
                borderRadius: "5px",
                cursor: "pointer",
                border: "none",
              }}
            >
              Download
            </button>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default DynamicId;


