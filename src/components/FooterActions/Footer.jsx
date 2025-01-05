import React from 'react';
import { APP_VIEWS } from '../../App.jsx'; 

const Footer = ({ onViewChange, activeView }) => {
  const getBorderClass = (view) => {
    if (view === activeView) {
      return 'border-b-4 font-bold border-yellow-500';
    }
    return 'py-4 transform hover:scale-105 transition duration-300 text-gray-500';
  }
  return (
    <footer className="px-4 border-t-2 border-gray-200 bg-white w-full">
      <div className="flex gap-4 w-full justify-between">
        <button className={getBorderClass(APP_VIEWS.ACTIVITY)} onClick={() => onViewChange(APP_VIEWS.ACTIVITY)}>Activity</button>
        <button className={getBorderClass(APP_VIEWS.ARCHIVED)} onClick={() => onViewChange(APP_VIEWS.ARCHIVED)}>Archived</button>
      </div>
    </footer>
  );
};

export default Footer;
