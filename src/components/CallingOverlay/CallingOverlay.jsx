import React from 'react'
import { useCalls } from '../../contexts/CallsContext';
import Button, { BUTTON_COLORS, BUTTON_TYPES } from '../Button/Button.jsx';
import { Icons } from '../../utils/icons';
import { motion } from 'framer-motion';
import { CallStatus } from './CallStatus.jsx';
import { useCallState } from '../../hooks/useCallState.js';
import { CALL_RESPONSES } from '../../constants/call.js';
import { callOverlayVariants } from '../../animations/animations.js';



function CallingOverlay() {
  const { isCalling, endCall } = useCalls();
  const {
    isDialing,
    callResponse,
    callEnded,
    callDuration,
    handleEndCall
  } = useCallState(endCall);

  return (
    <motion.div
      variants={callOverlayVariants.parent}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 bg-black opacity-90 flex items-center justify-center call-info"
    >
      <div className="bg-gray-700 shadow-xl w-96 h-full flex flex-col items-center justify-between py-20">
        <CallStatus
          isDialing={isDialing}
          callResponse={callResponse}
          callDuration={callDuration}
          callEnded={callEnded}
          isCalling={isCalling}
        />
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