import React from 'react';
import { CallsProvider } from './contexts/CallsContext'
import Header from './Header.jsx';
import { createRoot } from 'react-dom/client';
import { ActivityList } from './components/ActivityFeed/ActivityList.jsx';

const App = () => {
  return (
    <CallsProvider>
      <div className='container'>
        <Header/>
        <ActivityList />
      </div>
    </CallsProvider>
  );
};
const root = createRoot(document.getElementById('app'));
root.render(<App />);

export default App;
