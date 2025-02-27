
import { motion } from "framer-motion";
import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";

interface AuthFormProps {
  mode: "login" | "register";
}

const AuthForm = ({ mode }: AuthFormProps) => {
  const isLogin = mode === "login";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto"
    >
      <motion.div 
        className="glass dark:glass-dark rounded-2xl px-8 pt-10 pb-12 shadow-xl relative overflow-hidden"
        whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-blue-300 opacity-20 blur-3xl dark:opacity-10"
          animate={{ 
            x: [0, 30, 0], 
            y: [0, 30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-purple-300 opacity-20 blur-3xl dark:opacity-10"
          animate={{ 
            x: [0, -30, 0], 
            y: [0, -30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        <div className="relative z-10">
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.h1 
              className="text-3xl font-bold mb-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {isLogin ? "Welcome back" : "Create account"}
            </motion.h1>
            <motion.p 
              className="text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {isLogin 
                ? "Enter your credentials to access your account" 
                : "Fill out the form below to create your account"}
            </motion.p>
          </motion.div>
          
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AuthForm;
