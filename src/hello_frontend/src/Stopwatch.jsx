import React, { useState, useEffect, useRef } from 'react';

const Stopwatch = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, isPaused]);

  const startHandler = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const stopHandler = () => {
    setIsActive(false);
    setIsPaused(true);
  };

  const resetHandler = () => {
    setIsActive(false);
    setIsPaused(false);
    setSeconds(0);
  };

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="stopwatch">
      <div className="stopwatch-display">
        {formatTime(seconds)}
      </div>
      <div className="stopwatch-controls">
        {!isActive && !isPaused ? (
          <button onClick={startHandler}>Start</button>
        ) : isPaused ? (
          <button onClick={startHandler}>Resume</button>
        ) : (
          <button onClick={stopHandler}>Pause</button>
        )}
        <button onClick={resetHandler}>Reset</button>
      </div>
      <style jsx>{`
        .stopwatch {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: Arial, sans-serif;
        }
        .stopwatch-display {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        .stopwatch-controls button {
          margin: 0 0.5rem;
          padding: 0.5rem 1rem;
          font-size: 1rem;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Stopwatch;
