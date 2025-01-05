export const formatPhoneNumber = (phoneNumber) => {
  const numberString = String(phoneNumber);
  
  if (numberString.length <= 2) return numberString;
  
  const cleaned = numberString.replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0,3)}) ${cleaned.slice(3,6)}-${cleaned.slice(6)}`;
  }

  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `(${cleaned.slice(1,4)}) ${cleaned.slice(4,7)}-${cleaned.slice(7)}`;
  }

  return numberString;
};

export const getDisplayNumber = (direction, from, to) => {
  if (direction === CALL_DIRECTIONS.INBOUND) {
    return from;
  }
  return to;
};

export const formatTime = (dateString) => {

  const date = new Date(dateString);

  return date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

export const formatDuration = (seconds) => {
  if (seconds === 0) return null;
  
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  
  if (mins === 0) {
    return `${secs}s`;
  }
  
  return `${mins}min ${secs}s`;
};

export const formatCallDuration = (s) => {
  const minutes = Math.floor(s / 60);
  const seconds = s % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const determineCallStatus = (duration, callType, via, from) => {

  if (callType === 'missed' && duration > 0) {
    return {
      label: 'Voicemail',
      color: 'text-yellow-500'
    };
  }

  if (callType === 'answered') {

    if (via && via !== from) {
      return {
        label: 'Forwarded',
        color: 'text-blue-500'
      };
    }

    if (duration > 0) {
      return {
        label: 'Completed',
        color: 'text-green-500'
      };
    }

    return {
      label: 'Connection Failed',
      color: 'text-yellow-500'
    };
  }

  if (callType === 'missed') {
    return {
      label: 'Missed',
      color: 'text-red-500'
    };
  }

  return {
    label: callType,
    color: 'text-gray-500'
  };
};

export const CALL_DIRECTIONS = {
  INBOUND: 'inbound',
  OUTBOUND: 'outbound',
}

export const CALL_TYPE = {
  MISSED: 'missed',
  ANSWERED: 'answered',
}