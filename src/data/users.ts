import { Entrepreneur, Investor } from '../types';
import API from '../api/axios';

// 1. We keep these as mutable exports so they don't break your imports
export let entrepreneurs: Entrepreneur[] = [];
export let investors: Investor[] = [];
export let users: (Entrepreneur | Investor)[] = [];

/**
 * NEW: This function fetches data from MongoDB and populates the arrays above.
 * Call this ONCE in your App.tsx or main.tsx
 */
export const initializeUsers = async () => {
    try {
        const [entRes, invRes] = await Promise.all([
            API.get('/api/auth/users?role=entrepreneur'),
            API.get('/api/auth/users?role=investor')
        ]);

        // Update the exported variables
        entrepreneurs = entRes.data;
        investors = invRes.data;
        users = [...entrepreneurs, ...investors];
        
        console.log("Users initialized from Database");
    } catch (error) {
        console.error("Failed to initialize users:", error);
    }
};

// 2. Helper function to find a user by ID (No changes to signature)
export const findUserById = (id: string) => {
  return users.find(user => user.id === id) || null;
};

// 3. Helper function to get a user by role (No changes to signature)
export const getUsersByRole = (role: 'entrepreneur' | 'investor') => {
  return users.filter(user => user.role === role);
};

// import { Entrepreneur, Investor } from '../types';

// export const entrepreneurs: Entrepreneur[] = [
  
// ];

// export const investors: Investor[] = [

// ];

// // Combined user data for lookup
// export const users = [...entrepreneurs, ...investors];

// // Helper function to find a user by ID
// export const findUserById = (id: string) => {
//   return users.find(user => user.id === id) || null;
// };

// // Helper function to get a user by role
// export const getUsersByRole = (role: 'entrepreneur' | 'investor') => {
//   return users.filter(user => user.role === role);
// };