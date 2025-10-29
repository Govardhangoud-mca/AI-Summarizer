// src/pages/LoginPage.tsx

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "../component/Layout";
import { useAuth } from "../context/AuthContext";
// Note: We no longer import loginAPI here, as the logic is in useAuth()

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth(); // Destructure the login function from context

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            // Call the context function which handles the API, cookie, and state
            const success = await login(username, password); 

            if (success) {
                // If loginAPI and state update succeeded, navigate home
                navigate('/home'); 
            }
            // Error handling is managed inside login() using Swal.fire
            
        } catch (error) {
            console.error("Login failed unexpectedly:", error);
            // Optionally show a generic error if the catch block is hit
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            {/* ... (Rest of your component UI, including the form structure) ... */}
            <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
                <motion.form
                    onSubmit={handleLogin}
                    className="bg-[#0b0b18] p-8 rounded-xl shadow-2xl border border-gray-700 w-full max-w-sm"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold text-white text-center mb-6">Welcome Back</h2>
                    
                    {/* ... (Username and Password input fields) ... */}
                    <div className="mb-4">
                        <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                            required
                        />
                    </div>
                    
                    <div className="mb-6">
                        <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                            required
                        />
                    </div>
                    
                    <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full py-2 rounded-lg font-semibold transition-all duration-300 ${
                            loading
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg"
                        }`}
                    >
                        {loading ? "Logging In..." : "Login"}
                    </motion.button>
                    
                    <p className="mt-4 text-center text-gray-400 text-sm">
                        Don't have an account? <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium">Register here</Link>
                    </p>
                </motion.form>
            </div>
        </Layout>
    );
};

export default LoginPage;