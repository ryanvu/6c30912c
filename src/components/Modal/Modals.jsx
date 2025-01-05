import ReactDOM from 'react-dom';
import React from 'react';
import { motion } from 'framer-motion';
const Modal = ({ isOpen, children, position = "center" }) => {
  if (!isOpen) return null;
  
  const positionClasses = {
    center: "bg-black bg-opacity-25 flex items-center justify-center",
    "toast": "flex items-center justify-center"
  };

  const disablePointerEvents = position === "toast" ? "pointer-events-none" : "";

  return ReactDOM.createPortal(
    <div className={disablePointerEvents + " container"}>
      <div className={`absolute top-0 inset-0 z-50 ${positionClasses[position]}`}>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export const LoadingModal = ({ isOpen, action, progress }) => (
  <Modal isOpen={isOpen}>
    <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-3">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
      <span className="text-gray-700">
        {action || 'Loading...'} {progress ? `${Math.floor(progress * 100)}%` : ''}
      </span>
    </div>
  </Modal>
);

export const ConfirmationModal = ({ isOpen, onConfirm, onCancel, message, cta }) => (
  <Modal isOpen={isOpen}>
    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4">
      <p className="text-gray-700">{message}</p>
      <div className="flex gap-3 justify-end">
        <button 
          onClick={onCancel} 
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
        >
          Cancel
        </button>
        <button 
          onClick={onConfirm} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {cta || 'Confirm'}
        </button>
      </div>
    </div>
  </Modal>
);

export const Toast = ({ isOpen, message, type = "success" }) => (
  <Modal isOpen={isOpen} position="toast">
    <motion.div
      initial={{ y: 310, x: 120, zIndex: 0, opacity: 0 }}
      animate={{ y: 300, x: 120, zIndex: 1000, opacity: 1, transition: { duration: 0.5 } }}
      className={`${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white px-4 py-2 rounded shadow-lg`}>
      {message}
    </motion.div>
  </Modal>
);