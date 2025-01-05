import React from 'react';
import { APP_TABS } from '../../App.jsx'; 
import { Icons } from '../../utils/icons.js';
import NavigationTabs from './NavigationTabs.jsx';

const Footer = ({ onTabChange, activeTab }) => {

  return (
    <footer className="px-4 border-t-2 border-gray-200 bg-white w-full">
      <div className="flex gap-4 w-full items-center justify-between">
      <NavigationTabs
          icon={<Icons.phone size={16} />}
          isActive={activeTab === APP_TABS.CALLS}
          onClick={() => onTabChange(APP_TABS.CALLS)}
        />
        <NavigationTabs
          icon={<Icons.contacts size={16} />}
          isActive={activeTab === APP_TABS.CONTACTS}
          onClick={() => onTabChange(APP_TABS.CONTACTS)}
        />
        <NavigationTabs
          icon={<Icons.dial className="self-center text-white" size={24} />}
          isActive={activeTab === APP_TABS.DIAL}
          onClick={() => onTabChange(APP_TABS.DIAL)}
          isDialTab={true}
        />
        <NavigationTabs
          icon={<Icons.settings size={16} />}
          isActive={activeTab === APP_TABS.SETTINGS}
          onClick={() => onTabChange(APP_TABS.SETTINGS)}
        />
        <NavigationTabs
          icon={<Icons.profile className="text-green-500" size={16} />}
          isActive={activeTab === APP_TABS.PROFILE}
          onClick={() => onTabChange(APP_TABS.PROFILE)}
        />
      </div>
    </footer>
  );
};

export default Footer;
