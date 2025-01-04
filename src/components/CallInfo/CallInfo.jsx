import React, { useState, useEffect } from 'react';
import { formatDuration, formatPhoneNumber, formatTime, determineCallStatus, getDisplayNumber } from '../../utils/utils';
import { Icons } from '../../utils/icons';
import { CALL_DIRECTIONS } from '../../config';
import { useCalls } from '../../contexts/CallsContext';

const CallInfo = ({ callId, onClose }) => {
  const { getCallInfo, archiveCall, restoreCall } = useCalls();
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

  const displayNumber = getDisplayNumber(direction, from, to);
  const status = determineCallStatus(duration, call_type, via, from);
  const isArchived = is_archived;

  const handleArchive = async () => {
    await archiveCall(callId);
    onClose();
  }

  const handleRestore = async () => {
    await restoreCall(callId);
    onClose();
  }

  return (
    <div className="fixed p-4 inset-0 bg-black bg-opacity-50 flex items-center justify-center call-info">
      <div className="bg-white rounded-lg shadow-xl w-96 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-start mb-4">
            <div className="flex gap-3">
              <div>
                {direction === CALL_DIRECTIONS.INBOUND ? (
                  <Icons.phoneIncoming className={status.color} size={24} />
                ) : (
                  <Icons.phoneOutgoing className={status.color} size={24} />
                )}
              </div>
              <div>
                <div className="flex gap-2 items-center">
                  <h2 className="text-xl font-bold">{formatPhoneNumber(displayNumber)}</h2>
                  { isArchived && <span className="text-xs rounded-full bg-gray-400 text-white py-1 px-2">Archived</span> }
                </div>
                <div className="flex gap-1 items-center">
                <span className={`text-sm ${status.color}`}>{status.label}</span>
                  {duration > 0 && (
                    <span className="text-sm text-gray-500 ml-2">
                      ({formatDuration(duration)})
                    </span>
                  )}
                
                </div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-1"
            >
              <Icons.x size={20} />
            </button>
          </div>
        </div>


        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <span className="text-gray-500">Time</span>
            <span>{formatTime(created_at)}</span>
            
            <span className="text-gray-500">Via</span>
            <span>{formatPhoneNumber(via)}</span>

            {direction === CALL_DIRECTIONS.INBOUND ? (
              <>
                <span className="text-gray-500">From</span>
                <span>{formatPhoneNumber(from)}</span>
              </>
            ) : (
              <>
                <span className="text-gray-500">To</span>
                <span>{formatPhoneNumber(to)}</span>
              </>
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
    </div>
  );
};

export default CallInfo;