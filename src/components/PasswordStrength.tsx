
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

interface PasswordStrengthProps {
  password: string;
  strength: number;
  className?: string;
}

const PasswordStrength = ({ password, strength, className = "" }: PasswordStrengthProps) => {
  const [animateIn, setAnimateIn] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimateIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Calculate width percentage based on strength
  const width = (strength / 4) * 100;
  
  // Define color based on strength
  const getColor = () => {
    switch (strength) {
      case 0: return "bg-gray-200";
      case 1: return "bg-red-500";
      case 2: return "bg-orange-500";
      case 3: return "bg-yellow-500";
      case 4: return "bg-green-500";
      default: return "bg-gray-200";
    }
  };
  
  // Define label based on strength
  const getLabel = () => {
    switch (strength) {
      case 0: return "No password";
      case 1: return "Weak";
      case 2: return "Fair";
      case 3: return "Good";
      case 4: return "Strong";
      default: return "";
    }
  };

  // Password requirements
  const hasLength = password.length >= 8;
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

  return (
    <div className={`w-full space-y-3 ${className}`}>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Password strength:</span>
        <motion.span 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`font-medium transition-colors ${
            strength === 0 ? "text-muted-foreground" :
            strength === 1 ? "text-red-500" :
            strength === 2 ? "text-orange-500" :
            strength === 3 ? "text-yellow-500" :
            "text-green-500"
          }`}
        >
          {getLabel()}
        </motion.span>
      </div>
      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <motion.div 
          className={`h-full rounded-full transition-all duration-500 ease-out ${getColor()}`}
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        ></motion.div>
      </div>
      
      {password.length > 0 && (
        <motion.div 
          className="bg-secondary/50 rounded-lg p-3 mt-3 space-y-2"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
        >
          <h4 className="text-xs font-medium mb-2">Password requirements:</h4>
          <ul className="space-y-1.5 text-xs">
            <RequirementItem fulfilled={hasLength}>
              At least 8 characters
            </RequirementItem>
            <RequirementItem fulfilled={hasLowerCase}>
              At least one lowercase letter
            </RequirementItem>
            <RequirementItem fulfilled={hasUpperCase}>
              At least one uppercase letter
            </RequirementItem>
            <RequirementItem fulfilled={hasNumber}>
              At least one number
            </RequirementItem>
            <RequirementItem fulfilled={hasSpecialChar}>
              At least one special character
            </RequirementItem>
          </ul>
        </motion.div>
      )}
    </div>
  );
};

const RequirementItem = ({ 
  fulfilled, 
  children 
}: { 
  fulfilled: boolean, 
  children: React.ReactNode 
}) => {
  return (
    <motion.li 
      className={`flex items-center gap-2 ${fulfilled ? "text-green-600" : "text-muted-foreground"}`}
      initial={{ opacity: 0, x: -5 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {fulfilled ? (
        <CheckCircle2 className="text-green-500" size={14} />
      ) : (
        <XCircle className="text-muted-foreground" size={14} />
      )}
      <span>{children}</span>
    </motion.li>
  );
};

export default PasswordStrength;
