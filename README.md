## Decisions and Implementation

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
- Router similuation in `App.jsx` with tabs and views

> Tailwind CSS
- Using Tailwind CSS for styling and speed

> Framer Motion
- Maybe a waste of space in the bundle, but it's a nice library for animations and fun

> Lucide React (Icons)
- Using Lucide React for icons
- Icons are imported from Lucide React and used in `utils/icons.js`
  - For one source of truth and importing from Lucide only in one place

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

## Features

> Call simulation
- Clicking on an `ActivityItem` will open a confirmation modal asking if you want to call the person 
- If the call connects or not depends on the `randomAnswerOrDeclined` function
- `hooks/useCallStat.js` and `contexts/CallsContext.js` are used to manage the state of the call
