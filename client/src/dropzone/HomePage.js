import React, { useState } from "react";
import DragDropFiles from "../dropzone/DragDropFiles";
import '../styles/drop.css';
import '../styles/nav.css';

const HomePage = () => {
  const [file, setFile] = useState(null);
  const handleSetFile = (droppedFile) => {
    console.log("Dropped File:", droppedFile);
    const fileData = {
      name: droppedFile.name,
      sizeInBytes: droppedFile.size, 
      format: droppedFile.name.split(".").pop().toLowerCase(), 
    };
    setFile(fileData);
  };
  console.log("HomePage component re-rendered");
  return (
    <div className="flex flex-col h-screen">
      <section className="flex-1 flex items-center justify-center">
        <div className="container">
          <h1 className="title text-3xl font-bold text-center mb-8">Upload Files</h1>
          <DragDropFiles className="drag-drop-files" />
        </div>
      </section>
    </div>
  );
};

export default HomePage;


