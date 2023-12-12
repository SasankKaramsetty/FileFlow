import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import NavBar from '../src/navbar/NavBar';
import HomePage from '../src/dropzone/HomePage';
import UserProfile from './profile/UserProfile';
import HistoryPage from '../src/History/HistoryPage';
import DynamicId from '../src/dropzone/DynamicId';
import EmailForm from './emailform/EmailForm';
import Signup from './login/Signup';
import Login from './login/Login';
import axios from 'axios';
import EmailPage from './emailpage/EmailPage';
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
        <Route path="/email-page/:id" element={<EmailPage />} />
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
