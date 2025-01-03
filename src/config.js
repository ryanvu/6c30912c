export const API_CONFIG = {
  BASE_URL: 'https://aircall-api.onrender.com',
  ENDPOINTS: {
    ACTIVITIES: '/activities',
    RESET: '/reset',
  },
  getActivityEndpoint: (callId) => `/activities/${callId}`,
};

export const CALL_TYPES = {
  MISSED: 'missed',
  ANSWERED: 'answered',
  VOICEMAIL: 'voicemail',
};

export const CALL_DIRECTIONS = {
  INBOUND: 'inbound',
  OUTBOUND: 'outbound',
};

export const HTTP_METHODS = {
  GET: 'GET',
  PATCH: 'PATCH',
};
