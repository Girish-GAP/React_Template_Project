import React, { useState } from 'react';
import './toggle.scss';

const Toggle = ({ clickCallback, toggleTitle }) => {
  const [isToggle, setIsToggle] = useState(false);

  const handleToggle = e => {
    setIsToggle(!isToggle);
    clickCallback(!isToggle);
  };
  return (
    <div>
      <span className="mr-2 readText">{toggleTitle}</span>
      <label className="switch">
        <input type="checkbox" checked={isToggle} onChange={handleToggle} />
        <span className="slider round" />
      </label>
    </div>
  );
};

export default Toggle;
