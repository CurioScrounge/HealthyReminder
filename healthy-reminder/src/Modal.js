import React from 'react';
import './modal.css';

function Modal({ message, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>
        <button className='close' onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Modal;