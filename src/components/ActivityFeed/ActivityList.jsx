import { useCalls } from '../../contexts/CallsContext';
import ActivityItem from './ActivityItem.jsx';

export const ActivityList = () => {
  const { consolidatedCalls, loading, resetCalls } = useCalls();

  if (loading) {
    return <p className="text-gray-500 text-center p-4">Loading...</p>;
  }

  return (
    <div className="flex flex-col space-y-6 p-4">
      <button onClick={() => resetCalls()} className="btn btn-primary">Reset</button>
      {consolidatedCalls.map(({ date, calls }) => (
        <div key={date} className="flex flex-col space-y-4">
          <div className="self-center">
            <h3 className="text-gray-500 font-bold text-md">{date}</h3>
          </div>
          <div className="flex flex-col space-y-4">
            {calls.map(call => (
              <ActivityItem key={call.id} call={call} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
