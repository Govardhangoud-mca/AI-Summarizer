// src/pages/DashboardPage.tsx

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import InputPanel from '../component/InputPanel'; 
import OutputPanel from '../component/OutputPanel'; 
import Layout from '../component/Layout'; 

const DashboardPage: React.FC = () => {
    // State management for all summarizer inputs and output
    const [text, setText] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [mode, setMode] = useState<"paragraph" | "bullet">("bullet");
    const [length, setLength] = useState<"short" | "medium" | "long">("medium");
    const [summary, setSummary] = useState("");
    
    // Line 17: 'authContext' is declared here
    const authContext = useAuth(); 
    
    return (
        <Layout>
            <div className="min-h-screen">
                <main className="container mx-auto p-6 pt-10">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">
                        Start Summarizing
                    </h2>
                    
                    {/* 🎯 FIX: This section USES the 'authContext' variable, resolving the TS6133 error. */}
                    <div className="flex justify-center items-center mt-4 mb-8 space-x-4">
                         <span className="text-white text-lg font-medium">Welcome, {authContext.user}!</span>
                         <button 
                            onClick={authContext.logout} 
                            className="py-2 px-4 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 transition"
                        >
                            Logout
                        </button>
                    </div>
                    {/* ------------------------------------------------------------------------------------ */}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* 1. Input Panel */}
                        <InputPanel
                            text={text}
                            setText={setText}
                            file={file}
                            setFile={setFile}
                            mode={mode}
                            setMode={setMode}
                            length={length}
                            setLength={setLength}
                            setSummary={setSummary} 
                        /> 
                        
                        {/* 2. Output Panel */}
                        <OutputPanel summary={summary} /> 
                    </div>
                </main>
            </div>
        </Layout>
    );
};

export default DashboardPage;