import { useCalls } from '../../contexts/CallsContext';
import ActivityItem from './ActivityItem.jsx';
import LoadingModal from '../LoadingModal/LoadingModal.jsx';
export const ActivityList = () => {
  const { displayedCalls, loading, action, resetCalls } = useCalls();

  return (
    <div className="flex flex-col space-y-6 p-4">

      <LoadingModal isOpen={loading} action={action}></LoadingModal>

      <button onClick={() => resetCalls()} className="btn btn-primary">Reset</button>
      {displayedCalls.map(({ date, calls }) => (
        <div key={date} className="flex flex-col space-y-4">
          <div className="self-center">
            <h3 className="text-gray-500 font-bold text-md">{date}</h3>
          </div>
          <div className="flex flex-col space-y-4">
            {calls.map((call) => (
              <ActivityItem key={call.id} call={call} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
