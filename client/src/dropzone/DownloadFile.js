// DownloadFile.js

import React from "react";
import "../styles/downloadpagelink.css"; // Import the CSS file

const DownloadFile = ({ downloadPageLink }) => {
  return (
    <div className="download-container">
      <h1>Download Page Link</h1>
      <div className="download-link-container">
        <span className="download-link">{downloadPageLink}</span>
        <img className="copy-image" src="/images/copy.png" alt=""
        onClick={()=>navigator.clipboard.writeText(downloadPageLink)} />
      </div>
    </div>
  );
};

export default DownloadFile;
