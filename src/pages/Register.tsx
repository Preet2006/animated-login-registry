
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import AuthForm from "@/components/AuthForm";
import { isLoggedIn } from "@/utils/storage";

const Register = () => {
  const navigate = useNavigate();
  
  // Check if user is already logged in
  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md mx-auto mb-8 text-center">
          <div className="inline-block animate-float">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
              A
            </div>
          </div>
        </div>
        
        <AuthForm mode="register" />
      </div>
    </PageTransition>
  );
};

export default Register;
