import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import Timer from './Timer';
import EndTime from './EndTime';
import EndPage from './EndPage';
import alertAudio from './assets/alert.mp3'; // Import the audio file
import Modal from './Modal';
import Select from 'react-select';

function App() {
  const [endTime, setEndTime] = useState({ hours: 4, minutes: 0 });
  const [duration, setDuration] = useState(45);
  const [showSettings, setShowSettings] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showSleepMessage, setShowSleepMessage] = useState(false);
  const [showEndPopup, setShowEndPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [showModal, setShowModal] = useState(false);

  const audioRef = useRef(new Audio(alertAudio)); // Use the imported URL

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const currentHour = now.getHours();
      setShowSleepMessage(currentHour >= 22);

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
      setShowModal(true);
      return;
    }

    setShowSettings(false);
    setCurrentPage('timer');
  };

  const closeModal = () => {
    setShowModal(false);
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
      {showSleepMessage && <div className="sleep-message">It's getting late! Please consider sleeping.</div>}
      {showEndPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Time to get up and exercise!</p>
            <button className='timer_end_button' onClick={handlePopupButton}>Follow Exercises</button>
          </div>
        </div>
      )}
      {showModal && (
        <Modal message="Please choose an end time later than the current time." onClose={closeModal}/>
      )}
      {currentPage === 'home' && showSettings ? (
        <div className="settings">
          <EndTime endTime={endTime} setEndTime={setEndTime} />
          <DurationSelector setDuration={setDuration} />
          <button className='buttons' onClick={handleStart}>Start Timer</button>
        </div>
      ) : currentPage === 'timer' ? (
        <div className='contain_Timer'>
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
        </div>
      ) : (
        <EndPage handleBackToTimer={handleBackToTimer} />
      )}
    </main>
  );
}

function DurationSelector({ setDuration }) {
  const options = Array.from({ length: 59 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1} minutes`
  }));

  const handleChange = (selectedOption) => {
    setDuration(selectedOption.value);
  };

  return (
    <div className='duration' style={{ display: 'flex', alignItems: 'center' }}>
      <label htmlFor="duration" style={{ marginRight: '10px' }}>Select Duration:</label>
      <Select
        id="duration"
        options={options}
        defaultValue={options[30]} // Default to 45 minutes
        onChange={handleChange}
        isSearchable={false}
        styles={{
          control: (provided, state) => ({
            ...provided,
            width: '210px', // Set specific width
            fontFamily: 'Raleway, system-ui',
            backgroundColor: '#1abc9c',
            color: '#fff',
            padding:'3px',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
            fontSize: '1.8rem', 
            boxShadow: state.isFocused ? '0 0 5px rgba(26, 188, 156, 0.5)' : provided.boxShadow, // Keep box shadow on focus
            '&:hover': {
              boxShadow: '0 0 7px rgba(26, 188, 156, 0.5)' // Keep box shadow on hover
            }
          }),
          singleValue: (provided) => ({
            ...provided,
            color: '#fff',
          }),
          menu: (provided) => ({
            ...provided,
            width: '200px', 
          }),
          focus: (provided)=>({
            ...provided,
            boxShadow:'0 0 5px rgba(26, 188, 156, 0.5)',
          }),
          option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? '#fff' : 'grey', // Set text color for options
            backgroundColor: state.isSelected ? '#1abc9c' : state.isFocused ? '#d5f5e3' : 'white',            fontSize: '1.8rem' // Set font size for options
          })
        }}
        components={{
          IndicatorSeparator: () => null // Remove the default indicator separator
        }}
      />
    </div>
  );
}
export default App;