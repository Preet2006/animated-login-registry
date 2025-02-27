
import { useState, useEffect } from "react";

interface PasswordStrengthProps {
  strength: number;
  className?: string;
}

const PasswordStrength = ({ strength, className = "" }: PasswordStrengthProps) => {
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

  return (
    <div className={`w-full space-y-1 ${className}`}>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Password strength:</span>
        <span className={`font-medium transition-colors ${
          strength === 0 ? "text-muted-foreground" :
          strength === 1 ? "text-red-500" :
          strength === 2 ? "text-orange-500" :
          strength === 3 ? "text-yellow-500" :
          "text-green-500"
        }`}>
          {getLabel()}
        </span>
      </div>
      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ease-out ${getColor()}`}
          style={{ 
            width: animateIn ? `${width}%` : '0%',
          }}
        ></div>
      </div>
    </div>
  );
};

export default PasswordStrength;
