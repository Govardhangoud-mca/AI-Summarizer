// src/pages/Welcome.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "../component/Layout";
import { useAuth } from "../context/AuthContext"; // 👈 Import useAuth
import { promptLogin } from "../component/LoginPrompt"; // 👈 Import the promptLogin function

const Welcome: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth(); // 👈 Get auth status

    const handleGetStarted = () => {
        if (isAuthenticated) {
            // 1. If logged in, navigate straight to the summarizer page
            navigate("/home");
        } else {
            // 2. If NOT logged in, show the login prompt alert
            promptLogin(navigate);
        }
    };

    return (
        <Layout>
            <motion.div
                className="flex flex-col items-center justify-center gap-6 min-h-[60vh]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                data-aos="fade-up"
            >
                <h1 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                    Welcome to AI Summarizer
                </h1>
                <p className="text-slate-400 text-center max-w-xl text-lg">
                    Quickly summarize your text or documents using AI. Start by clicking the button below!
                </p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all duration-300"
                    // 🎯 Call the new handler instead of direct navigation
                    onClick={handleGetStarted} 
                >
                    Get Started
                </motion.button>
            </motion.div>
        </Layout>
    );
};

export default Welcome;