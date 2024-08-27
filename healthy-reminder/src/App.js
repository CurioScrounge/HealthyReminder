import './App.css';
import React from 'react';


function App() {
  const date = new Date();
  const showTime = date.getHours() 
      + ':' + date.getMinutes() 
      + ":" + date.getSeconds();
  return (
    <div className="Timer">
      
    </div>    
  );
}

export default App;
