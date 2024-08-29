import './App.css';
import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import EndTime from './EndTime.js';

function App() {
  const [endTime, setEndTime] = useState({ hours: 0, minutes: 0 });
  const [duration, setDuration] = useState(45);
  const [showSettings, setShowSettings] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showSleepMessage, setShowSleepMessage] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const currentHour = now.getHours();
      setShowSleepMessage(currentHour >= 23);
    };
    checkTime();
  }, []);

  const handleStart = () => {
    const now = new Date();
    const end = new Date();
    end.setHours(endTime.hours, endTime.minutes, 0, 0);

    if (
      (endTime.hours < 4 || endTime.hours >= 23) &&
      !window.confirm('End time is late. Are you sure?')
    ) {
      return;
    }

    if (end <= now) {
      end.setDate(end.getDate() + 1);
    }

    setShowSettings(false);
  };

  const handleBack = () => {
    setShowSettings(true);
  };

  const handleStartAfresh = () => {
    setElapsedTime(0);
    setShowSettings(true);
  };

  const resetTimer = () => {
    setElapsedTime(0);
    setEndTime({ hours: 0, minutes: 0 });
    setShowSettings(true);
  };

  return (
    <main>
      {showSleepMessage && <div className="sleep-message">It's late! Consider sleeping.</div>}
      {showSettings ? (
        <div className="settings">
          <EndTime endTime={endTime} setEndTime={setEndTime} />
          <DurationSelector setDuration={setDuration} />
          <button onClick={handleStart}>Start Timer</button>
        </div>
      ) : (
        <Timer
          endTime={endTime}
          duration={duration}
          elapsedTime={elapsedTime}
          setElapsedTime={setElapsedTime}
          handleBack={handleBack}
          handleStartAfresh={handleStartAfresh}
          resetTimer={resetTimer}
        />
      )}
    </main>
  );
}

function DurationSelector({ setDuration }) {
  return (
    <div>
      <label htmlFor="duration">Select Duration:</label>
      <select
        id="duration"
        onChange={(e) => setDuration(parseInt(e.target.value))}
      >
        {Array.from({ length: 51 }, (_, i) => i + 10).map((minutes) => (
          <option key={minutes} value={minutes}>
            {minutes} minutes
          </option>
        ))}
      </select>
    </div>
  );
}

export default App;