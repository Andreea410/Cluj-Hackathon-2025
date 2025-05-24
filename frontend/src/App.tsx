import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SkinAnalysisPage } from './pages/SkinAnalysisPage';
import { RegistrationForm } from './components/RegistrationForm';

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/register" />;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/skin-analysis" element={
        <ProtectedRoute>
          <SkinAnalysisPage />
        </ProtectedRoute>
      } />
      <Route path="/" element={<Navigate to="/register" />} />
    </Routes>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}; 