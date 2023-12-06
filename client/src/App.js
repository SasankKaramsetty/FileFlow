import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from '../src/dropzone/NavBar';
import HomePage from '../src/dropzone/HomePage';
import UserProfile from './profile/UserProfile';
import HistoryPage from '../src/dropzone/HistoryPage';
import DynamicId from '../src/dropzone/DynamicId';
import EmailForm from './dropzone/EmailForm';
import Signup from './login/Signup';
import Login from './login/Login';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000/';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleSignup = (userData) => {
    setUser(userData);
  };
  const updateUser = (userData) => {
    setUser(userData);
  };

  return (
    <Router>
      {user && window.location.pathname === '/' && <NavBar />}
      <Routes>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/login" />}
        />
         <Route path="/profile" element={<UserProfile updateUser={updateUser} />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/download/:id" element={<DynamicId />} />
        <Route path="/email" element={<EmailForm />} />
        <Route
          path="/signup"
          element={<Signup onSignup={handleSignup} />}
        />
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
        {!user && <Route path="/*" element={<Navigate to="/" />} />}
      </Routes>
    </Router>
  );
};

export default App;

