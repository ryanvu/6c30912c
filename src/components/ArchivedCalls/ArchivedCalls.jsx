import React from 'react'
import { useCalls } from '../../contexts/CallsContext';

function ArchivedCalls() {
  const { archivedCalls } = useCalls();

  return (
    <div>
      {archivedCalls.map(call => (
        <div key={call.id}>
          {call.id}
        </div>
      ))}
    </div>
  )
}

export default ArchivedCalls