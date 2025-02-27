
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PageTransition from "@/components/PageTransition";
import { getCurrentUser, logoutUser } from "@/utils/storage";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
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
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
                A
              </div>
              <span className="font-medium">Auth App</span>
            </div>
            
            <div className="flex items-center gap-x-4">
              <div className="flex items-center gap-x-2">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <User size={16} />
                </div>
                <span className="text-sm font-medium hidden sm:inline-block">
                  {user.name}
                </span>
              </div>
              
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-x-1"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline-block">Logout</span>
              </button>
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
            {[1, 2, 3, 4].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
                className="p-6 rounded-xl bg-card border border-border hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <div className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-medium mb-2">Card Title {index}</h3>
                <p className="text-muted-foreground text-sm">
                  This is a sample card in your dashboard. Real content would go here.
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
