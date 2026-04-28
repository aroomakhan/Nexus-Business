// export const API_BASE_URL = window.location.hostname === "localhost" 
//     ? "http://localhost:5000" 
//     : "https://nexus-business-iota.vercel.app";
// Replace the URL below with your actual Vercel backend link
const LIVE_BACKEND_URL = "https://nexus-business-iota.vercel.app";

export const API_BASE_URL = window.location.hostname === "localhost" 
    ? "http://localhost:5000" 
    : LIVE_BACKEND_URL;