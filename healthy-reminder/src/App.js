import './App.css';
import React, {useState} from 'react';
import Timer from './Timer'


function App() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const handleHourChange = (e) => {
    const value = parseInt(e.target.value);
    setHours(value);
  };

  const handleMinuteChange = (e) => {
    const value = parseInt(e.target.value);
    setMinutes(value);
  };
  return (
    <main>
      <h1>Run timer until</h1>
    <div className="time-picker">
    <div className="time-picker__sliders">
    <div className="time-picker__slider">
      <input
        type="range"
        min="0"
        max="23"
        value={hours}
        onChange={handleHourChange}
        class="slider"
      />
    </div>
    <label>Hours</label>
    </div>
    <div className="time-picker__output">
      {hours.toString().padStart(2, '0')}:
      {minutes.toString().padStart(2, '0')}
    </div>
    <div className="time-picker__sliders">
    <div className="time-picker__slider">
      <input
        type="range"
        min="0"
        max="59"
        value={minutes}
        onChange={handleMinuteChange}
        class="slider"
      />
    </div>
    <label>Minutes</label>
    </div>
  </div>
  <Timer />
  </main>
    
    
  );
}

export default App;
