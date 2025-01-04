## Decisions

> Code Organization
- Using a single file for all of the logic (`contexts/CallsContext.js`)
- API calls are made in `services/calls.service.js`
- Utils are in `utils.js` mostly for data formatting and interpretation
- Modals are in `Modal/Modals.jsx` making use of portals
- hooks to allow the Modals to be used in multiple places with different contexts
- `config.js` to house constants and mimic some TypeScript functionality
- Notice some enums are created for specific parts of the app, exporting only if the values are really reusable

> Not using a Router
- Wanted to keep the app as simple as possible

> Tailwind CSS
- Using Tailwind CSS for styling and speed

> Framer Motion
- Maybe a waste of space in the bundle, but it's a nice library for animations and fun

> Lucide React (Icons)
- Using Lucide React for icons

> Context API
- Using the Context API to manage the state of the app
- Wanted to just have one source of truth for all of the activity data

> `utils.js`
> Call Status Logic (determineCallStatus)

> Voicemail
> - Marked as "missed" but has `duration > 0`
> - Indicates caller reached voicemail system and likely left a message
> - Yellow status to indicate action needed

> Forwarded Calls
> - Call was "answered" and routed through different number (`via ≠ from`)
> - Duration unreliable as call was handled on different system
> - Blue status to indicate successful transfer

> Completed Calls
> - Call was "answered" with `duration > 0`
> - Indicates successful connection and conversation
> - Green status for successful completion

> Connection Failed
> - Call was "answered" but `duration = 0`
> - Only applies to non-forwarded calls
> - Could indicate technical issues or immediate disconnection
> - Yellow status to indicate potential system issue

> Missed Calls
> - Simple missed call with `no duration`
> - No voicemail left
> - Red status to indicate missed opportunity

> Unknown States
> - Fallback for unrecognized call types
> - Gray status indicates indeterminate state