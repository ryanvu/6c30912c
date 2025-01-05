import React, { createContext, useContext } from 'react';
import { Toast } from '../components/Modal/Modals.jsx';
import { useToast } from '../hooks/useToast';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const { toast, showToast } = useToast();

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast {...toast} />
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};