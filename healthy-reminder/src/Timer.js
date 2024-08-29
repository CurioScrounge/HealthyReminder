import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import PlayTimer from './PlayTimer';
import PauseTimer from './PauseTimer';

function Timer({ endTime, duration, elapsedTime, setElapsedTime, handleBack, resetTimer }) {
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const calculateEndTime = () => {
    const now = new Date();
    const end = new Date();
    end.setHours(endTime.hours, endTime.minutes, 0, 0);

    if (end <= now) {
      end.setDate(end.getDate() + 1);
    }

    return end > now;
  };

  const startTimer = () => {
    setIsRunning(true);
    const totalDuration = duration * 60 * 1000;
    const startTime = new Date().getTime() - elapsedTime;

    timerRef.current = setInterval(() => {
      const now = new Date().getTime();
      const timePassed = now - startTime;
      const adjustedTimePassed = Math.min(timePassed, totalDuration);
      if (adjustedTimePassed >= totalDuration || !calculateEndTime()) {
        clearInterval(timerRef.current);
        setIsRunning(false);
      } else {
        setElapsedTime(adjustedTimePassed);
      }
    }, 1000);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const minutes = Math.floor(elapsedTime / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);

  return (
    <div className="timer">
      <button className="back-button" onClick={handleBack}>Back</button>
      <div className="end-time-display">
        End Time: {endTime.hours.toString().padStart(2, '0')}:
        {endTime.minutes.toString().padStart(2, '0')}
      </div>
      <CircularProgressbar
        value={elapsedTime}
        maxValue={duration * 60 * 1000}
        text={`${minutes}:${seconds.toString().padStart(2, '0')}`}
        strokeWidth={5}
        styles={buildStyles({
          pathColor: '#A28B55',
          trailColor: '#CBE2B5',
          textColor: '#E7FBE6',
        })}
      />
      {!isRunning ? (
        <PlayTimer onClick={startTimer} />
      ) : (
        <PauseTimer onClick={pauseTimer} />
      )}
      <button onClick={resetTimer}>Reset Timer</button>
    </div>
  );
}

export default Timer;