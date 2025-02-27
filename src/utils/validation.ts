
/**
 * Validates an email address
 * @param email - Email address to validate
 * @returns Object containing validity status and error message if any
 */
export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  // Basic format check
  const basicRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!basicRegex.test(email)) {
    return { isValid: false, error: "Please enter a valid email address" };
  }

  // Check for gmail.com domain
  if (!email.toLowerCase().endsWith('@gmail.com')) {
    return { isValid: false, error: "Only gmail.com email addresses are allowed" };
  }

  return { isValid: true };
};

/**
 * Validates a password and checks strength
 * @param password - Password to validate
 * @returns Object containing validity, strength score, and error message if any
 */
export const validatePassword = (
  password: string
): { isValid: boolean; strength: number; error?: string } => {
  if (!password) {
    return { isValid: false, strength: 0, error: "Password is required" };
  }

  if (password.length < 6) {
    return { 
      isValid: false, 
      strength: 1, 
      error: "Password must be at least 6 characters" 
    };
  }

  // Calculate password strength (0-4)
  let strength = 0;
  
  // Length check
  if (password.length >= 8) strength += 1;
  
  // Contains lowercase
  if (/[a-z]/.test(password)) strength += 1;
  
  // Contains uppercase
  if (/[A-Z]/.test(password)) strength += 1;
  
  // Contains number
  if (/[0-9]/.test(password)) strength += 1;
  
  // Contains special character
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;

  return { 
    isValid: true, 
    strength: Math.min(4, strength), 
  };
};

/**
 * Validates confirm password match
 * @param password - Original password
 * @param confirmPassword - Confirmation password
 * @returns Object containing validity status and error message if any
 */
export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): { isValid: boolean; error?: string } => {
  if (password !== confirmPassword) {
    return { isValid: false, error: "Passwords do not match" };
  }
  
  return { isValid: true };
};
