import { PhoneIncoming, PhoneOutgoing, Phone } from 'lucide-react';
import { formatTime } from '../../utils';

const CALL_DIRECTIONS = {
  INBOUND: 'inbound',
  OUTBOUND: 'outbound',
}

const CALL_TYPE = {
  MISSED: 'missed',
  ANSWERED: 'answered',
}

const ActivityItem = ({ call }) => {
  const { direction, call_type } = call;

  const formatNumber = (num) => num <= 4 ? `User ${num}` : String(num);
  const iconColor = call_type === CALL_TYPE.MISSED ? 'text-red-500' : 'text-green-500';

  return (
    <div className="flex items-center gap-2 p-4 rounded-md border-gray-200 border-2">
      <div className="call-status">
        {direction === CALL_DIRECTIONS.INBOUND ? (
          <PhoneIncoming className={iconColor} size={18} />
        ) : (
          <PhoneOutgoing className={iconColor} size={18} />
        )}
      </div>
      
      <div className="call-details">
        <div className="call-path">
          {/* <span className="from">{formatNumber(call.from)}</span> */}
          <span className="arrow">→</span>
          <span className="to">{formatNumber(call.to)}</span>
        </div>
        
        <div className="routing-info">

          <span className="via-route">
            Routed via: {formatNumber(call.via)}
          </span>



        </div>
      </div>
      <span className="timestamp ml-auto text-gray-400 text-xs">
        {formatTime(call.created_at)}
      </span>
    </div>
  );
};

export default ActivityItem;
