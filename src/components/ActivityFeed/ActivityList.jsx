import { useCalls } from '../../contexts/CallsContext';
import ActivityItem from './ActivityItem.jsx';
import LoadingModal from '../LoadingModal/LoadingModal.jsx';
import Button, { BUTTON_TYPES } from '../Button/Button.jsx';
import { Archive } from 'lucide-react';
export const ActivityList = () => {
  const { activeDisplayed, loading, action, resetCalls, archiveAllCalls, archiveProgress } = useCalls();

  const handleArchiveAll = async () => {
    await archiveAllCalls();
  }

  return (
    <div className="flex flex-col space-y-6 p-4">

      <LoadingModal isOpen={loading} action={action} progress={archiveProgress}></LoadingModal>
      <Button type={BUTTON_TYPES.PRIMARY} cta="Archive all calls" icon={<Archive />} onClick={() => handleArchiveAll()} />
      
      <button onClick={() => resetCalls()} className="btn btn-primary">Reset</button>
      {activeDisplayed.map(({ date, calls }) => (
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
