
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface FormFooterProps {
  isLogin: boolean;
}

const FormFooter: React.FC<FormFooterProps> = ({ isLogin }) => {
  return (
    <motion.div 
      className="text-center text-sm text-muted-foreground mt-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
      <motion.div 
        className="inline-block"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          to={isLogin ? "/register" : "/login"}
          className="font-medium text-foreground hover:underline transition relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
        >
          {isLogin ? "Sign up" : "Sign in"}
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default FormFooter;
