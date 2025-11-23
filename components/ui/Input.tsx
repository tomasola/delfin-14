import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-1.5 mb-4">
      {label && <label className="text-sm font-medium text-slate-400">{label}</label>}
      <input 
        className={`bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all ${className}`}
        {...props}
      />
    </div>
  );
};