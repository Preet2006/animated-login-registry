
import { useState, FormEvent, ChangeEvent } from "react";
import { Eye, EyeOff, Mail, User, Lock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import PasswordStrength from "../PasswordStrength";
import { validateEmail, validatePassword, validateConfirmPassword } from "@/utils/validation";
import { saveUser } from "@/utils/storage";
import FormField from "./FormField";
import FormButton from "./FormButton";
import FormFooter from "./FormFooter";

interface FormField {
  value: string;
  error?: string;
  touched: boolean;
}

const RegisterForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
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
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  
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
      
      // Check if passwords match when password changes
      if (confirmPassword.value) {
        setPasswordsMatch(value === confirmPassword.value);
      }
    }
    
    // Check if passwords match when confirm password changes
    if (name === "confirmPassword") {
      setPasswordsMatch(value === password.value);
    }
  };
  
  // Validate the form
  const validateForm = (): boolean => {
    let isValid = true;
    
    // Validate name
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
    
    // Validate confirm password
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
      
      // Handle registration
      saveUser({
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
  
  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };
  
  return (
    <motion.form 
      variants={formVariants}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit} 
      className="space-y-5"
    >
      <motion.div variants={itemVariants}>
        <FormField
          id="name"
          label="Full Name"
          icon={<User size={18} />}
          type="text"
          placeholder="John Doe"
          value={name.value}
          error={name.error}
          touched={name.touched}
          onChange={(e) => handleChange(e, setName)}
        />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <FormField
          id="email"
          label="Email Address"
          icon={<Mail size={18} />}
          type="email"
          placeholder="your.email@gmail.com"
          value={email.value}
          error={email.error}
          touched={email.touched}
          onChange={(e) => handleChange(e, setEmail)}
        />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <FormField
          id="password"
          label="Password"
          icon={<Lock size={18} className={passwordStrength >= 3 ? "text-green-500" : ""} />}
          type={showPassword ? "text" : "password"}
          placeholder="Create password"
          value={password.value}
          error={password.error}
          touched={password.touched}
          onChange={(e) => handleChange(e, setPassword)}
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
        />
      </motion.div>
      
      {password.touched && password.value && (
        <motion.div 
          variants={itemVariants}
          className="mt-3"
        >
          <PasswordStrength 
            password={password.value}
            strength={passwordStrength} 
          />
        </motion.div>
      )}
      
      <motion.div variants={itemVariants}>
        <FormField
          id="confirmPassword"
          label="Confirm Password"
          icon={
            <motion.div
              animate={
                confirmPassword.value && passwordsMatch
                  ? { rotate: [0, 15, 0], scale: [1, 1.2, 1], color: "#22c55e" }
                  : {}
              }
              transition={{ duration: 0.5 }}
            >
              {confirmPassword.value && passwordsMatch ? (
                <CheckCircle size={18} className="text-green-500" />
              ) : (
                <Lock size={18} />
              )}
            </motion.div>
          }
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm your password"
          value={confirmPassword.value}
          error={confirmPassword.error}
          touched={confirmPassword.touched}
          onChange={(e) => handleChange(e, setConfirmPassword)}
          rightElement={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
        />
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <FormButton label="Create Account" isSubmitting={isSubmitting} />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <FormFooter isLogin={false} />
      </motion.div>
    </motion.form>
  );
};

export default RegisterForm;
