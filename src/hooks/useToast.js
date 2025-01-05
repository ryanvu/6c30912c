import { useState, useCallback } from 'react';

export const useToast = (duration = 2000) => {
  const [toast, setToast] = useState({ isOpen: false, message: '', type: 'success' });

  const showToast = useCallback(({ message, type = 'success' }) => {
    setToast({ isOpen: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, isOpen: false }));
    }, duration);
  }, [duration]);

  return { toast, showToast };
};