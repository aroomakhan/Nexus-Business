// 1. Comment out or delete the line that is causing the error:
// export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://nexus-business-name.vercel.app";

// 2. Use this version instead (The "any" cast tells TypeScript to stop complaining):
export const API_BASE_URL = (import.meta as any).env.VITE_API_BASE_URL || "https://nexus-business-backend.vercel.app";

// 3. Keep your socket URL as is
export const SOCKET_URL = API_BASE_URL;