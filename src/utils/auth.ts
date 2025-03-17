import { User } from '@/types';

/**
 * Validates a user's email and password
 * @param email User's email
 * @param password User's password
 * @returns Boolean indicating if credentials are valid
 */
export const validateCredentials = (email: string, password: string): boolean => {
  // In a real app, this would validate against security requirements
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = password.length >= 8;
  
  return isEmailValid && isPasswordValid;
};

/**
 * Gets the current user from localStorage
 * @returns User object or null if not logged in
 */
export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  
  try {
    const userJson = localStorage.getItem('user');
    if (!userJson) return null;
    
    return JSON.parse(userJson) as User;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

/**
 * Saves user data to localStorage
 * @param user User object to save
 */
export const saveUserToStorage = (user: User): void => {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user to storage:', error);
  }
};

/**
 * Removes user data from localStorage
 */
export const removeUserFromStorage = (): void => {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Error removing user from storage:', error);
  }
}; 