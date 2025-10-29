// component/SummarizeButton.tsx

import React, { useState } from "react";
import Swal from "sweetalert2";
// Import the new functions from the completed API file
import { summarizeTextAPI, summarizeFileAPI } from "../api/summarizerApi"; 
import { useAuth } from "../context/AuthContext";

interface SummarizeButtonProps {
    text: string;
    file: File | null;
    mode: "paragraph" | "bullet";
    length: "short" | "medium" | "long";
    setSummary: React.Dispatch<React.SetStateAction<string>>;
}

const SummarizeButton: React.FC<SummarizeButtonProps> = ({
    text,
    file,
    mode,
    length,
    setSummary,
}) => {
    const [loading, setLoading] = useState(false);
    const { isAuthenticated } = useAuth();

    const handleSummarize = async () => {
        // --- 1. Authentication Check ---
        if (!isAuthenticated) {
            // ... (Your existing login required logic is fine)
            // ...
            return; 
        }

        // --- 2. Input Validation ---
        if (!text && !file) {
            Swal.fire({
                icon: "warning",
                title: "No input provided",
                text: "Please enter text or upload a file.",
            });
            return;
        }

        setLoading(true);

        Swal.fire({
            title: file ? "Uploading & Summarizing File..." : "Summarizing Text...",
            text: "Please wait while the AI processes your request.",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            let data;

            if (file) {
                // --- FILE SUBMISSION ---
                // Calls the /summarize/file endpoint
                data = await summarizeFileAPI(
                    file,
                    mode,
                    length
                );
            } else if (text) {
                // --- TEXT SUBMISSION ---
                // Input validation (matching backend logic)
                if (text.length < 100) {
                    throw new Error("Input text must be at least 100 characters long for meaningful summarization.");
                }

                // Calls the /summarize endpoint
                data = await summarizeTextAPI(
                    text,
                    mode,
                    length
                );
            }

            if (data) {
                setSummary(data.summary);
            }

            Swal.fire({
                icon: "success",
                title: "Summarized Successfully",
                timer: 1200,
                showConfirmButton: false,
            });

        } catch (error) {
            Swal.close();

            console.error("Summarization Error:", error);
            Swal.fire({
                icon: "error",
                title: "Operation Failed",
                text: (error as Error).message,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-auto">
            <button
                onClick={handleSummarize}
                disabled={loading || !isAuthenticated}
                className={`w-full py-3 mt-3 font-semibold text-white rounded-xl transition-all duration-300 ${loading
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-700 hover:to-blue-700 shadow-md hover:shadow-lg"
                    }`}
            >
                {loading ? "Processing..." : isAuthenticated ? "Summarize" : "Login to Summarize"}
            </button>
        </div>
    );
};

export default SummarizeButton;