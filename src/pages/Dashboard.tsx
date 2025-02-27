
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Moon, Sun, User, X, Save, Edit, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PageTransition from "@/components/PageTransition";
import { getCurrentUser, logoutUser, updateUser } from "@/utils/storage";
import { useTheme } from "@/hooks/use-theme";
import { validateEmail } from "@/utils/validation";

interface EditableField {
  value: string;
  error?: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme, toggleTheme } = useTheme();
  const user = getCurrentUser();
  
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [name, setName] = useState<EditableField>({ value: user?.name || "" });
  const [email, setEmail] = useState<EditableField>({ value: user?.email || "" });
  const [showProfileSection, setShowProfileSection] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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

  const handleEditToggle = () => {
    if (isEditingProfile) {
      // Cancel edit mode, reset values
      setName({ value: user?.name || "" });
      setEmail({ value: user?.email || "" });
    }
    setIsEditingProfile(!isEditingProfile);
  };

  const validateForm = (): boolean => {
    let isValid = true;
    
    // Validate name
    if (!name.value.trim()) {
      setName(prev => ({ ...prev, error: "Name is required" }));
      isValid = false;
    } else {
      setName(prev => ({ ...prev, error: undefined }));
    }
    
    // Validate email
    const emailResult = validateEmail(email.value);
    if (!emailResult.isValid) {
      setEmail(prev => ({ ...prev, error: emailResult.error }));
      isValid = false;
    } else {
      setEmail(prev => ({ ...prev, error: undefined }));
    }
    
    return isValid;
  };

  const handleSaveProfile = async () => {
    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fix the errors in the form.",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (user) {
        const updatedUser = {
          ...user,
          name: name.value,
          email: email.value
        };
        
        updateUser(updatedUser);
        
        toast({
          title: "Profile Updated",
          description: "Your profile details have been successfully updated.",
        });
        
        setIsEditingProfile(false);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
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
          
          {/* Profile Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <motion.div 
              className="p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-all"
              whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-x-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <User size={20} />
                  </div>
                  <h3 className="text-lg font-medium">Personal Details</h3>
                </div>
                <motion.button
                  onClick={() => setShowProfileSection(!showProfileSection)}
                  className="text-muted-foreground"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {showProfileSection ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </motion.button>
              </div>
              
              <AnimatePresence>
                {showProfileSection && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-border pt-4 mt-2 space-y-4">
                      {isEditingProfile ? (
                        <>
                          <div className="space-y-1">
                            <label className="text-sm font-medium">Name</label>
                            <div className="relative">
                              <input
                                type="text"
                                value={name.value}
                                onChange={(e) => setName({ value: e.target.value })}
                                className={`w-full p-2 border rounded-lg ${name.error ? 'border-red-500' : 'border-border'}`}
                                placeholder="Your name"
                              />
                              {name.error && (
                                <p className="text-red-500 text-xs mt-1">{name.error}</p>
                              )}
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <label className="text-sm font-medium">Email</label>
                            <div className="relative">
                              <input
                                type="email"
                                value={email.value}
                                onChange={(e) => setEmail({ value: e.target.value })}
                                className={`w-full p-2 border rounded-lg ${email.error ? 'border-red-500' : 'border-border'}`}
                                placeholder="Your email"
                              />
                              {email.error && (
                                <p className="text-red-500 text-xs mt-1">{email.error}</p>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex justify-end gap-x-2 mt-4">
                            <motion.button
                              onClick={handleEditToggle}
                              className="px-4 py-2 border border-border rounded-lg text-sm font-medium flex items-center gap-x-1"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              disabled={isSubmitting}
                            >
                              <X size={16} />
                              <span>Cancel</span>
                            </motion.button>
                            
                            <motion.button
                              onClick={handleSaveProfile}
                              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium flex items-center gap-x-1"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? (
                                <div className="flex items-center justify-center">
                                  <motion.div 
                                    className="h-4 w-4 rounded-full border-b-2 border-white"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  ></motion.div>
                                  <span className="ml-2">Saving...</span>
                                </div>
                              ) : (
                                <>
                                  <Save size={16} />
                                  <span>Save</span>
                                </>
                              )}
                            </motion.button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Name</p>
                              <p className="font-medium">{user.name}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Email</p>
                              <p className="font-medium">{user.email}</p>
                            </div>
                          </div>
                          
                          <div className="flex justify-end">
                            <motion.button
                              onClick={handleEditToggle}
                              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium flex items-center gap-x-1"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Edit size={16} />
                              <span>Edit Profile</span>
                            </motion.button>
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
          
          {/* Dashboard Tiles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Security", description: "Update your password and security settings" },
              { title: "Notifications", description: "Control what notifications you receive" },
              { title: "Billing", description: "View your billing history and payment methods" }
            ].map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
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
