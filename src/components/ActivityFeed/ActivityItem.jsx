import { Shield, AlertTriangle, Phone } from 'lucide-react';
import './ActivityList.css';

const ActivityItem = ({ call }) => {
  const isAuthenticated = call.via === call.from;
  const isSystemRouted = call.via === 1;
  
  const formatNumber = (num) => num <= 4 ? `User ${num}` : String(num);

  return (
    <div className={`activity-item ${isAuthenticated ? 'verified' : ''}`}>
      <div className="call-status">
        {isAuthenticated ? (
          <Shield className="icon verified" size={18} />
        ) : isSystemRouted ? (
          <Phone className="icon system" size={18} />
        ) : (
          <AlertTriangle className="icon warning" size={18} />
        )}
      </div>
      
      <div className="call-details">
        <div className="call-path">
          <span className="from">{formatNumber(call.from)}</span>
          <span className="arrow">→</span>
          <span className="to">{formatNumber(call.to)}</span>
        </div>
        
        <div className="routing-info">
          {!isAuthenticated && (
            <span className="via-route">
              Routed via: {formatNumber(call.via)}
            </span>
          )}
          <span className="timestamp">
            {new Date(call.created_at).toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;