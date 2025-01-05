import { useState, useEffect, useRef } from 'react';
import { CALL_RESPONSES } from '../constants/call';

export const useCallState = (onComplete) => {
  const [isDialing, setIsDialing] = useState(true);
  const [callResponse, setCallResponse] = useState(null);
  const [callEnded, setCallEnded] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isDialing) {
      setTimeout(() => {
        setIsDialing(false);
        randomAnswerOrDeclined();
      }, 4000);
    }
  }, [isDialing]);

  useEffect(() => {
    if (callResponse === CALL_RESPONSES.ANSWERED) {
      timerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [callResponse]);

  const randomAnswerOrDeclined = () => {
    const randomNumber = Math.floor(Math.random() * 10);
    if (randomNumber < 6) {
      setCallResponse(CALL_RESPONSES.ANSWERED);
    } else {
      setCallResponse(CALL_RESPONSES.DECLINED);
      setCallEnded(true);
      
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  const handleEndCall = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setCallEnded(true);
    
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  return {
    isDialing,
    callResponse,
    callEnded,
    callDuration,
    handleEndCall
  };
};