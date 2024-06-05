// BackButton.jsx
import React from 'react';

import { FaArrowLeft } from 'react-icons/fa'; // Icon from react-icons

const IconBackHistory = ( {className=''}) => {


  const handleClick = () => {
        window.history.back();

  };

  return (
    <button onClick={handleClick} style={buttonStyle} className={className}>
      <FaArrowLeft /> Back
    </button>
  );
};

const buttonStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  backgroundColor: 'none',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
};

export default IconBackHistory;
