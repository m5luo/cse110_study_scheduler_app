import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInForm from './pages/SignInForm';
import SignUpForm from './pages/SignUpForm';
import ForgotPasswordForm from './pages/ForgotPasswordForm';
import ResetPasswordForm from './pages/ResetPasswordForm';
import HomePage from './pages/HomePage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} /> {/* Add this route */}
        <Route path="/reset-password" element={<ResetPasswordForm />} />
        <Route path="/home" element={<HomePage />} /> 
      </Routes>
    </Router>
  );
};

export default App;

