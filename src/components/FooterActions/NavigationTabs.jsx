// NavigationTabs.jsx
import React from 'react'

function NavigationTabs({ icon, isActive, onClick, isDialTab }) {
  const baseClass = 'flex self-stretch items-center justify-center flex-1'
  const activeClass = 'border-b-4 font-bold border-green-500'
  const inactiveClass = 'py-4 transform hover:scale-105 transition duration-300 text-gray-500'
  
  if (isDialTab) {
    return (
      <button 
        className={`
          flex items-center justify-center rounded-full p-4 -mt-6 
          transform hover:scale-105 transition duration-300
          ${isActive ? 'bg-green-600 ring-4 ring-green-100' : 'bg-green-500'}
        `}
        onClick={onClick}
      >
        {icon}
      </button>
    )
  }

  return (
    <button 
      className={`${baseClass} ${isActive ? activeClass : inactiveClass}`}
      onClick={onClick}
    >
      {icon}
    </button>
  )
}

export default NavigationTabs