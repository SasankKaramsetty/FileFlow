// // import { FunctionComponent } from "react";
// // import {IFile} from "/OneDrive - iiit-b/academics/sem7/spe/FileTransfer/client/libraries/type"
// // const RenderFile:FunctionComponent<
// // {file:IFile}>= ({file:{format,sizeInBytes,name}}) =>
// // { 
// //     return(
// //         <div>
// //             <img src="/images/${format}" alt=""></img>
// //             <span>{name}</span>
// //             <span>{sizeInBytes}</span>
// //         </div>
// //     )
// // }
// // export default RenderFile;
// // /**
// //  * @typedef {Object} IFile
// //  * @property {string} format - The format of the file.
// //  * @property {number} sizeInBytes - The size of the file in bytes.
// //  * @property {string} name - The name of the file.
// //  */

// // /**
// //  * @typedef {Object} RenderFileProps
// //  * @property {IFile} file - The file to be rendered.
// //  */

// // /**
// //  * RenderFile component.
// //  *
// //  * @param {RenderFileProps} props - The component props.
// //  * @returns {JSX.Element} The rendered component.
// //  */
// // const RenderFile = (props) => {
// //     const { format, sizeInBytes, name } = props.file;
// //     console.log("RenderFile Props:", props);

// //     return (
// //         <div>
// //             <img src={`/images/${format}`} alt=""/>
// //             <span>{name}</span>
// //             <span>{sizeInBytes}</span>
// //         </div>
// //     );
// // };
// // export default RenderFile;
// // RenderFile.js
// import React, { useEffect } from "react";

// /**
//  * RenderFile component.
//  *
//  * @param {Object} props - The component props.
//  * @param {Object} props.file - The file to be rendered.
//  * @param {string} props.file.format - The format of the file.
//  * @param {string} props.file.sizeInBytes - The size of the file in bytes.
//  * @param {string} props.file.name - The name of the file.
//  * @returns {JSX.Element} The rendered component.
//  */
// const RenderFile = ({ file }) => {
//   useEffect(() => {
//     console.log("RenderFile component re-rendered");
//     console.log("Received File:", file);
//   }, [file]);

//   if (!file) {
//     return <div>No file data</div>;
//   }

//   const { format, sizeInBytes, name } = file;

//   return (
//     <div>
//       <img src={`/images/${format}`} alt={name} />
//       <p>Name: {name}</p>
//       <p>Size: {sizeInBytes}</p>
//       <p>Format: {format}</p>
//     </div>
//   );
// };

// export default RenderFile;

