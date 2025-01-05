import React, { useState } from 'react';
import { CallsProvider } from './contexts/CallsContext'
import Header from './Header.jsx';
import { createRoot } from 'react-dom/client';
import { ActivityList } from './components/ActivityFeed/ActivityList.jsx';
import ArchivedCalls from './components/ArchivedCalls/ArchivedCalls.jsx';
import { ToastProvider } from './contexts/ToastContext.js';
import { ContactsProvider } from './contexts/ContactsContext.js';
import Footer from './components/FooterActions/Footer.jsx';

export const APP_VIEWS = {
  ACTIVITY: 'activity',
  ARCHIVED: 'archived',
  CONTACTS: 'contacts',
  DIAL: 'dial',
}

export const APP_TABS = {
  CALLS: 'calls',
  CONTACTS: 'contacts',
  DIAL: 'dial',
  SETTINGS: 'settings',
  PROFILE: 'profile',
}

const App = () => {
  const [view, setView] = useState(APP_VIEWS.ACTIVITY);
  const [tab, setTab] = useState(APP_TABS.CALLS);

  const handleViewChange = (view) => {
    setView(view);
  }

  const handleTabChange = (tab) => {
    setTab(tab);
  }

  return (
    <ToastProvider>
      <ContactsProvider>
        <CallsProvider>
          <div className='container'>
            <Header onViewChange={handleViewChange} activeView={view} activeTab={tab} />
            <div className="flex-1 overflow-y-auto relative">
            {
              tab === APP_TABS.CALLS && 
                <>
                  {view === APP_VIEWS.ACTIVITY && <ActivityList />}
                  {view === APP_VIEWS.ARCHIVED && <ArchivedCalls />}
                </>
            }
            {
              tab === APP_TABS.CONTACTS && <div className="h-3/4 flex flex-col items-center justify-center">Contacts</div>
            }
            {
              tab === APP_TABS.DIAL && <div className="h-3/4 flex flex-col items-center justify-center">Dial</div>
            }
            {
              tab === APP_TABS.SETTINGS && <div className="h-3/4 flex flex-col items-center justify-center">Settings</div>
            }
            {
              tab === APP_TABS.PROFILE && <div className="h-3/4 flex flex-col items-center justify-center">Profile</div>
            }
            </div>
            <Footer onTabChange={handleTabChange} activeTab={tab}/>
          </div>
        </CallsProvider>
      </ContactsProvider>
    </ToastProvider>
  );
};
const root = createRoot(document.getElementById('app'));
root.render(<App />);

export default App;
