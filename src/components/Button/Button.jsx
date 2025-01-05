import React, { useState } from 'react';

export const BUTTON_TYPES = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  ICON: 'icon',
};

export const BUTTON_COLORS = {
  DEFAULT: 'default',
  SUCCESS: 'success',
  DANGER: 'danger',
  CALL: 'call',
 };

function Button({ type = BUTTON_TYPES.PRIMARY, color = BUTTON_COLORS.DEFAULT, cta, icon, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const btnDefaults = 'flex items-center justify-center border-2 transition duration-300 relative';
  
  const variants = {
    [BUTTON_TYPES.PRIMARY]: 'w-full gap-2 p-4 rounded-lg border-gray-300 text-gray-500 hover:bg-gray-100',
    [BUTTON_TYPES.SECONDARY]: 'w-full gap-2 p-4 rounded-lg border-gray-300 text-gray-500 hover:bg-gray-100',
    [BUTTON_TYPES.ICON]: 'w-8 h-8 rounded-full border-transparent text-gray-500 hover:bg-gray-100',
  };

  const colorVariants = {
    [BUTTON_COLORS.DEFAULT]: 'border-gray-300 text-gray-500 hover:bg-gray-100',
    [BUTTON_COLORS.SUCCESS]: 'border-green-500 bg-green-500 text-white hover:bg-green-600 hover:border-green-600',
    [BUTTON_COLORS.DANGER]: 'border-red-500 bg-red-500 text-white hover:bg-red-600 hover:border-red-600',
    [BUTTON_COLORS.CALL]: 'border-gray-300 bg-gray-400 text-gray-500 hover:bg-gray-100',
  };

  const btnStyle = `${btnDefaults} ${variants[type]} ${colorVariants[color]}`;


  if (type === BUTTON_TYPES.ICON) {
    return (
      <div className="relative inline-block">
        <button 
          className={btnStyle} 
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {icon}
        </button>
        <div 
          className={`
            absolute top-8 left-1/2 transform -translate-x-1/2 italic
            px-2 py-1 bg-gray-700 text-white text-xs rounded 
            whitespace-nowrap transition-all duration-200 z-10
            ${isHovered ? 'opacity-100 visible' : 'opacity-0 invisible'}
          `}
        >
          {cta}
        </div>
      </div>
    );
  }

  return (
    <button 
      className={btnStyle} 
      onClick={onClick}
    >
      {icon}
      {cta}
    </button>
  );
}

export default Button;