
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { isLoggedIn } from "@/utils/storage";

const Index = () => {
  const navigate = useNavigate();
  
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
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
                A
              </div>
              <span className="font-medium">Auth App</span>
            </div>
            
            <nav className="flex items-center gap-x-2">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-secondary transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                Register
              </Link>
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
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-2xl mx-auto mb-8 animate-pulse-subtle">
                A
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
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
              className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            >
              <Link
                to="/register"
                className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                Create an account
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 rounded-lg border border-input bg-background hover:bg-secondary transition-colors font-medium"
              >
                Sign in
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Index;
