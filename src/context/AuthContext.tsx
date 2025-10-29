// src/context/AuthContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
// Ensure the correct imports from your API file
import { loginAPI, registerAPI, logoutAPI } from '../api/authApi'; 
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirects

interface AuthContextType {
    isAuthenticated: boolean;
    user: string | null;
    token: string | null; 
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    register: (username: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Initialize state from localStorage
    const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));
    const [user, setUser] = useState<string | null>(localStorage.getItem('authUser'));
    
    // Derived state for easy checking
    const isAuthenticated = !!token;
    
    const navigate = useNavigate(); // Hook for redirection

    const login = async (username: string, password: string): Promise<boolean> => {
        try {
            // 1. Call API to get cookie (returns boolean success)
            const success = await loginAPI(username, password); 
            
            if (success) {
                // 2. On success, update local state (Browser handles JSESSIONID cookie)
                
                // Since we don't get a JWT, use a dummy token to mark the session active
                const dummyToken = 'session-active';
                setToken(dummyToken);
                setUser(username);
                localStorage.setItem('authToken', dummyToken);
                localStorage.setItem('authUser', username);
                
                return true;
            }
            return false;
        } catch (error) {
            console.error("Login failed via context:", error);
            // Error handling is primarily done in loginAPI, this catches only unexpected issues
            return false;
        }
    };

    const logout = async () => {
        // 1. Call the backend API to invalidate the session
        const success = await logoutAPI(); 

        // 2. Clear local state and localStorage regardless of backend result (for UI consistency)
        setToken(null);
        setUser(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
        
        // 3. Provide user feedback and redirect
        Swal.fire({
            icon: 'info',
            title: 'Logged Out',
            text: 'You have been successfully logged out.',
            timer: 1500,
            showConfirmButton: false
        });
        
        // Navigate to a non-authenticated page, typically the home or login page
        navigate('/'); 
    };

    const register = async (username: string, password: string): Promise<boolean> => {
        // Simple passthrough to the API function
        return registerAPI(username, password); 
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};