import React from 'react'
import { useCalls } from '../../contexts/CallsContext';

function EmptyView({ icon, title }) {
  const { resetCalls } = useCalls();
  return (
    <div className="flex flex-col items-center justify-center h-3/4 gap-4">
      {icon}
      <p className="text-gray-500 font-medium text-xl text-center">{title}</p>
      <button onClick={() => resetCalls()} className="btn btn-primary">Reset</button>
    </div>
  )
}

export default EmptyView