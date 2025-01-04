import { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { API_CONFIG, HTTP_METHODS } from '../config';

export const CallsContext = createContext();

export const CallsProvider = ({ children }) => {
  const [calls, setCalls] = useState([]);
  const [action, setAction] = useState(null);
  const [archivedCalls, setArchivedCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const processCalls = (data) => {
    const active = [];
    const archived = [];
    
    data.forEach(call => {
      if (call.is_archived) {
        archived.push(call);
      } else {
        active.push(call);
      }
    });
  
    setCalls(active);
    setArchivedCalls(archived);
  };

  useEffect(() => {
    fetchCalls();
  }, []);

  const fetchCalls = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ACTIVITIES}`
      );
      const data = await response.json();
      processCalls(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getCallInfo = async (callId) => {
    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.getActivityEndpoint(callId)}`
      );
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err);
    }
  }

  const resetCalls = async () => {
    setLoading(true);
    setAction('Resetting calls...');
    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.RESET}`,
        {
          method: HTTP_METHODS.PATCH,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to reset calls');
      }

      await fetchCalls();
    } catch (err) {
      setError(err);
    } finally {
      setAction(null);
      setLoading(false);
    }
  }

  const archiveCall = async (callId) => {
    setLoading(true);
    setAction('Archiving call...');
    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.getActivityEndpoint(callId)}`,
        {
          method: HTTP_METHODS.PATCH,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ is_archived: true })
        }
      );
  
      if (!response.ok) {
        throw new Error('Failed to archive call');
      }

      const updatedCall = {
        ...calls.find(call => call.id === callId),
        is_archived: true
      };
  
      processCalls([...calls, ...archivedCalls].map(call =>
        call.id === callId ? updatedCall : call
      ));
    } catch (err) {
      setError(err);
    } finally {
      setAction(null);
      setLoading(false);
    }
  };

  const groupedByDateCalls = useMemo(() => {
  
    const groupedByDateCalls = calls.reduce((acc, call) => {
      const date = new Date(call.created_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
      if (!acc[date]) acc[date] = [];
      acc[date].push(call);
      return acc;
    }, {});
  
    return Object.entries(groupedByDateCalls)
      .sort((a, b) => new Date(b[0]) - new Date(a[0]))
      .map(([date, calls]) => ({
        date,
        calls: calls.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      }));
      
  }, [calls]);

  const displayedCalls = useMemo(() => {
    return groupedByDateCalls.map(dateGroup => {
      const groupedByDateCalls = dateGroup.calls.reduce((acc, call) => {
     
        const key = `${call.from}-${call.to}-${call.direction}-${call.call_type}`;
        
        if (!acc[key]) {
          acc[key] = {
            ...call,
            count: 1,
            lastCallDuration: call.duration,
            calls: [call]
          };
        } else {
          acc[key].count++;
          acc[key].lastCallDuration = call.duration;
          acc[key].calls.push(call);
        }
        
        return acc;
      }, {});

      return {
        date: dateGroup.date,
        calls: Object.values(groupedByDateCalls)
      };
    });
  }, [groupedByDateCalls]);

  const value = {
    action,
    calls,
    loading,
    error,
    archivedCalls,
    groupedByDateCalls,
    displayedCalls,
    archiveCall,
    getCallInfo,
    resetCalls
  };

  return (
  <CallsContext.Provider value={value}>
    {children}
  </CallsContext.Provider>
  );
};

export const useCalls = () => {
  const context = useContext(CallsContext);
  if (context === undefined) {
    throw new Error('useCalls must be used within a CallsProvider');
  }
  return context;
};

