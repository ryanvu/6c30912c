import { CALL_DIRECTIONS, CALL_TYPE, determineCallStatus, formatDuration, formatPhoneNumber, formatTime, getDisplayNumber } from '../../utils/utils.js';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCalls } from '../../contexts/CallsContext';
import Button, { BUTTON_TYPES } from '../Button/Button.jsx';
import { Icons } from '../../utils/icons.js';
import { callDetailVariants } from '../../animations/animations.js';
import { useToastContext } from '../../contexts/ToastContext.js';
import { useContacts } from '../../contexts/ContactsContext.js';
import { getCallParticipants } from '../../utils/contacts';
import Avatar from '../Avatar/Avatar.jsx';

const ActivityItem = ({ call, onCallClick }) => {
  const { contacts } = useContacts();
  const [showActions, setShowActions] = useState(false);
  
  const participants = getCallParticipants(call, contacts);
  const { direction, call_type, count, duration } = call;
  
  const iconColor = call_type === CALL_TYPE.MISSED ? 'text-red-500' : 'text-green-500';
  const expandedStyle = showActions ? 'border-black' : 'border-gray-300';
  const displayNumberColor = call_type === CALL_TYPE.MISSED ? 'text-red-500' : 'text-black';

  const handleToggleExpand = (e) => {
    e.stopPropagation();
    setShowActions(prev => !prev);
  };

  return (
    <div 
      className={"activity-item " + expandedStyle} 
      onClick={() => onCallClick(call, participants.primary.display)}
    >
      <div className="flex items-center gap-2">

        <Avatar contact={participants.primary.contact} size="md" />
        <div className="flex flex-col gap-1">

          <div className="flex flex-row gap-1 items-center">
            <span className={displayNumberColor + ' font-bold'}>
              {participants.primary.display}
            </span>
            {count > 1 && <span className="text-gray-400 text-xs">({count})</span>}
          </div>

          <div className="flex gap-2 items-center">

            {direction === CALL_DIRECTIONS.INBOUND ? (
              <Icons.phoneIncoming className={iconColor} size={12} />
            ) : (
              <Icons.phoneOutgoing className={iconColor} size={12} />
            )}

          {(participants.via.id !== participants.from.id 
            && participants.via.id !== participants.to.id) ? (
            <span className="text-gray-400 text-xs italic">
              via {participants.via.display}
            </span>) : (
            <span className="text-gray-400 text-xs italic">
              {determineCallStatus(duration, call_type, participants.via.id, participants.from.id).label} • {formatDuration(duration)}
            </span>
          )}
          </div>
        </div>

        <div
          onClick={handleToggleExpand}
          className="cursor-pointer flex gap-1 items-center bg-black text-white ml-auto text-xs rounded-l-lg rounded-r-none border-r-0 px-2 py-1 transition transform hover:scale-105"
        >
          {formatTime(call.created_at)}
          {showActions ? <Icons.x size={16} /> : <Icons.info size={16} />}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {showActions && (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ActivityDetails 
              call={call}
              participants={participants}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ActivityDetails = ({ call, participants }) => {
  const { showToast } = useToastContext();
  const { archiveCall, restoreCall } = useCalls();

  const { calls, call_type, duration, is_archived, via, from } = call;

  const status = determineCallStatus(duration, call_type, via, from);
  const handleArchive = async (e) => {
    e.stopPropagation();
    await archiveCall(call.id);
    showToast({ message: 'Call archived', type: 'success' });
  }

  const handleRestore = async (e) => {
    e.stopPropagation();
    await restoreCall(call.id);
    showToast({ message: 'Call restored', type: 'success' });
  }

  return (
    <div className="flex justify-between gap-4 pr-4 pt-2">
      <div className="flex flex-col flex-grow gap-4 p-2">
        <div className="space-y-2 text-xs">
          {calls.length > 1 && <h3 className="font-medium">Recent Calls ({calls.length})</h3>}
          {calls.map(groupedCall => (
            <CallDetailPreview key={groupedCall.id} call={groupedCall} status={status} />
          ))}
        </div>
      </div>
 
      {!is_archived && 
      <Button 
        onClick={(e) => handleArchive(e)} 
        type={BUTTON_TYPES.ICON}
        cta="Archive"
        icon={<Icons.archive size={16} />}
      ></Button>}
      {is_archived && 
      <Button 
        onClick={(e) => handleRestore(e)} 
        type={BUTTON_TYPES.ICON}
        cta="Restore"
        icon={<Icons.archiveRestore size={16} />}
      ></Button>}
    </div>
  )
}

const CallDetailPreview = ({ call, status }) => {
  const { openCallDetail } = useCalls();
  
  const handleOpenDetails = (e) => {
    e.stopPropagation();
    openCallDetail(call.id);
  }

  return (
    <motion.div
      onClick={(e) => handleOpenDetails(e)}
      variants={callDetailVariants.parent}
      initial="initial"
      animate="animate"
      whileHover="hover"
      transition={{ duration: 0.5 }}
      className="flex justify-between pr-2 text-xs text-gray-600 py-1 items-center gap-2 cursor-pointer border-l-2 border-black pl-2 hover:bg-gray-50 rounded-r-lg"
    > 
      <div className="flex flex-col">
        <span>{formatTime(call.created_at)}</span>
        <span className={status.color}>
          {status.label} • <span className="italic">{formatDuration(call.duration)}</span>
        </span>
      </div>

      <motion.div
        variants={callDetailVariants.icon}
      >
        <Icons.view size={18}/>
      </motion.div>
    </motion.div>
  )
}
export default ActivityItem;
