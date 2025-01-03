import { useCalls } from '../../contexts/CallsContext';
import ActivityItem from './ActivityItem.jsx';

export const ActivityList = () => {
  const { calls, loading } = useCalls();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container-view">
      Activity List

      {calls.map(call => (
       <ActivityItem key={call.id} call={call} />
      ))}
    </div>
  );
};


