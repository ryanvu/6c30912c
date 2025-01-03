import { createContext, useState, useContext, useEffect } from 'react';
import { API_CONFIG } from '../config';

export const CallsContext = createContext();

export const CallsProvider = ({ children }) => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ACTIVITIES}`
        );
        const data = await response.json();
        setCalls(data);
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

      const updatedCall = await response.json();
      setCalls(calls.map(call =>
        call.id === callId ? updatedCall : call
      ));
    } catch (err) {
      setError(err);
    }
  };

  const value = {
    calls,
    loading,
    error,
    archiveCall,
    getCallInfo
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

