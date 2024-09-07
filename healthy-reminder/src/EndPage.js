import React from 'react';
import ".//App.css"

function EndPage({ handleBackToTimer }) {
  return (
    <div className="end-page">
      <a
        href="https://musclewiki.com/"
        target="_blank"
        rel="noreferrer"
      >
        Exercises
      </a>
      <button className='back_to_timer' onClick={handleBackToTimer}>Back to Timer</button>
    </div>
  );
}

export default EndPage;