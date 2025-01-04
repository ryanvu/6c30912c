import { useCalls } from '../../contexts/CallsContext';
import ActivityItem from './ActivityItem.jsx';
import './ActivityList.css';

export const ActivityList = () => {
  const { groupedCalls, loading } = useCalls();

  if (loading) {
    return <p>Loading...</p>;
  }

  console.log(groupedCalls);
  return (
    <div className="activity-list">
      {groupedCalls.map(({ date, calls }) => (
        <div key={date} className="flex flex-col">
          <div className="self-center font-bold">
            <h3>{date}</h3>
          </div>
          <div className="group-items">
            {calls.map(call => (
              <ActivityItem key={call.id} call={call} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};