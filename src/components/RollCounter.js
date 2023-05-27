import React from 'react';

export default function RollCounter({ noOfRolls }) {
  return (
    <h2 className="roll-counter">
      Number of rolls: {noOfRolls > 0 && noOfRolls}
    </h2>
  );
}
