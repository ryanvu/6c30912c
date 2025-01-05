import React, { useState } from 'react';
import { useCalls } from '../../contexts/CallsContext';
import { useCallState } from '../../hooks/useCallState';
import { formatPhoneNumber } from '../../utils/utils';
import { Icons } from '../../utils/icons';

const DialPad = () => {
  const [numberToDial, setNumberToDial] = useState('');

  const handleNumberClick = (e,number) => {
    e.preventDefault();
    setNumberToDial(prev => prev + number);
  };

  const handleBackspace = () => {
    setNumberToDial(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setNumberToDial('');
  };

  const baseStyle = 'flex items-center justify-center bg-gray-300 px-4 py-2 rounded-full text-lg text-gray-700 font-bold h-16 w-16';
  const hoverStyles = 'hover:bg-gray-200 hover:text-black';
  const activeStyles = 'active:bg-green-500 active:text-white';

  const numberStyle = `${baseStyle} ${hoverStyles} ${activeStyles}`;

  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">

      <div className="flex items-center gap-2 justify-center w-full relative">
        {numberToDial && (
          <button 
            onClick={handleBackspace}
            className="p-2 hover:bg-gray-100 rounded-full absolute left-10"
          >
            <Icons.backspace size={24} className="text-gray-500" />
          </button>
        )}
        <div className="text-3xl font-bold min-h-[48px]">
          {numberToDial ? formatPhoneNumber(numberToDial) : ""}
        </div>
      </div>

      <div className="grid grid-cols-3 grid-rows-4 gap-4">
        <div className="col-span-3 flex items-center justify-center gap-2">
          <button className={numberStyle} onClick={(e) => handleNumberClick(e, '1')}>1</button>
          <button className={numberStyle} onClick={(e) => handleNumberClick(e, '2')}>2</button>
          <button className={numberStyle} onClick={(e) => handleNumberClick(e, '3')}>3</button>
        </div>

        <div className="col-span-3 flex items-center justify-center gap-2">
          <button className={numberStyle} onClick={(e) => handleNumberClick(e, '4')}>4</button>
          <button className={numberStyle} onClick={(e) => handleNumberClick(e, '5')}>5</button>
          <button className={numberStyle} onClick={(e) => handleNumberClick(e, '6')}>6</button>
        </div>

        <div className="col-span-3 flex items-center justify-center gap-2">
          <button className={numberStyle} onClick={(e) => handleNumberClick(e, '7')}>7</button>
          <button className={numberStyle} onClick={(e) => handleNumberClick(e, '8')}>8</button>
          <button className={numberStyle} onClick={(e) => handleNumberClick(e, '9')}>9</button>
        </div>

        <div className="col-span-3 flex items-center justify-center gap-2">
          <button className={numberStyle} onClick={(e) => handleNumberClick(e, '*')}>*</button>
          <button className={numberStyle} onClick={(e) => handleNumberClick(e, '0')}>0</button>
          <button className={numberStyle} onClick={(e) => handleNumberClick(e, '#')}>#</button>
        </div>
      </div>

      {/* Call Button */}
      {numberToDial && (
        <button 
          className="bg-green-500 hover:bg-green-600 text-white rounded-full h-16 w-16 flex items-center justify-center"
        >
          <Icons.phone size={24} />
        </button>
      )}
    </div>
  );
};

export default DialPad;