// src/component/LoginPrompt.tsx (FINAL CORRECT VERSION)

import Swal from 'sweetalert2';
// 🎯 FIX: Add 'type' keyword to the import to resolve the SyntaxError.
import { type NavigateFunction } from 'react-router-dom'; 

export const promptLogin = (navigate: NavigateFunction) => {
    Swal.fire({
        icon: "info",
        title: "Login Required",
        text: "Please log in or register to begin summarizing text and files.",
        showCancelButton: true,
        confirmButtonText: "Log In Now",
        cancelButtonText: "Maybe Later",
        confirmButtonColor: "#6d28d9", 
        cancelButtonColor: "#555",
    }).then((result) => {
        if (result.isConfirmed) {
            navigate('/login');
        }
    });
};