
import React from "react";
import { Link } from "react-router-dom";

interface FormFooterProps {
  isLogin: boolean;
}

const FormFooter: React.FC<FormFooterProps> = ({ isLogin }) => {
  return (
    <div className="text-center text-sm text-muted-foreground mt-4">
      {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
      <Link
        to={isLogin ? "/register" : "/login"}
        className="font-medium text-foreground hover:underline transition"
      >
        {isLogin ? "Sign up" : "Sign in"}
      </Link>
    </div>
  );
};

export default FormFooter;
