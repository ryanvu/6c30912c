import { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { callsApi } from '../services/calls.service';
import { useCallsGrouping } from '../hooks/useCallsGrouping';

export const CallsContext = createContext();

export const CallsProvider = ({ children }) => {
  const [calls, setCalls] = useState([]);
  const [action, setAction] = useState(null);
  const [archivedCalls, setArchivedCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [archiveProgress, setArchiveProgress] = useState(0);
  const { groupedByDateCalls: activeGrouped, displayedCalls: activeDisplayed } = useCallsGrouping(calls);
  const { groupedByDateCalls: archivedGrouped, displayedCalls: archivedDisplayed } = useCallsGrouping(archivedCalls);

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
      const data = await callsApi.fetchCalls();
      processCalls(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const getCallInfo = async (callId) => {
    try {
      const data = await callsApi.getCallInfo(callId);
      return data;
    } catch (err) {
      setError(err);
    }
  }

  const resetCalls = async () => {
    setLoading(true);
    setAction('Resetting calls...');
    try {
      const success = await callsApi.resetCalls();
      if (!success) throw new Error('Failed to archive call');

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
      const success = await callsApi.archiveCall(callId);
      if (!success) throw new Error('Failed to archive call');

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

  const archiveAllCalls = async () => {
    setLoading(true);
    setAction('Archiving all calls...');
    try {
      const callIds = calls.map(call => call.id);
      await callsApi.archiveAllCalls(callIds, (progress) => {
        setArchiveProgress(progress);
      });
      await fetchCalls();
    } catch (err) {
      setError(err);
    } finally {
      setAction(null);
      setLoading(false);
      setArchiveProgress(0);
    }
  };
  
  const value = {
    action,
    calls,
    loading,
    error,
    activeGrouped,
    activeDisplayed,
    archivedGrouped,
    archivedDisplayed,
    archiveProgress,
    archiveCall,
    getCallInfo,
    archiveAllCalls,
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

