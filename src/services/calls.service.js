// services/callsApi.js
import { API_CONFIG, HTTP_METHODS } from '../config';

export const callsApi = {
  fetchCalls: async () => {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ACTIVITIES}`
    );
    return response.json();
  },

  getCallInfo: async (callId) => {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.getActivityEndpoint(callId)}`
    );
    return response.json();
  },

  resetCalls: async () => {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.RESET}`,
      {
        method: HTTP_METHODS.PATCH,
        headers: { 'Content-Type': 'application/json' },
      }
    );
    
    if (!response.ok) throw new Error('Failed to reset calls');

    return true;
  },

  archiveCall: async (callId) => {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.getActivityEndpoint(callId)}`,
      {
        method: HTTP_METHODS.PATCH,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_archived: true })
      }
    );
    
    if (!response.ok) throw new Error('Failed to archive call');

    return true;
  },

  archiveAllCalls: async (callIds, onProgress) => {
    const results = [];
    let completed = 0;

    for (const callId of callIds) {
      try {
        const result = await callsApi.archiveCall(callId);
        results.push(result);
        completed++;
        onProgress?.(completed / callIds.length);
      } catch (error) {
        console.error(`Failed to archive call ${callId}:`, error);
      }
    }

    return results;
  }
};