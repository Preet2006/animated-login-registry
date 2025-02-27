
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { isLoggedIn } from "@/utils/storage";
import { useTheme } from "@/hooks/use-theme";

const Index = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  
  // Check if user is already logged in
  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="container flex items-center justify-between h-16 px-4">
            <div className="flex items-center gap-x-3">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold"
              >
                A
              </motion.div>
              <span className="font-medium">Auth App</span>
            </div>
            
            <nav className="flex items-center gap-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-secondary hover:bg-secondary/80 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>
              
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-secondary transition-colors"
              >
                Login
              </Link>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  Register
                </Link>
              </motion.div>
            </nav>
          </div>
        </header>
        
        {/* Hero section */}
        <section className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-3xl mx-auto mb-10 shadow-lg"
              >
                A
              </motion.div>
              <h1 className="text-4xl sm:text-6xl font-bold mb-6 tracking-tight bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Secure Authentication
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A beautifully designed authentication experience with smooth animations and modern design.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Link
                  to="/register"
                  className="w-full sm:w-auto inline-block px-8 py-4 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all shadow-lg"
                >
                  Create an account
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Link
                  to="/login"
                  className="w-full sm:w-auto inline-block px-8 py-4 rounded-lg border border-input bg-secondary/50 hover:bg-secondary transition-all font-medium shadow-lg"
                >
                  Sign in
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              {[
                {
                  title: "Secure",
                  description: "We take security seriously with password strength indicators and validation."
                },
                {
                  title: "Fast",
                  description: "Quick and responsive authentication with smooth transitions."
                },
                {
                  title: "Beautiful",
                  description: "Modern design with animations and a dark/light mode toggle."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -10 }}
                  className="p-6 rounded-xl bg-card border border-border shadow-md"
                >
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Index;
