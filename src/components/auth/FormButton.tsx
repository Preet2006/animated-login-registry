
import React from "react";
import { motion } from "framer-motion";

interface FormButtonProps {
  label: string;
  isSubmitting: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const FormButton: React.FC<FormButtonProps> = ({
  label,
  isSubmitting,
  onClick,
  type = "submit",
}) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isSubmitting}
      className="relative w-full h-12 bg-primary text-primary-foreground rounded-lg text-sm font-medium transition-all hover:opacity-90 disabled:opacity-70 overflow-hidden"
      whileHover={{ 
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        scale: 1.02
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isSubmitting ? (
        <div className="flex items-center justify-center">
          <motion.div 
            className="h-5 w-5 rounded-full border-b-2 border-white"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          ></motion.div>
        </div>
      ) : (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.span>
      )}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-white/20"
        initial={{ width: 0 }}
        animate={{ width: isSubmitting ? "100%" : 0 }}
        transition={{ duration: 2, repeat: isSubmitting ? Infinity : 0 }}
      />
      <motion.div
        className="absolute inset-0 bg-white opacity-0"
        animate={{ opacity: [0, 0.1, 0] }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
          repeatDelay: 1
        }}
      />
    </motion.button>
  );
};

export default FormButton;
