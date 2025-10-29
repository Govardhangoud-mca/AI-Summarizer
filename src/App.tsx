// src/App.tsx

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth, AuthProvider } from "./context/AuthContext";

// 🛑 IMPORT ALL PAGES AND COMPONENTS
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Welcome from "./pages/Welcome"; // The initial landing page
import SummarizerPage from "./pages/SummarizerPage"; // The main summarizer UI (previously Home.tsx)
import LoginModal from "./component/LoginModal"; // The 2-second timed popup


// --- Component to conditionally display the Modal (The Gatekeeper) ---
const AuthGate: React.FC = () => {
    const { isAuthenticated } = useAuth();
    
    // 🛑 LOGIC: Show modal only if NOT authenticated AND the user is viewing the Summarizer page (/home)
    if (!isAuthenticated && window.location.pathname === '/home') {
        return <LoginModal />;
    }
    return null;
}


// --- Route Definitions ---
const AppRoutes = () => {
    return (
        <Routes>
            {/* 1. Root Path: Show the Welcome Page */}
            <Route path="/" element={<Welcome />} /> 

            {/* 2. Summarizer Page: Accessible via "Get Started" button from Welcome page */}
            <Route path="/home" element={<SummarizerPage />} /> 

            {/* 3. Public Auth Pages */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Fallback: Redirect any unknown route to the Welcome page */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

// --- Main Application Wrapper ---
const App: React.FC = () => (
    // AuthProvider MUST wrap all components that use the context
    <Router>
        <AuthProvider>
            <AppRoutes />
            {/* 🛑 The AuthGate handles the 2-second timed modal popup on the /home route */}
            <AuthGate />
        </AuthProvider>
    </Router>
);

export default App;