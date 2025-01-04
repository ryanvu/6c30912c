import React from 'react'
import { useCalls } from '../../contexts/CallsContext';
import ActivityItem from '../ActivityFeed/ActivityItem.jsx';
import { ArchiveRestore } from 'lucide-react';
import Button, { BUTTON_TYPES } from '../Button/Button.jsx';
import { LoadingModal } from '../Modal/Modals.jsx';


function ArchivedCalls() {
  const { archivedDisplayed, loading, action, archiveProgress } = useCalls();

  return (
    <div className="flex flex-col space-y-6 p-4">
      <LoadingModal isOpen={loading} action={action} progress={archiveProgress}></LoadingModal>
      <Button type={BUTTON_TYPES.PRIMARY} cta="Restore all calls" icon={<ArchiveRestore />} onClick={() => console.log('restore all')} />
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