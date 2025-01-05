import React, { useState, useEffect } from 'react';
import { formatDuration, formatPhoneNumber, formatTime, determineCallStatus, getDisplayNumber } from '../../utils/utils';
import { Icons } from '../../utils/icons';
import { CALL_DIRECTIONS } from '../../config';
import { useCalls } from '../../contexts/CallsContext';
import { useContacts } from '../../contexts/ContactsContext';
import { getCallParticipants } from '../../utils/contacts';
import { motion } from 'framer-motion';
import { callInfoVariants } from '../../animations/animations';
import Button, { BUTTON_TYPES } from '../Button/Button.jsx';
import { useToastContext } from '../../contexts/ToastContext.js';
import Avatar from '../Avatar/Avatar.jsx';

const CallInfo = ({ callId, onClose }) => {
  const { getCallInfo, archiveCall, restoreCall } = useCalls();
  const { contacts } = useContacts();
  const { showToast } = useToastContext();
  
  const [callData, setCallData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCallInfo(callId);
      setCallData(data);
    };
    fetchData();
  }, [callId]);

  if (!callData) return null;

  const { 
    direction, 
    from, 
    to, 
    via, 
    duration, 
    is_archived,
    call_type,
    created_at,
  } = callData;

  const participants = getCallParticipants(callData, contacts);
  const status = determineCallStatus(duration, call_type, via, from);
  const isArchived = is_archived;

  const handleArchive = async () => {
    await archiveCall(callId);
    showToast({ message: 'Call archived' });
    onClose();
  }

  const handleRestore = async () => {
    await restoreCall(callId);
    showToast({ message: 'Call restored' });
    onClose();
  }

  return (
    <motion.div
      variants={callInfoVariants.parent}
      initial="initial"
      animate="animate"
      className="fixed p-4 inset-0 bg-black bg-opacity-50 flex items-center justify-center call-info"
    >
      <div className="bg-white rounded-lg shadow-xl w-96 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b">
          <div className="flex justify-between items-start">
            <div className="flex gap-3">
              <div className="flex flex-col items-center gap-2">
                <Avatar contact={participants.primary.contact} size="lg" />
              </div>
              <div>
                <div className="flex flex-col">
                  <div className="flex gap-2 items-center">
                    <h2 className="text-lg font-bold">
                      {participants.primary.isContact ? 
                        participants.primary.contact.name : 
                        formatPhoneNumber(participants.primary.display)}
                    </h2>
                    {isArchived && 
                      <span className="text-xs rounded-full bg-gray-400 text-white py-1 px-2">
                        Archived
                      </span>
                    }
                  </div>
                  {participants.primary.isContact && 
                    <span className="text-sm text-gray-500">
                      {formatPhoneNumber(participants.primary.contact.phoneNumbers[0].number)}
                    </span>
                  }
                  <div className="flex gap-1 items-center mt-1">
                    {direction === CALL_DIRECTIONS.INBOUND ? (
                      <Icons.phoneIncoming className={status.color} size={14} />
                      ) : (
                      <Icons.phoneOutgoing className={status.color} size={14} />
                    )}
                    <span className={`text-sm ${status.color}`}>{status.label}</span>
                    {duration > 0 && (
                      <span className="text-sm text-gray-500 ml-2">
                        ({formatDuration(duration)})
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <Button 
              onClick={onClose}
              type={BUTTON_TYPES.ICON}
              cta="Close"
              icon={<Icons.x size={20} />}
            />
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-[100px_1fr] gap-y-4 text-sm">
            {/* Time */}
            <div className="flex flex-col gap-1">
              <span className="text-gray-500 font-bold">Time</span>
              <span>{formatTime(created_at)}</span>
            </div>
            {/* Via */}
            <div className="flex flex-col gap-1">
              <span className="text-gray-500 font-bold">Via</span>
              <div className="flex items-center gap-2">
                <Avatar contact={participants.via.contact} size="sm" />
                <span>
                  {participants.via.isContact ? 
                    participants.via.contact.name : 
                    formatPhoneNumber(participants.via.display)}
                </span>
              </div>
            </div>

            {direction === CALL_DIRECTIONS.INBOUND ? (
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 font-bold">From</span>
                <div className="flex items-center gap-2">
                  <Avatar contact={participants.from.contact} size="sm" />
                  <span>
                    {participants.from.isContact ? 
                      participants.from.contact.name : 
                      formatPhoneNumber(participants.from.display)}                      
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 font-bold">To</span>
                <div className="flex items-center gap-2">
                  <Avatar contact={participants.to.contact} size="sm" />
                  <span>
                    {participants.to.isContact ? 
                      participants.to.contact.name : 
                      formatPhoneNumber(participants.to.display)}                      
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="border-t p-4 flex justify-end">
          {!is_archived ? (
            <button 
              onClick={() => handleArchive()}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm"
            >
              Archive
            </button>
          ) : (
            <button 
              onClick={() => handleRestore()}
              className="bg-blue-100 hover:bg-blue-200 text-gray-700 px-4 py-2 rounded-md text-sm"
            >
              Restore
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CallInfo;