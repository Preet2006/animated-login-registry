
import React from "react";

interface FormButtonProps {
  label: string;
  isSubmitting: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const FormButton: React.FC<FormButtonProps> = ({
  label,
  isSubmitting,
  onClick,
  type = "submit",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isSubmitting}
      className="relative w-full h-12 bg-primary text-primary-foreground rounded-lg text-sm font-medium transition-all hover:opacity-90 disabled:opacity-70"
    >
      {isSubmitting ? (
        <div className="flex items-center justify-center">
          <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
        </div>
      ) : (
        label
      )}
    </button>
  );
};

export default FormButton;
