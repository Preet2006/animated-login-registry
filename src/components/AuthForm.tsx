
import { useState, FormEvent, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, User, Lock, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import PasswordStrength from "./PasswordStrength";
import { validateEmail, validatePassword, validateConfirmPassword } from "@/utils/validation";
import { saveUser, loginUser } from "@/utils/storage";

interface FormField {
  value: string;
  error?: string;
  touched: boolean;
}

interface AuthFormProps {
  mode: "login" | "register";
}

const AuthForm = ({ mode }: AuthFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isLogin = mode === "login";
  
  // Form fields
  const [name, setName] = useState<FormField>({ value: "", touched: false });
  const [email, setEmail] = useState<FormField>({ value: "", touched: false });
  const [password, setPassword] = useState<FormField>({ value: "", touched: false });
  const [confirmPassword, setConfirmPassword] = useState<FormField>({ value: "", touched: false });
  
  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  // Handle input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<FormField>>
  ) => {
    const { name, value } = e.target;
    
    setter(prev => ({ ...prev, value, touched: true }));
    
    // Validate password strength as user types
    if (name === "password") {
      const result = validatePassword(value);
      setPasswordStrength(result.strength);
    }
  };
  
  // Validate the form
  const validateForm = (): boolean => {
    let isValid = true;
    
    // Validate name (register only)
    if (!isLogin) {
      if (!name.value.trim()) {
        setName(prev => ({ 
          ...prev, 
          error: "Name is required",
          touched: true 
        }));
        isValid = false;
      } else {
        setName(prev => ({ ...prev, error: undefined }));
      }
    }
    
    // Validate email
    const emailResult = validateEmail(email.value);
    if (!emailResult.isValid) {
      setEmail(prev => ({ 
        ...prev, 
        error: emailResult.error,
        touched: true 
      }));
      isValid = false;
    } else {
      setEmail(prev => ({ ...prev, error: undefined }));
    }
    
    // Validate password
    const passwordResult = validatePassword(password.value);
    if (!passwordResult.isValid) {
      setPassword(prev => ({ 
        ...prev, 
        error: passwordResult.error,
        touched: true
      }));
      isValid = false;
    } else {
      setPassword(prev => ({ ...prev, error: undefined }));
    }
    
    // Validate confirm password (register only)
    if (!isLogin) {
      const confirmResult = validateConfirmPassword(password.value, confirmPassword.value);
      if (!confirmResult.isValid) {
        setConfirmPassword(prev => ({ 
          ...prev, 
          error: confirmResult.error,
          touched: true
        }));
        isValid = false;
      } else {
        setConfirmPassword(prev => ({ ...prev, error: undefined }));
      }
    }
    
    return isValid;
  };
  
  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Add a slight delay to simulate server request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (isLogin) {
        // Handle login
        const user = loginUser(email.value, password.value);
        if (user) {
          toast({
            title: "Welcome back!",
            description: `You've successfully logged in as ${user.name}`,
          });
          navigate("/dashboard");
        } else {
          toast({
            variant: "destructive",
            title: "Login failed",
            description: "Invalid email or password. Please try again.",
          });
        }
      } else {
        // Handle registration
        const newUser = saveUser({
          name: name.value,
          email: email.value,
          password: password.value
        });
        
        toast({
          title: "Registration successful!",
          description: "Your account has been created. You can now log in.",
        });
        
        // Navigate to login page after successful registration
        navigate("/login");
      }
    } catch (error) {
      let message = "Something went wrong. Please try again.";
      if (error instanceof Error) {
        message = error.message;
      }
      
      toast({
        variant: "destructive",
        title: "Error",
        description: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="glass dark:glass-dark rounded-2xl px-8 pt-10 pb-12 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {isLogin ? "Welcome back" : "Create account"}
          </h1>
          <p className="text-muted-foreground">
            {isLogin 
              ? "Enter your credentials to access your account" 
              : "Fill out the form below to create your account"}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium ml-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={name.value}
                  onChange={e => handleChange(e, setName)}
                  className={`h-12 w-full pl-10 rounded-lg border bg-transparent pr-4 text-sm outline-none transition-all focus:ring-2 ${
                    name.error && name.touched 
                      ? "border-red-500 focus:ring-red-200" 
                      : "border-input focus:ring-primary/20"
                  }`}
                />
              </div>
              {name.error && name.touched && (
                <div className="flex items-center gap-x-1 text-red-500 text-sm mt-1 ml-1">
                  <AlertCircle size={14} />
                  <span>{name.error}</span>
                </div>
              )}
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium ml-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Mail size={18} />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your.email@gmail.com"
                value={email.value}
                onChange={e => handleChange(e, setEmail)}
                className={`h-12 w-full pl-10 rounded-lg border bg-transparent pr-4 text-sm outline-none transition-all focus:ring-2 ${
                  email.error && email.touched 
                    ? "border-red-500 focus:ring-red-200" 
                    : "border-input focus:ring-primary/20"
                }`}
              />
            </div>
            {email.error && email.touched && (
              <div className="flex items-center gap-x-1 text-red-500 text-sm mt-1 ml-1">
                <AlertCircle size={14} />
                <span>{email.error}</span>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium ml-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder={isLogin ? "Your password" : "Create password"}
                value={password.value}
                onChange={e => handleChange(e, setPassword)}
                className={`h-12 w-full pl-10 pr-12 rounded-lg border bg-transparent text-sm outline-none transition-all focus:ring-2 ${
                  password.error && password.touched 
                    ? "border-red-500 focus:ring-red-200" 
                    : "border-input focus:ring-primary/20"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {password.error && password.touched && (
              <div className="flex items-center gap-x-1 text-red-500 text-sm mt-1 ml-1">
                <AlertCircle size={14} />
                <span>{password.error}</span>
              </div>
            )}
            
            {!isLogin && password.touched && password.value && (
              <PasswordStrength strength={passwordStrength} className="mt-3" />
            )}
          </div>
          
          {!isLogin && (
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium ml-1">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Lock size={18} />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={confirmPassword.value}
                  onChange={e => handleChange(e, setConfirmPassword)}
                  className={`h-12 w-full pl-10 pr-12 rounded-lg border bg-transparent text-sm outline-none transition-all focus:ring-2 ${
                    confirmPassword.error && confirmPassword.touched 
                      ? "border-red-500 focus:ring-red-200" 
                      : "border-input focus:ring-primary/20"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {confirmPassword.error && confirmPassword.touched && (
                <div className="flex items-center gap-x-1 text-red-500 text-sm mt-1 ml-1">
                  <AlertCircle size={14} />
                  <span>{confirmPassword.error}</span>
                </div>
              )}
            </div>
          )}
          
          {isLogin && (
            <div className="flex justify-end">
              <Link 
                to="#" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Forgot password?
              </Link>
            </div>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="relative w-full h-12 bg-primary text-primary-foreground rounded-lg text-sm font-medium transition-all hover:opacity-90 disabled:opacity-70"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
              </div>
            ) : (
              isLogin ? "Sign in" : "Create Account"
            )}
          </button>
          
          <div className="text-center text-sm text-muted-foreground mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link
              to={isLogin ? "/register" : "/login"}
              className="font-medium text-foreground hover:underline transition"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </Link>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AuthForm;
