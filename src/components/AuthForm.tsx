
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
        
        {isLogin ? <LoginForm /> : <RegisterForm />}
      </div>
    </motion.div>
  );
};

export default AuthForm;
