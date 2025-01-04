## Decisions

> `utils.js`
# Call Status Logic (determineCallStatus)

## Voicemail
- Marked as "missed" but has duration > 0
- Indicates caller reached voicemail system and likely left a message
- Yellow status to indicate action needed

## Forwarded Calls
- Call was "answered" and routed through different number (via ≠ from)
- Duration unreliable as call was handled on different system
- Blue status to indicate successful transfer

## Completed Calls
- Call was "answered" with duration > 0
- Indicates successful connection and conversation
- Green status for successful completion

## Connection Failed
- Call was "answered" but duration = 0
- Only applies to non-forwarded calls
- Could indicate technical issues or immediate disconnection
- Yellow status to indicate potential system issue

## Missed Calls
- Simple missed call with no duration
- No voicemail left
- Red status to indicate missed opportunity

## Unknown States
- Fallback for unrecognized call types
- Gray status indicates indeterminate state