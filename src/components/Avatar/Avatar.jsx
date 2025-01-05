import React from 'react';
import { Icons } from '../../utils/icons';

import defaultAvatar from '../../assets/default-avatars/default.png';

/**
 * Avatar component that displays either a contact's profile image or appropriate fallback
 * @param {Object} props
 * @param {Object} props.contact - Contact object (optional)
 * @param {string} props.size - Size of avatar ('sm' | 'md' | 'lg')
 * @param {string} props.className - Additional classes to apply
 */
const Avatar = ({ contact, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const getDefaultAvatar = () => {
    if (!contact) return null;
    return defaultAvatar;
  };

  // Combine default and custom classes
  const avatarClasses = `rounded-full flex items-center justify-center overflow-hidden bg-gray-100 ${sizeClasses[size]} ${className}`;
  
  // If no contact, show generic user icon
  if (!contact) {
    return (
      <div className={`${avatarClasses} bg-gray-200`}>
        <Icons.user className="text-gray-500" size={size === 'sm' ? 14 : size === 'md' ? 20 : 28} />
      </div>
    );
  }

  return (
    <div className={avatarClasses}>
      {contact.profileSrc ? (
        <img 
          src={contact.profileSrc} 
          alt={contact.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = getDefaultAvatar();
          }}
        />
      ) : (
        <img 
          src={getDefaultAvatar()} 
          alt={contact.name}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};

export default Avatar;