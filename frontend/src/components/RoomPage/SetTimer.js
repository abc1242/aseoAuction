import React, { useState, useEffect, useRef, useCallback } from 'react'

const useCounter = (initialValue, ms) => {
  const [count, setCount] = useState(initialValue);
  const intervalRef = useRef(null);

  const start = useCallback(() => {
    if (intervalRef.current !== null) {
      return;
    }
    intervalRef.current = setInterval(() => {
      setCount(c => c + 1);
    }, ms);
  }, []);

  const stop = useCallback(() => {
    if (intervalRef.current == null) {
      return;
    }
    intervalRef(intervalRef.current);
    intervalRef.current = null;
  }, []);

  const reset = useCallback(() => {
    setCount(0);
    stop()
  }, []);

  return { count, start, stop, reset}
}



export default function SetTimer() {
  const [currentHours, setCurrentHours] = useState(0);
  const [currentMinutes, setCurrentMinutes] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const { count, start, stop, reset } = useCounter(0, 1000);

  const timer = () => {
    const checkMinutes = Math.floor(count / 60);
    const hours = Math.floor(count / 3600);
    const minutes = checkMinutes % 60;
    const seconds = count % 60;
    setCurrentHours(hours)
    setCurrentMinutes(minutes)
    setCurrentSeconds(seconds)
  }

  useEffect(timer, [count]);

  return (
    <div>
      <h1>
        {currentHours < 10 ? `0${currentHours}` : currentHours} : {currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes} : {currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds}
      </h1>   

      <button onClick={start}>start</button> 
      <button onClick={stop}>stop</button> 
      <button onClick={reset}>reset</button> 
    </div>
  )
}
