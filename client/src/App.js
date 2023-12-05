import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../src/dropzone/HomePage";
import UserProfile from "../src/dropzone/UserProfile";
import HistoryPage from "../src/dropzone/HistoryPage";
import axios from "axios";
import DynamicId from "../src/dropzone/DynamicId";
import EmailForm from "./dropzone/EmailForm";
// import Login from "./login/Login";
import Signup from "./login/Signup";
import Login from "./login/Login";

axios.defaults.baseURL = "http://localhost:8000/";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/" element={<HomePage />} />
        {/* Corrected route path */}
        <Route path="/download/:id" element={<DynamicId />} />
        <Route path="/email" element={<EmailForm/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Router>
  );
};

export default App;
