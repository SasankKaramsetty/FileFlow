// import React, { useState } from "react";
// import NavBar from "../dropzone/NavBar";
// import DragDropFiles from "../dropzone/DragDropFiles";
// import '../styles/drop.css';
// import '../styles/nav.css'
// import RenderFile from "./RenderFile";

// const HomePage = () => {
//   const [file,setFile]=useState(null);
//   return (
//     <div className="flex flex-col h-screen">
//       <NavBar />
//       <section className="flex-1 flex items-center justify-center">
//         <div className="container">
//           <h1 className="title text-3xl font-bold text-center mb-8">Upload Files</h1>
//           <DragDropFiles className="drag-drop-files" setFile={setFile}/>
//           {file &&
//           (<RenderFile file={{format:file.type.split("/")[1],name:file.name,sizeInBytes:file.size}}/>)}
//         </div>
//       </section>
//     </div>
//   );
// };
// export default HomePage;
// HomePage.js
import React, { useState } from "react";
import NavBar from "../dropzone/NavBar";
import DragDropFiles from "../dropzone/DragDropFiles";
// import RenderFile from "./RenderFile";
import '../styles/drop.css';
import '../styles/nav.css';

const HomePage = () => {
  const [file, setFile] = useState(null);

  const handleSetFile = (droppedFile) => {
    console.log("Dropped File:", droppedFile);

    // Extract necessary information from the File object
    const fileData = {
      name: droppedFile.name,
      sizeInBytes: droppedFile.size, // Assuming size is in bytes
      format: droppedFile.name.split(".").pop().toLowerCase(), // Extract format from the file name
    };

    setFile(fileData);
  };

  console.log("HomePage component re-rendered");

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <section className="flex-1 flex items-center justify-center">
        <div className="container">
          <h1 className="title text-3xl font-bold text-center mb-8">Upload Files</h1>
          <DragDropFiles className="drag-drop-files" />
          {/* <RenderFile file={file} /> */}
        </div>
      </section>
    </div>
  );
};

export default HomePage;


