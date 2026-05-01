
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://nexus-business-lemon.vercel.app";
// export const API_BASE_URL = (import.meta as any).env.VITE_API_BASE_URL || "https://nexus-business-lemon.vercel.app";

// For Socket.io specifically (since it needs a slightly different protocol handling sometimes)
export const SOCKET_URL = API_BASE_URL;