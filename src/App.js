// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CreateSurvey from './components/CreateSurvey';
import ParticipateSurvey from './components/ParticipateSurvey';
import Login from './components/Login';
import Register from './components/Register';
import { AuthProvider } from './context/AuthContext';
import './styles.css';
import SurveyList from './components/SurveyList';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [ setSelectedSurveyId] = useState(null);
  return (
    <AuthProvider>
      <Router>
        <div className="App">
        <Navbar />
          <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<PrivateRoute><CreateSurvey /></PrivateRoute>} />
          <Route path="/participate/:surveyId" element={<PrivateRoute><ParticipateSurvey/></PrivateRoute>} />
          <Route path="/surveys" element={<PrivateRoute><SurveyList onSurveySelect={setSelectedSurveyId} /></PrivateRoute>} />
          <Route path="/" element={<Navigate to="/surveys" />} />
          <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
