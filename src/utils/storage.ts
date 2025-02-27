
/**
 * User data structure
 */
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

/**
 * Storage key for users
 */
const USERS_STORAGE_KEY = 'auth_app_users';
const CURRENT_USER_KEY = 'auth_app_current_user';

/**
 * Save a new user to local storage
 * @param user User object to save
 */
export const saveUser = (user: Omit<User, 'id' | 'createdAt'>): User => {
  const users = getUsers();
  
  // Check if email already exists
  if (users.some(u => u.email.toLowerCase() === user.email.toLowerCase())) {
    throw new Error('This email is already registered');
  }
  
  // Create new user with ID and timestamp
  const newUser: User = {
    ...user,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
  
  // Add to users array and save
  users.push(newUser);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  
  return newUser;
};

/**
 * Retrieve all users from local storage
 */
export const getUsers = (): User[] => {
  const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
  if (!usersJson) return [];
  
  try {
    return JSON.parse(usersJson);
  } catch (e) {
    console.error('Failed to parse users from storage:', e);
    return [];
  }
};

/**
 * Find a user by email and password (login)
 * @param email User's email
 * @param password User's password
 * @returns User object if found, null otherwise
 */
export const loginUser = (email: string, password: string): User | null => {
  const users = getUsers();
  const user = users.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  
  if (user) {
    // Store current user in session
    setCurrentUser(user);
  }
  
  return user || null;
};

/**
 * Store current logged in user
 */
export const setCurrentUser = (user: User): void => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

/**
 * Get current logged in user
 */
export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem(CURRENT_USER_KEY);
  if (!userJson) return null;
  
  try {
    return JSON.parse(userJson);
  } catch (e) {
    console.error('Failed to parse current user from storage:', e);
    return null;
  }
};

/**
 * Log out current user
 */
export const logoutUser = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

/**
 * Check if user is logged in
 */
export const isLoggedIn = (): boolean => {
  return getCurrentUser() !== null;
};

/**
 * Generate a random ID
 */
const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};
