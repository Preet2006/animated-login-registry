
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, Moon, Sun, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PageTransition from "@/components/PageTransition";
import { getCurrentUser, logoutUser } from "@/utils/storage";
import { useTheme } from "@/hooks/use-theme";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme, toggleTheme } = useTheme();
  const user = getCurrentUser();
  
  useEffect(() => {
    // If not logged in, redirect to login
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logoutUser();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  if (!user) return null;

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
            
            <div className="flex items-center gap-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-secondary hover:bg-secondary/80 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>
              
              <div className="flex items-center gap-x-2">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <User size={16} />
                </div>
                <span className="text-sm font-medium hidden sm:inline-block">
                  {user.name}
                </span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-x-1"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline-block">Logout</span>
              </motion.button>
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 container p-4 sm:p-6 md:p-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}!</h1>
              <p className="text-muted-foreground">
                This is your dashboard. You are now signed in with {user.email}.
              </p>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Profile", description: "Manage your account settings and preferences" },
              { title: "Security", description: "Update your password and security settings" },
              { title: "Notifications", description: "Control what notifications you receive" },
              { title: "Billing", description: "View your billing history and payment methods" }
            ].map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <div className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-medium mb-2">{card.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
