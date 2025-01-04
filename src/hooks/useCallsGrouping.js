import { useMemo } from 'react';

export const useCallsGrouping = (calls) => {
  const groupedByDateCalls = useMemo(() => {
    const groupedByDate = calls.reduce((acc, call) => {
      const date = new Date(call.created_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
      if (!acc[date]) acc[date] = [];
      acc[date].push(call);
      return acc;
    }, {});
  
    return Object.entries(groupedByDate)
      .sort((a, b) => new Date(b[0]) - new Date(a[0]))
      .map(([date, calls]) => ({
        date,
        calls: calls.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      }));
  }, [calls]);

  const displayedCalls = useMemo(() => {
    return groupedByDateCalls.map(dateGroup => {
      const groupedCalls = dateGroup.calls.reduce((acc, call) => {
        const key = `${call.from}-${call.to}-${call.direction}-${call.call_type}`;
        
        if (!acc[key]) {
          acc[key] = { ...call, count: 1, lastCallDuration: call.duration, calls: [call] };
        } else {
          acc[key].count++;
          acc[key].lastCallDuration = call.duration;
          acc[key].calls.push(call);
        }
        return acc;
      }, {});

      return {
        date: dateGroup.date,
        calls: Object.values(groupedCalls)
      };
    });
  }, [groupedByDateCalls]);

  return { groupedByDateCalls, displayedCalls };
};