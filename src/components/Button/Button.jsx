import React from 'react'

export const BUTTON_TYPES = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
}

function Button({ type, cta, icon, onClick }) {
  const btnDefaults = 'flex gap-2 w-full items-center p-4 rounded-lg border-gray-300 border-2 text-gray-500 hover:bg-gray-100 transition duration-300';
  const variants = {
    [BUTTON_TYPES.PRIMARY]: 'btn-primary',
    [BUTTON_TYPES.SECONDARY]: 'btn-secondary',
  }

  const btnStyle = btnDefaults + ' ' + variants[type];

  return (
    <button className={btnStyle} onClick={onClick}>
      {icon}
      {cta}
    </button>
  )
}

export default Button