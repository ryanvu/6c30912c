import { PhoneIncoming, PhoneOutgoing, Archive, Info, X } from 'lucide-react';
import { CALL_DIRECTIONS, CALL_TYPE, formatDuration, formatPhoneNumber, formatTime } from '../../utils';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCalls } from '../../contexts/CallsContext';

const ActivityItem = ({ call, i }) => {
  const { direction, call_type, count } = call;
  const [showActions, setShowActions] = useState(false);

  const iconColor = call_type === CALL_TYPE.MISSED ? 'text-red-500' : 'text-green-500';

  const handleToggleExpand = () => {
    setShowActions(prev => !prev);
  }

  return (
    <div className="flex-col items-center gap-2 pl-4 py-4 rounded-md border-gray-200 border-2 cursor-pointer transition duration-300">
      <div className="flex items-center gap-2">
        <div className="call-status">
          {direction === CALL_DIRECTIONS.INBOUND ? (
            <PhoneIncoming className={iconColor} size={18} />
          ) : (
            <PhoneOutgoing className={iconColor} size={18} />
          )}
        </div>
        
        <div className="call-details">
          <div className="flex flex-row gap-2 items-center">
            <span className="font-bold">{formatPhoneNumber(call.to)}</span>
            { count > 1 && <span className="text-gray-400 text-xs">({count})</span> }
          </div>
        </div>

        <div
          onClick={handleToggleExpand}
          className="flex gap-1 items-center bg-black text-white ml-auto text-xs rounded-l-lg rounded-r-none border-r-0 px-2 py-1 transition transform hover:scale-105">
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
  const { archiveCall } = useCalls();

  const { via, call_type, duration, is_archived } = call;
  console.log(call);

  const handleArchive = async () => {
    await archiveCall(call.id);
  }

  return (
    <div className="flex justify-between gap-4 p-4">
      <div className="flex">
        <span>{call_type}</span>
        <span>{formatDuration(duration)}</span>
      </div>
      {!is_archived && <button className="btn btn-secondary" onClick={handleArchive}>Archive</button>}
      {is_archived && <button className="btn btn-secondary" onClick={handleArchive}>Restore</button>}
    </div>
  )
}
export default ActivityItem;
