
import React, { useState } from "react";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface FormFieldProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  type: string;
  placeholder: string;
  value: string;
  error?: string;
  touched: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rightElement?: React.ReactNode;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  icon,
  type,
  placeholder,
  value,
  error,
  touched,
  onChange,
  rightElement,
  className = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`space-y-2 ${className}`}>
      <motion.label 
        htmlFor={id} 
        className="text-sm font-medium ml-1 inline-block"
        animate={{ 
          color: isFocused 
            ? "var(--primary)" 
            : error && touched 
              ? "rgb(239, 68, 68)" 
              : "currentColor" 
        }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.label>
      <div className="relative">
        <motion.div 
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          animate={{ 
            color: isFocused 
              ? "var(--primary)" 
              : error && touched 
                ? "rgb(239, 68, 68)" 
                : "var(--muted-foreground)"
          }}
          transition={{ duration: 0.2 }}
        >
          {icon}
        </motion.div>
        <motion.input
          type={type}
          id={id}
          name={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          animate={{ 
            boxShadow: isFocused 
              ? error && touched 
                ? "0 0 0 2px rgba(239, 68, 68, 0.2)" 
                : "0 0 0 2px rgba(var(--primary), 0.2)" 
              : "none",
            borderColor: isFocused 
              ? error && touched 
                ? "rgb(239, 68, 68)" 
                : "var(--primary)" 
              : error && touched 
                ? "rgb(239, 68, 68)" 
                : "var(--input)" 
          }}
          transition={{ duration: 0.2 }}
          className={`h-12 w-full pl-10 ${rightElement ? "pr-12" : "pr-4"} rounded-lg border bg-transparent text-sm outline-none transition-all`}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
      {error && touched && (
        <motion.div 
          className="flex items-center gap-x-1 text-red-500 text-sm mt-1 ml-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <AlertCircle size={14} />
          <span>{error}</span>
        </motion.div>
      )}
    </div>
  );
};

export default FormField;
