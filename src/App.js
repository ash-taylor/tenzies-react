import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { nanoid } from 'nanoid';
import Die from './components/Die';
import RollCounter from './components/RollCounter';
import './App.css';

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [noOfRolls, setNoOfRolls] = useState(0);

  console.log(noOfRolls);

  useEffect(() => {
    dice.every((die) => die.value === dice[0].value && die.isHeld) &&
      setTenzies(true);
  }, [dice]);

  const diceElements = dice.map((die) => (
    <Die
      isHeld={die.isHeld}
      value={die.value}
      key={die.id}
      setHold={() => setHold(die.id)}
    />
  ));

  function generateDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const values = [];
    for (let i = 0; i < 10; i++) {
      values.push(generateDie());
    }
    return values;
  }

  function handleClick() {
    if (tenzies) {
      setTenzies(false);
      setDice(allNewDice());
      setNoOfRolls(0);
    } else {
      setDice((prevDice) =>
        prevDice.map((die) => (!die.isHeld ? generateDie() : die))
      );
      setNoOfRolls((prev) => prev + 1);
      console.log(noOfRolls);
    }
  }

  function setHold(id) {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id
          ? {
              ...die,
              isHeld: !die.isHeld,
            }
          : die
      )
    );
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      {tenzies && (
        <div className="win-box">
          <h1>You won in {noOfRolls} Rolls!</h1>
        </div>
      )}
      <p className="description">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="die-container">{diceElements}</div>

      <RollCounter noOfRolls={noOfRolls} />

      <button className="roll-button" onClick={handleClick}>
        {tenzies ? 'New Game' : 'Roll'}
      </button>
    </main>
  );
}
