import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, UserRole, AuthContextType } from '../types';
import toast from 'react-hot-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const USER_STORAGE_KEY = 'business_nexus_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const formattedUser: User = {
          ...parsedUser,
          id: parsedUser.id || parsedUser._id,
          balance: parsedUser.balance ?? 0
        };
        setUser(formattedUser);
      } catch (e) {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const refreshUser = async () => {
    // We use localStorage as a backup to get the ID if the state is still loading
    const storedUser = JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || '{}');
    const userId = user?.id || storedUser.id || storedUser._id;

    if (!userId) return;

    try {
      const response = await fetch(`http://localhost:5000/api/auth/profile/${userId}`);
      const data = await response.json();
      
      if (response.ok) {
        // Handle both { user: { balance: 500 } } and { balance: 500 }
        const userData = data.user || data; 
        
        const updatedUser: User = { 
          ...user, 
          ...(user ? {} : userData), // If user state is null, fill it with userData
          id: userId,
          balance: Number(userData.balance) || 0,
          name: userData.name || user?.name,
          email: userData.email || user?.email,
          role: userData.role || user?.role,
          avatarUrl: userData.avatarUrl || user?.avatarUrl || `https://ui-avatars.com/api/?name=${userData.name}&background=random`,
          bio: userData.bio || user?.bio || ''
        };

        setUser(updatedUser);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
        console.log("✅ Balance successfully refreshed to:", updatedUser.balance);
      }
    } catch (error) {
      console.error("❌ Failed to refresh user data", error);
    }
  };

  const login = async (email: string, password: string, role: UserRole): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');

      const rawUser = data.user || data;
      const loggedInUser: User = {
        id: rawUser.id || rawUser._id, 
        name: rawUser.name,
        email: rawUser.email,
        role: rawUser.role as UserRole,
        balance: rawUser.balance ?? 0,
        avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(rawUser.name)}&background=random`,
        bio: rawUser.bio || '',
        isOnline: true,
        createdAt: rawUser.createdAt || new Date().toISOString()
      };

      setUser(loggedInUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(loggedInUser));
      if (data.token) localStorage.setItem('token', data.token);
      toast.success('Successfully logged in!');
    } catch (error) {
      toast.error((error as Error).message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Registration failed');
      const newUser: User = {
        id: data.user.id || data.user._id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role as UserRole,
        balance: data.user.balance ?? 0,
        avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
        bio: '',
        isOnline: true,
        createdAt: data.user.createdAt || new Date().toISOString()
      };
      setUser(newUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
      if (data.token) localStorage.setItem('token', data.token);
      toast.success('Account created successfully!');
    } catch (error) {
      toast.error((error as Error).message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
  };

  const updateProfile = async (userId: string, updates: Partial<User>): Promise<void> => {
    try {
      if (user?.id === userId) {
        const updatedUser = { ...user, ...updates } as User;
        setUser(updatedUser);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      }
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    updateProfile,
    refreshUser, 
    isAuthenticated: !!user,
    isLoading,
    forgotPassword: async () => {},
    resetPassword: async () => {}
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { User, UserRole, AuthContextType } from '../types';
// import { users as mockUsers } from '../data/users'; 
// import toast from 'react-hot-toast';

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// const USER_STORAGE_KEY = 'business_nexus_user';
// const RESET_TOKEN_KEY = 'business_nexus_reset_token';

// // export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
// //   const [user, setUser] = useState<User | null>(null);
// //   const [isLoading, setIsLoading] = useState(true);


//   export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const [user, setUser] = useState<User | null>(null);
//     const [isLoading, setIsLoading] = useState(true);
//   // ✅ Hydrate user from localStorage on mount
//   useEffect(() => {
//     const storedUser = localStorage.getItem(USER_STORAGE_KEY);
//     if (storedUser) {
//       try {
//         const parsedUser = JSON.parse(storedUser);
//         const formattedUser: User = {
//           ...parsedUser,
//           id: parsedUser.id || parsedUser._id,
//           balance: parsedUser.balance ?? 0
//         };
//         setUser(formattedUser);
//       } catch (e) {
//         localStorage.removeItem(USER_STORAGE_KEY);
//       }
//     }
//     setIsLoading(false);
//   }, []);

//   // ✅ NEW: Refresh User Balance/Data from Backend
//   const refreshUser = async () => {
//     if (!user?.id) return;
//     try {
//       const response = await fetch(`http://localhost:5000/api/auth/profile/${user.id}`);
//       const data = await response.json();
      
//       if (response.ok) {
//         // Check if the backend sends { user: {...} } or just { ... }
//         const userData = data.user || data; 
        
//         const updatedUser: User = { 
//           ...user, 
//           balance: userData.balance ?? 0,
//           bio: userData.bio || user.bio 
//         };

//         setUser(updatedUser);
//         localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
//         console.log("Balance refreshed to:", updatedUser.balance);
//       }
//     } catch (error) {
//       console.error("Failed to refresh user data", error);
//     }
//   };

//   // ✅ IMPROVED: Login logic to ensure ID mapping
//   const login = async (email: string, password: string, role: UserRole): Promise<void> => {
//     setIsLoading(true);
//     try {
//       const response = await fetch('http://localhost:5000/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password, role }),
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || 'Login failed');

//       const rawUser = data.user || data;

//       const loggedInUser: User = {
//         id: rawUser.id || rawUser._id, 
//         name: rawUser.name,
//         email: rawUser.email,
//         role: rawUser.role as UserRole,
//         balance: rawUser.balance ?? 0,
//         avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(rawUser.name)}&background=random`,
//         bio: rawUser.bio || '',
//         isOnline: true,
//         createdAt: rawUser.createdAt || new Date().toISOString()
//       };

//       setUser(loggedInUser);
//       localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(loggedInUser));
//       if (data.token) localStorage.setItem('token', data.token);
//       toast.success('Successfully logged in!');
//     } catch (error) {
//       toast.error((error as Error).message);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const register = async (name: string, email: string, password: string, role: UserRole): Promise<void> => {
//     setIsLoading(true);
//     try {
//       const response = await fetch('http://localhost:5000/api/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password, role }),
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || 'Registration failed');

//       const newUser: User = {
//         id: data.user.id || data.user._id,
//         name: data.user.name,
//         email: data.user.email,
//         role: data.user.role as UserRole,
//         balance: data.user.balance ?? 0,
//         avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
//         bio: '',
//         isOnline: true,
//         createdAt: data.user.createdAt || new Date().toISOString()
//       };
      
//       setUser(newUser);
//       localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
//       if (data.token) localStorage.setItem('token', data.token);
//       toast.success('Account created successfully!');
//     } catch (error) {
//       toast.error((error as Error).message);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const logout = (): void => {
//     setUser(null);
//     localStorage.removeItem(USER_STORAGE_KEY);
//     localStorage.removeItem('token');
//     toast.success('Logged out successfully');
//   };

//   const updateProfile = async (userId: string, updates: Partial<User>): Promise<void> => {
//     try {
//       // Simulate API call or replace with real fetch
//       await new Promise(resolve => setTimeout(resolve, 500));
//       if (user?.id === userId) {
//         const updatedUser = { ...user, ...updates } as User;
//         setUser(updatedUser);
//         localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
//       }
//       toast.success('Profile updated successfully');
//     } catch (error) {
//       toast.error((error as Error).message);
//       throw error;
//     }
//   };

//   const value: AuthContextType = {
//     user,
//     login,
//     register,
//     logout,
//     updateProfile,
//     refreshUser, 
//     isAuthenticated: !!user,
//     isLoading,
//     forgotPassword: async () => {},
//     resetPassword: async () => {}
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };