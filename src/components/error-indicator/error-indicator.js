import React from 'react';
import './error-indicator.css';
import icon from './death-star-icon.png';

const ErrorIndicator = () => {
  return (
    <div className="error-indicator mx-auto alert text-center bg-danger">
      <div className="error-indicator__icon mx-auto">
        <img src={icon} alt="error icon" className="w-100"/>
      </div>
      <span className="error-indicator__header">BOOM!</span>
      <span className="error-indicator__body"> Что то пошло не так</span>
      <span className="error-indicator__footer"> (но мы уже знаем и скоро починим)</span>
    </div>
  )
}

export default ErrorIndicator;