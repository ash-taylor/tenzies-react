import React from 'react';

export default function Die({ value, isHeld, setHold }) {
  return (
    <div className={isHeld ? 'die isHeld' : 'die'} onClick={setHold}>
      {value}
    </div>
  );
}
