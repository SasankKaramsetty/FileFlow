import React from "react";
import NavBar from "../dropzone/NavBar";
import DragDropFiles from "../dropzone/DragDropFiles";
import '../styles/drop.css';
import '../styles/nav.css'

const HomePage = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
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
