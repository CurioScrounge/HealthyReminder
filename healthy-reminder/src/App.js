import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import Timer from './Timer';
import EndTime from './EndTime';
import EndPage from './EndPage';
import alertAudio from './assets/alert.mp3'; // Import the audio file

function App() {
  const [endTime, setEndTime] = useState({ hours: 4, minutes: 0 });
  const [duration, setDuration] = useState(45);
  const [showSettings, setShowSettings] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showSleepMessage, setShowSleepMessage] = useState(false);
  const [showEndPopup, setShowEndPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const audioRef = useRef(new Audio(alertAudio)); // Use the imported URL

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const currentHour = now.getHours();
      setShowSleepMessage(currentHour >= 23);

      const end = new Date();
      end.setHours(endTime.hours, endTime.minutes, 0, 0);
      if (now >= end && currentPage === 'timer') {
        resetTimer();
      }
    };

    const interval = setInterval(checkTime, 1000);
    return () => clearInterval(interval);
  }, [endTime, currentPage]);

  const handleStart = () => {
    const now = new Date();
    const end = new Date();
    end.setHours(endTime.hours, endTime.minutes, 0, 0);

    if (end <= now) {
      alert('Please choose an end time later than the current time.');
      return;
    }

    setShowSettings(false);
    setCurrentPage('timer');
  };

  const handleBack = () => {
    setShowSettings(true);
    setCurrentPage('home');
  };

  const handleStartAfresh = () => {
    setElapsedTime(0);
    setShowSettings(true);
    setCurrentPage('home');
  };

  const resetTimer = () => {
    setElapsedTime(0);
    setEndTime({ hours: 4, minutes: 0 });
    setShowSettings(true);
    setCurrentPage('home');
  };

  const handleEndTimer = () => {
    setShowEndPopup(true);
    const audio = audioRef.current;
    audio.loop = true;
    audio.play().catch(error => console.error('Audio play error:', error));
  };

  const handlePopupButton = () => {
    setShowEndPopup(false);
    setCurrentPage('endPage');
    const audio = audioRef.current;
    audio.pause();
    audio.currentTime = 0;
  };

  const handleBackToTimer = () => {
    setElapsedTime(0);
    setCurrentPage('timer');
  };

  return (
    <main>
      {showSleepMessage && <div className="sleep-message">It's late! Consider sleeping.</div>}
      {showEndPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Timer ended!</p>
            <button className='timer_end_button' onClick={handlePopupButton}>Go to end page</button>
          </div>
        </div>
      )}
      {currentPage === 'home' && showSettings ? (
        <div className="settings">
          <EndTime endTime={endTime} setEndTime={setEndTime} />
          <DurationSelector setDuration={setDuration} />
          <button onClick={handleStart}>Start Timer</button>
        </div>
      ) : currentPage === 'timer' ? (
        <Timer
          endTime={endTime}
          duration={duration}
          elapsedTime={elapsedTime}
          setElapsedTime={setElapsedTime}
          handleBack={handleBack}
          handleStartAfresh={handleStartAfresh}
          resetTimer={resetTimer}
          handleEndTimer={handleEndTimer}
          autoStart={true}
        />
      ) : (
        <EndPage handleBackToTimer={handleBackToTimer} />
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
        defaultValue={45}
        onChange={(e) => setDuration(parseInt(e.target.value))}
      >
        {Array.from({ length: 60 }, (_, i) => i + 1).map((minutes) => (
          <option key={minutes} value={minutes}>
            {minutes} minutes
          </option>
        ))}
      </select>
    </div>
  );
}

export default App;