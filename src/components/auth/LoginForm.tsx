
import { useState, FormEvent, ChangeEvent } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { validateEmail, validatePassword } from "@/utils/validation";
import { loginUser } from "@/utils/storage";
import FormField from "./FormField";
import FormButton from "./FormButton";
import FormFooter from "./FormFooter";

interface FormField {
  value: string;
  error?: string;
  touched: boolean;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Form fields
  const [email, setEmail] = useState<FormField>({ value: "", touched: false });
  const [password, setPassword] = useState<FormField>({ value: "", touched: false });
  
  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<FormField>>
  ) => {
    const { value } = e.target;
    setter(prev => ({ ...prev, value, touched: true }));
  };
  
  // Validate the form
  const validateForm = (): boolean => {
    let isValid = true;
    
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
          icon={<Lock size={18} />}
          type={showPassword ? "text" : "password"}
          placeholder="Your password"
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
      
      <motion.div 
        variants={itemVariants}
        className="flex justify-end"
      >
        <Link 
          to="#" 
          className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:scale-105 inline-block"
        >
          Forgot password?
        </Link>
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <FormButton label="Sign in" isSubmitting={isSubmitting} />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <FormFooter isLogin={true} />
      </motion.div>
    </motion.form>
  );
};

export default LoginForm;
