// src/api/summarizerApi.ts

// 🛑 FIX: Removed unused import: import Swal from 'sweetalert2';

const BASE_URL = "http://localhost:8080/api/v1/text";

export interface SummaryResponse {
    summary: string;
    sentenceCount: number;
    wordCount: number;
}

// --- 1. Summarize Text API (POST /summarize) ---

export const summarizeTextAPI = async (
    text: string,
    mode: 'paragraph' | 'bullet',
    length: 'short' | 'medium' | 'long'
): Promise<SummaryResponse> => {
    try {
        const response = await fetch(`${BASE_URL}/summarize`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // CRITICAL: Send the JSESSIONID cookie
            credentials: 'include', 
            body: JSON.stringify({
                text: text,
                // Ensure these match your Java Enum constants exactly
                mode: mode.toUpperCase() === 'BULLET' ? 'BULLET_POINT' : 'PARAGRAPH',
                summaryLength: length.toUpperCase(), 
            }),
        });

        // Handle security error first
        if (response.status === 401 || response.status === 403) {
            throw new Error("Authentication required. Your session may have expired.");
        }
        
        // Handle validation/business logic error (400)
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: `Server error: ${response.status}` }));
            throw new Error(errorData.message || 'Summarization failed due to server error.');
        }

        return response.json();

    } catch (error) {
        throw error;
    }
};

// --- 2. Summarize File API (POST /summarize/file) ---

export const summarizeFileAPI = async (
    file: File,
    mode: 'paragraph' | 'bullet',
    length: 'short' | 'medium' | 'long'
): Promise<SummaryResponse> => {
    
    // 1. Create a FormData container
    const formData = new FormData();
    
    // 2. Append parameters, matching the backend @RequestParam names
    formData.append('file', file);
    formData.append('summaryLength', length.toUpperCase()); // Must be SHORT, MEDIUM, or LONG
    formData.append('mode', mode.toUpperCase() === 'BULLET' ? 'BULLET_POINT' : 'PARAGRAPH'); // Must be BULLET_POINT or PARAGRAPH

    try {
        const response = await fetch(`${BASE_URL}/summarize/file`, {
            method: 'POST',
            // 🛑 CRITICAL: DO NOT set the 'Content-Type' header here. 
            credentials: 'include',
            body: formData, 
        });

        // Handle security error first
        if (response.status === 401 || response.status === 403) {
            throw new Error("Authentication required. Your session may have expired.");
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: `Server error: ${response.status}` }));
            throw new Error(errorData.message || `File processing failed. Error: ${response.statusText}`);
        }

        return response.json();

    } catch (error) {
        throw error;
    }
};