import React from 'react'
import { useCalls } from '../../contexts/CallsContext';
import ActivityItem from '../ActivityFeed/ActivityItem.jsx';
import { ArchiveRestore, ArchiveX } from 'lucide-react';
import Button, { BUTTON_TYPES } from '../Button/Button.jsx';
import { ConfirmationModal, LoadingModal } from '../Modal/Modals.jsx';
import EmptyView from '../EmptyView/EmptyView.jsx';
import { useConfirmation } from '../../hooks/useConfirmation.js';
import StickyActionBar from '../StickyActionBar/StickActionBar.jsx';


function ArchivedCalls() {
  const { archivedDisplayed, loading, action, archiveProgress, restoreAllCalls } = useCalls();
    const { 
      isConfirmOpen, 
      openConfirm, 
      closeConfirm, 
      handleConfirm 
    } = useConfirmation(restoreAllCalls);

  if (archivedDisplayed.length === 0) {
    return (
      <EmptyView icon={<ArchiveX size={40} />} title="No archived calls" />
    );
  }

  return (
    <div className="flex flex-col space-y-6 p-4">
      <LoadingModal isOpen={loading} action={action} progress={archiveProgress}></LoadingModal>
      <ConfirmationModal 
        isOpen={isConfirmOpen}
        onConfirm={handleConfirm}
        onCancel={closeConfirm} 
        message="Are you sure you want to restore all calls?"
      />
      <StickyActionBar>
        <Button type={BUTTON_TYPES.PRIMARY} cta="Restore all calls" icon={<ArchiveRestore />} onClick={() => openConfirm()} />
      </StickyActionBar>
      {archivedDisplayed.map(({ date, calls }) => (
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
  )
}

export default ArchivedCalls