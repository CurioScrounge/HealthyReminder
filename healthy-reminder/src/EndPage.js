import React from 'react';

function EndPage({ handleBackToTimer }) {
  return (
    <div className="end-page">
      <h1>End Page</h1>
      <button onClick={handleBackToTimer}>Back to Timer</button>
    </div>
  );
}

export default EndPage;