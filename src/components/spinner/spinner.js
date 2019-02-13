import React from 'react';

import './spinner.css';

const Spinner = () => {
  return (
    <div className="spinner mx-auto">
      <div className="lds-gear">
        <div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;