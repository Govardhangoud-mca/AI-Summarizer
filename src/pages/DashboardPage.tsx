// src/pages/DashboardPage.tsx

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import InputPanel from '../component/InputPanel'; 
import OutputPanel from '../component/OutputPanel'; // 👈 Assuming you have this component
import Layout from '../component/Layout'; // 👈 Assuming you use a shared Layout

const DashboardPage: React.FC = () => {
    // State management for all summarizer inputs and output
    const [text, setText] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [mode, setMode] = useState<"paragraph" | "bullet">("bullet");
    const [length, setLength] = useState<"short" | "medium" | "long">("medium");
    const [summary, setSummary] = useState("");
    
    const { user, logout } = useAuth(); 
    
    // We will wrap the content in your standard Layout component
    return (
        <Layout>
            <div className="min-h-screen">
                {/* Removed the internal header here because the main Header.tsx 
                  component in Layout already handles the Welcome/Logout message. 
                  If this is a nested dashboard, you can keep your original header, 
                  but typically the main Header component is sufficient.
                */}
                
                <main className="container mx-auto p-6 pt-10">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">
                        Start Summarizing
                    </h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* 1. Input Panel: Passed all required props to resolve TS2740 */}
                        <InputPanel
                            text={text}
                            setText={setText}
                            file={file}
                            setFile={setFile}
                            mode={mode}
                            setMode={setMode}
                            length={length}
                            setLength={setLength}
                            setSummary={setSummary} // Passed the setter for the output
                        /> 
                        
                        {/* 2. Output Panel: Displays the result */}
                        <OutputPanel summary={summary} /> 
                    </div>
                </main>
            </div>
        </Layout>
    );
};

export default DashboardPage;