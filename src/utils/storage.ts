
// Storage keys
const USER_KEY = "auth_user";
const TOKEN_KEY = "auth_token";

// User type
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

// Check if user is logged in
export const isLoggedIn = (): boolean => {
  return !!localStorage.getItem(TOKEN_KEY);
};

// Get current user
export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem(USER_KEY);
  if (!userJson) return null;
  
  try {
    return JSON.parse(userJson);
  } catch (error) {
    console.error("Failed to parse user data", error);
    return null;
  }
};

// Save user to storage
export const saveUser = (user: Omit<User, "id">): void => {
  // Generate a random ID
  const id = Math.random().toString(36).substring(2, 15);
  
  // Save user with ID
  const userWithId = { ...user, id };
  localStorage.setItem(USER_KEY, JSON.stringify(userWithId));
};

// Update user in storage
export const updateUser = (user: User): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

// Login user
export const loginUser = (email: string, password: string): User | null => {
  // For demo purposes, let's create some sample users if none exist
  createSampleUsers();
  
  const userJson = localStorage.getItem(USER_KEY);
  if (!userJson) return null;
  
  try {
    const user = JSON.parse(userJson);
    
    // Basic login validation
    if (user.email === email && user.password === password) {
      // Set token to indicate user is logged in
      localStorage.setItem(TOKEN_KEY, "demo-token-" + Date.now());
      return user;
    }
  } catch (error) {
    console.error("Failed to parse user data", error);
  }
  
  return null;
};

// Logout user
export const logoutUser = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

// Helper function to create sample users for demo
const createSampleUsers = (): void => {
  if (!localStorage.getItem(USER_KEY)) {
    const sampleUser = {
      id: "sample-1",
      name: "John Doe",
      email: "john@gmail.com",
      password: "Password123"
    };
    
    localStorage.setItem(USER_KEY, JSON.stringify(sampleUser));
  }
};
