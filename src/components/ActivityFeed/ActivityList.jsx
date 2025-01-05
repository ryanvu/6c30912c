import { useCalls } from '../../contexts/CallsContext';
import ActivityItem from './ActivityItem.jsx';
import Button, { BUTTON_TYPES } from '../Button/Button.jsx';
import { ConfirmationModal, LoadingModal } from '../Modal/Modals.jsx';
import { useConfirmation } from '../../hooks/useConfirmation.js';
import EmptyView from '../EmptyView/EmptyView.jsx';
import StickyActionBar from '../StickyActionBar/StickActionBar.jsx';
import { Icons } from '../../utils/icons.js';
import { useState } from 'react';

export const ActivityList = () => {
  const { activeDisplayed, loading, action, archiveAllCalls, archiveProgress, startCall } = useCalls();
  const [isCallingInfo, setIsCallingInfo] = useState({ toNumber: null, msg: null });
  const { 
    isConfirmOpen: isArchiveConfirmOpen, 
    openConfirm, 
    closeConfirm, 
    handleConfirm 
  } = useConfirmation(archiveAllCalls);

  const { 
    isConfirmOpen: isCallingConfirmOpen, 
    openConfirm: openCallingConfirm, 
    closeConfirm: closeCallingConfirm, 
    handleConfirm: handleCallingConfirm 
  } = useConfirmation(() => startCall(isCallingInfo.toNumber));


  if (activeDisplayed.length === 0) {
    return (
      <EmptyView icon={<Icons.phoneOff size={40} />} title="No active calls" />
    );
  }

  const handleCallClick = (call, displayNumber) => {
    setIsCallingInfo({ toNumber: displayNumber, msg: `Call ${displayNumber}?` });
    openCallingConfirm();
  };

  return (
    <div className="flex flex-col space-y-6 p-4 relative">

      <LoadingModal isOpen={loading} action={action} progress={archiveProgress}></LoadingModal>
      <ConfirmationModal 
        isOpen={isArchiveConfirmOpen || isCallingConfirmOpen}
        onConfirm={isArchiveConfirmOpen ? handleConfirm : handleCallingConfirm}
        onCancel={isArchiveConfirmOpen ? closeConfirm : closeCallingConfirm}
        cta={isArchiveConfirmOpen ? "Archive all" : "Call"}
        message={isArchiveConfirmOpen 
          ? "Are you sure you want to archive all calls?" 
          : isCallingInfo.msg
        }
      />

      <StickyActionBar>
        <Button 
          type={BUTTON_TYPES.PRIMARY} 
          cta="Archive all calls" 
          icon={<Icons.archive />} 
          onClick={() => openConfirm()} 
        />
      </StickyActionBar>

      {activeDisplayed.map(({ date, calls }) => (
        <div key={date} className="flex flex-col space-y-4">
          <div className="border-l-2 border-black pl-2">
            <h3 className="font-medium text-md">{date}</h3>
          </div>
          <div className="flex flex-col space-y-4">
            {calls.map((call) => (
              <ActivityItem 
              key={call.id} 
              call={call}
              onCallClick={handleCallClick}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
