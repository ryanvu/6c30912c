import { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { API_CONFIG } from '../config';

export const CallsContext = createContext();

export const CallsProvider = ({ children }) => {
  const [calls, setCalls] = useState([]);
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

    fetchCalls();
  }, []);



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

  const archiveCall = async (callId) => {
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
  
      // Instead of directly updating calls, process all calls again
      const updatedCall = await response.json();
      processCalls([...calls, ...archivedCalls].map(call =>
        call.id === callId ? updatedCall : call
      ));
    } catch (err) {
      setError(err);
    }
  };

  const groupedCalls = useMemo(() => {
  
    const groupedCalls = calls.reduce((acc, call) => {
      const date = new Date(call.created_at).toLocaleDateString();
      if (!acc[date]) acc[date] = [];
      acc[date].push(call);
      return acc;
    }, {});
  
    return Object.entries(groupedCalls)
      .sort((a, b) => new Date(b[0]) - new Date(a[0]))
      .map(([date, calls]) => ({
        date,
        calls: calls.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      }));
      
  }, [calls]);

  const value = {
    calls,
    loading,
    error,
    archivedCalls,
    groupedCalls,
    archiveCall,
    getCallInfo,
  };

  return <CallsContext.Provider value={value}>{children}</CallsContext.Provider>;
};

export const useCalls = () => {
  const context = useContext(CallsContext);
  if (context === undefined) {
    throw new Error('useCalls must be used within a CallsProvider');
  }
  return context;
};

