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

export const formatTime = (dateString) => {

  const date = new Date(dateString);

  return date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

export const formatDuration = (seconds) => {
  if (seconds === 0) return '--';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const CALL_DIRECTIONS = {
  INBOUND: 'inbound',
  OUTBOUND: 'outbound',
}

export const CALL_TYPE = {
  MISSED: 'missed',
  ANSWERED: 'answered',
}