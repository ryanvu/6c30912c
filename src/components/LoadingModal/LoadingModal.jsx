import ReactDOM from 'react-dom';
import React from 'react';

const LoadingModal = ({ isOpen, action }) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="container">
      <div className="absolute top-0 inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-3">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
          <span className="text-gray-700">{ action || 'Loading...' }</span>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default LoadingModal;