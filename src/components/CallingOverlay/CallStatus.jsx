import { CALL_RESPONSES } from '../../constants/call';
import { formatCallDuration } from '../../utils/utils';

export const CallStatus = ({ isDialing, callResponse, callDuration, callEnded, isCalling }) => (
  <div className="flex flex-col items-center">
    <h1 className="text-2xl font-bold">
      {isDialing ? 'Calling...' : callResponse === CALL_RESPONSES.ANSWERED ? 'Connected' : 'Declined'}
    </h1>
    <span className="text-lg">{isCalling}</span>
    {callResponse === CALL_RESPONSES.ANSWERED && (
      <span className="text-md mt-2">{formatCallDuration(callDuration)}</span>
    )}
    {callEnded && <span className="text-md mt-2">Call Ended</span>}
  </div>
);