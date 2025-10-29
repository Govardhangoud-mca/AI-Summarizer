
import React from 'react';
import { useAuth } from '../context/AuthContext';
import InputPanel from '../component/InputPanel'; 

const DashboardPage: React.FC = () => {
    const { user, logout } = useAuth(); 
    
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="flex justify-between items-center p-4 bg-white shadow-md">
                <h1 className="text-2xl font-bold text-blue-600">AI Summarization Dashboard</h1>
                <div className="flex items-center space-x-4">
                    <span className="text-gray-700">Welcome, <strong>{user}</strong></span>
                    <button 
                        onClick={logout} 
                        className="py-2 px-4 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 transition duration-150 shadow-md"
                    >
                        Logout
                    </button>
                </div>
            </header>
            
            <main className="container mx-auto p-6">
                <InputPanel /> 
            </main>
        </div>
    );
};

export default DashboardPage;