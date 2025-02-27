
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import AuthForm from "@/components/AuthForm";
import { isLoggedIn } from "@/utils/storage";
import { useTheme } from "@/hooks/use-theme";

const Register = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  
  // Check if user is already logged in
  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col justify-center p-4 sm:p-6 md:p-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="absolute top-4 right-4"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground"
            aria-label="Toggle theme"
            variants={itemVariants}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
        </motion.div>
        
        <motion.div 
          className="w-full max-w-md mx-auto mb-8 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="inline-block"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.1, 
              rotate: [0, -5, 5, -5, 0],
              transition: { duration: 0.5 }
            }}
          >
            <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-2xl shadow-lg">
              A
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-3xl font-bold mt-6 mb-2"
            variants={itemVariants}
          >
            Create Account
          </motion.h1>
          
          <motion.p 
            className="text-muted-foreground"
            variants={itemVariants}
          >
            Sign up to get started with our service
          </motion.p>
        </motion.div>
        
        <AuthForm mode="register" />
      </div>
    </PageTransition>
  );
};

export default Register;
