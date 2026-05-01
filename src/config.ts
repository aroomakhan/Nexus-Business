// export const API_BASE_URL = window.location.hostname === "localhost" 
//     ? "http://localhost:5000" 
//     : "https://nexus-business-iota.vercel.app";

    // Use Vite's built-in environment variable handling
// Locally, this will use http://localhost:5000 (if you set it in .env)
// On Vercel, it will use your actual deployed backend URL

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://nexus-business-lemon.vercel.app";

// For Socket.io specifically (since it needs a slightly different protocol handling sometimes)
export const SOCKET_URL = API_BASE_URL;