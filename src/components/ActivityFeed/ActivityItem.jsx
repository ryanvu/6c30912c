import { PhoneIncoming, PhoneOutgoing, Archive, ArchiveRestore, Info, X } from 'lucide-react';
import { CALL_DIRECTIONS, CALL_TYPE, determineCallStatus, formatDuration, formatPhoneNumber, formatTime } from '../../utils';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCalls } from '../../contexts/CallsContext';
import Button, { BUTTON_TYPES } from '../Button/Button.jsx';

const getDisplayNumber = (direction, from, to) => {
  if (direction === CALL_DIRECTIONS.INBOUND) {
    return from;
  }
  return to;
};

const ActivityItem = ({ call }) => {
  const { direction, call_type, count, via, to, from } = call;
  const [showActions, setShowActions] = useState(false);

  const iconColor = call_type === CALL_TYPE.MISSED ? 'text-red-500' : 'text-green-500';
  const displayNumber = getDisplayNumber(direction, from, to);

  const handleToggleExpand = () => {
    setShowActions(prev => !prev);
  }

  return (
    <div className="flex-col items-center gap-2 pl-4 py-4 rounded-md border-gray-200 border-2 transition duration-300">
      <div className="flex items-center gap-2">
        <div>
          {direction === CALL_DIRECTIONS.INBOUND ? (
            <PhoneIncoming className={iconColor} size={18} />
          ) : (
            <PhoneOutgoing className={iconColor} size={18} />
          )}
        </div>
        
        <div className="flex flex-col">
          <div className="flex flex-row gap-2 items-center">
            <span className="font-bold">{formatPhoneNumber(displayNumber)}</span>
            { count > 1 && <span className="text-gray-400 text-xs">({count})</span> }
          </div>
          <span className="text-gray-400 text-xs italic">
            via {formatPhoneNumber(via)}
          </span>
        </div>

        <div
          onClick={handleToggleExpand}
          className="cursor-pointer flex gap-1 items-center bg-black text-white ml-auto text-xs rounded-l-lg rounded-r-none border-r-0 px-2 py-1 transition transform hover:scale-105">
          {formatTime(call.created_at)} 
          {showActions ? <X size={16} /> : <Info size={16} />}
        </div>
      </div>
      <AnimatePresence mode="wait">
        {showActions && 
        <motion.div
          key="expanded"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <ActivityDetails call={call} />
        </motion.div>} 
      </AnimatePresence>
    </div>
  );
};

const ActivityDetails = ({ call }) => {
  const { archiveCall, restoreCall } = useCalls();

  const { calls, call_type, duration, is_archived, via, from } = call;

  const status = determineCallStatus(duration, call_type, via, from);
  const handleArchive = async () => {
    await archiveCall(call.id);
  }

  const handleRestore = async () => {
    await restoreCall(call.id);
  }

  return (
    <div className="flex justify-between gap-4 px-4">
      <div className="flex flex-col gap-4 p-2">
        <div className="space-y-2 text-xs">
          {calls.length > 1 && <h3 className="font-medium">Recent Calls ({calls.length})</h3>}
          {calls.map(groupedCall => (
            <div key={groupedCall.id} className="flex flex-col text-xs text-gray-600 py-1">
              <span>{formatTime(groupedCall.created_at)}</span>
              <span className={status.color}>{status.label} <span className="italic">{formatDuration(groupedCall.duration)}</span></span>
            </div>
          ))}
        </div>
      </div>
 
      {!is_archived && 
      <Button 
        onClick={handleArchive} 
        type={BUTTON_TYPES.ICON}
        cta="Archive"
        icon={<Archive size={16} />}
      ></Button>}
      {is_archived && 
      <Button 
        onClick={handleRestore} 
        type={BUTTON_TYPES.ICON}
        cta="Restore"
        icon={<ArchiveRestore size={16} />}
      ></Button>}
    </div>
  )
}
export default ActivityItem;
