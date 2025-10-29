// src/api/authApi.ts

import Swal from 'sweetalert2';

const BASE_URL = "http://localhost:8080/api/v1/auth";
const LOGIN_URL = "http://localhost:8080/api/v1/auth/login"; 

// 🛑 FIX: Removed unused interface LoginResponse

// --- REGISTER API ---

export const registerAPI = async (username: string, password: string): Promise<boolean> => {
    try {
        const res = await fetch(`${BASE_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({ message: `HTTP status ${res.status}` }));
            Swal.fire('Registration Failed', errorData.message || 'Error occurred during registration.', 'error');
            return false;
        }

        Swal.fire('Success', 'Registration successful! You can now log in.', 'success');
        return true;
    } catch (error) {
        Swal.fire('Error', 'Network error during registration.', 'error');
        return false;
    }
};

// --- LOGIN API ---

export const loginAPI = async (username: string, password: string): Promise<boolean> => {
    try {
        const res = await fetch(`${LOGIN_URL}`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json" 
            },
            // CRITICAL: Tells the browser to send the cookie in response
            credentials: 'include', 
            // Send username and password in the JSON body, as configured in the backend controller.
            body: JSON.stringify({ username, password }) 
        });

        if (res.ok) {
            // Success! The JSESSIONID cookie is now stored by the browser.
            return true;
        } else {
            // Handle 401 Unauthorized or other login failures
            const errorText = await res.text();
            let errorMessage = "Login failed.";
            
            // Check for specific error message if the response body is JSON
            try {
                const errorData = JSON.parse(errorText);
                errorMessage = errorData.message || errorMessage;
            } catch {
                // Ignore if it's not JSON
            }
            
            Swal.fire('Login Failed', errorMessage, 'error');
            return false;
        }
    } catch (error) {
        Swal.fire('Error', 'Network error during login.', 'error');
        return false;
    }
};

// --- LOGOUT API ---

export const logoutAPI = async (): Promise<boolean> => {
    try {
        // Send a POST request to logout
        const res = await fetch(`${BASE_URL}/logout`, {
            method: "POST",
            credentials: 'include' // Must send the cookie so the server knows which session to invalidate
        });

        if (res.ok) {
            return true;
        } else {
            console.error("Server logout failed:", res.status);
            return false;
        }
    } catch (error) {
        console.error("Network error during logout:", error);
        return false;
    }
};