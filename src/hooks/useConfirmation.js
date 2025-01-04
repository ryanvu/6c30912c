import { useState, useCallback } from 'react';

export const useConfirmation = (onConfirm) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = useCallback(async () => {
    setIsOpen(false);
    await onConfirm();
  }, [onConfirm]);

  return {
    isConfirmOpen: isOpen,
    openConfirm: () => setIsOpen(true),
    closeConfirm: () => setIsOpen(false),
    handleConfirm
  };
};