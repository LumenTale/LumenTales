import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        // In a real app, this would be an API call to validate the session
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error('Failed to restore authentication state:', err);
      } finally {
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call to authenticate
      // Mock implementation for demo purposes
      if (email === 'demo@lumentales.com' && password === 'password') {
        const mockUser: User = {
          id: '1',
          name: 'Demo User',
          email: 'demo@lumentales.com',
          role: 'user',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        router.push('/dashboard');
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call to register
      // Mock implementation for demo purposes
      const mockUser: User = {
        id: '1',
        name,
        email,
        role: 'user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      router.push('/dashboard');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/');
  };

  // Reset password function
  const resetPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call to reset password
      // Mock implementation for demo purposes
      console.log(`Password reset email sent to ${email}`);
      router.push('/login?reset=true');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 