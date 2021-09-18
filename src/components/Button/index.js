import React from 'react';
import { Link } from 'react-router-dom';
import './button.scss';
const STYLES = ['btn--primary', 'btn--outline','btn--submit'];

const SIZES = ['btn--large','btn--medium', 'btn--small', 'btn--wide'];

const COLOR = ['primary', 'blue', 'red', 'green'];

function Button  ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  buttonColor
})  {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  const checkButtonColor = COLOR.includes(buttonColor) ? buttonColor : null;

  return (
    <button
      className={`btn ${checkButtonStyle} ${checkButtonSize} ${checkButtonColor}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button