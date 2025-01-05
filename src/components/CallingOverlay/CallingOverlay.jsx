import React, { useEffect, useRef, useState } from 'react'
import { useCalls } from '../../contexts/CallsContext';
import Button, { BUTTON_COLORS, BUTTON_TYPES } from '../Button/Button.jsx';
import { Icons } from '../../utils/icons';
import { motion } from 'framer-motion';

const CALL_RESPONSES = {
  ANSWERED: 'Answered',
  DECLINED: 'Declined',
}

function CallingOverlay() {
  const [isDialing, setIsDialing] = useState(true);
  const [callResponse, setCallResponse] = useState(null);
  const [callEnded, setCallEnded] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isDialing) {
      setTimeout(() => {
        setIsDialing(false);
        randomAnswerOrDeclined();
      }, 4000);
    }
  }, [isDialing]);

  useEffect(() => {
    if (callResponse === CALL_RESPONSES.ANSWERED) {
      timerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [callResponse]);

  const formatDuration = () => {
    const minutes = Math.floor(callDuration / 60);
    const seconds = callDuration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const randomAnswerOrDeclined = () => {
    const randomNumber = Math.floor(Math.random() * 10);
    if (randomNumber < 6) {
      setCallResponse(CALL_RESPONSES.ANSWERED);
    } else {
      setCallResponse(CALL_RESPONSES.DECLINED);
      setCallEnded(true);

      setTimeout(() => {
        handleEndCall();
      }, 2000);
    }
  }

  const handleEndCall = () => {
 
    if (timerRef.current) {
      clearInterval(timerRef.current);
      setCallEnded(true);
    }

    setTimeout(() => {
      endCall();
    }, 2000);
  }

  const { isCalling, endCall } = useCalls();

  return (
    <motion.div 
      className="fixed inset-0 bg-black opacity-95 flex items-center justify-center call-info"
    >
      <div className="bg-gray-300 shadow-xl w-96 h-full flex flex-col items-center justify-between py-20">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">
            { isDialing ? 'Calling...' : callResponse === CALL_RESPONSES.ANSWERED ? 'Connected' : 'Declined' }
          </h1>
          <span className="text-lg">  
            { isCalling }
          </span>
          {callResponse === CALL_RESPONSES.ANSWERED && (
            <span className="text-md mt-2">{formatDuration()}</span>
          )}
          { callEnded && <span className="text-md mt-2">Call Ended</span> }
        </div>
        {/* Actions */}
          { isDialing && <DialingActions endCall={handleEndCall} /> }
          { callResponse === CALL_RESPONSES.ANSWERED && <ConnectedActions endCall={handleEndCall} /> }
      </div>
    </motion.div>
  )
}

const DialingActions = ({ endCall }) => {
  return (
    <div className="flex justify-evenly w-full">
      <Button 
        type={BUTTON_TYPES.ICON}
        color={BUTTON_COLORS.DANGER}
        cta="End"
        icon={<Icons.x size={20} />}
        onClick={endCall}
      />
    </div>
  )
}

const ConnectedActions = ({ endCall }) => {
  return (
    <div className="flex justify-evenly w-full">
      <Button 
        type={BUTTON_TYPES.ICON}
        color={BUTTON_COLORS.CALL}
        cta="Mute"
        icon={<Icons.mute size={20} />}
      />

      <Button 
        type={BUTTON_TYPES.ICON}
        color={BUTTON_COLORS.DANGER}
        cta="Hang Up"
        icon={<Icons.phone className="transform rotate-135" size={20} />}
        onClick={endCall}
      />

      <Button 
        type={BUTTON_TYPES.ICON}
        color={BUTTON_COLORS.CALL}
        cta="Speaker"
        icon={<Icons.speaker size={20} />}
      />
    </div>
  )
}

export default CallingOverlay