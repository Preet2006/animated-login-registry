
import React from "react";
import { AlertCircle } from "lucide-react";

interface FormFieldProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  type: string;
  placeholder: string;
  value: string;
  error?: string;
  touched: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rightElement?: React.ReactNode;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  icon,
  type,
  placeholder,
  value,
  error,
  touched,
  onChange,
  rightElement,
  className = "",
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium ml-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </div>
        <input
          type={type}
          id={id}
          name={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`h-12 w-full pl-10 ${rightElement ? "pr-12" : "pr-4"} rounded-lg border bg-transparent text-sm outline-none transition-all focus:ring-2 ${
            error && touched 
              ? "border-red-500 focus:ring-red-200" 
              : "border-input focus:ring-primary/20"
          }`}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
      {error && touched && (
        <div className="flex items-center gap-x-1 text-red-500 text-sm mt-1 ml-1">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default FormField;
