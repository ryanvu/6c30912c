import React, { useState } from 'react';
import { CallsProvider } from './contexts/CallsContext'
import Header from './Header.jsx';
import { createRoot } from 'react-dom/client';
import { ActivityList } from './components/ActivityFeed/ActivityList.jsx';
import ArchivedCalls from './components/ArchivedCalls/ArchivedCalls.jsx';
import { ToastProvider } from './contexts/ToastContext.js';
import { ContactsProvider } from './contexts/ContactsContext.js';

export const APP_VIEWS = {
  ACTIVITY: 'activity',
  ARCHIVED: 'archived',
}

const App = () => {
  const [view, setView] = useState(APP_VIEWS.ACTIVITY);

  const handleViewChange = (view) => {
    setView(view);
  }

  return (
    <ToastProvider>
      <ContactsProvider>
        <CallsProvider>
          <div className='container'>
            <Header onViewChange={handleViewChange} activeView={view} />
            {view === APP_VIEWS.ACTIVITY && <ActivityList />}
            {view === APP_VIEWS.ARCHIVED && <ArchivedCalls />}
          </div>
        </CallsProvider>
      </ContactsProvider>
    </ToastProvider>
  );
};
const root = createRoot(document.getElementById('app'));
root.render(<App />);

export default App;
