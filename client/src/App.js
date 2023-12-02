// import "./App.css";
// import DragDropFiles from "../src/dropzone/DragDropFiles";

// const App = () => {
//     return (
//         <div className="container">
//             <DragDropFiles/>
//         </div>
//     )
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../src/dropzone/HomePage";
import UserProfile from "../src/dropzone/UserProfile";
import HistoryPage from "../src/dropzone/HistoryPage";
import axios from "axios";
axios.defaults.baseURL="http://localhost:8000/";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
