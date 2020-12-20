import React, { Fragment, useState, useRef } from "react";
import "./assets/css/timer.css";

const Timers = () => {
  const [hoursInput, setHoursInput] = useState("00");
  const [minutesInput, setminutesInput] = useState("00");
  const [secondsInput, setsecondsInput] = useState("00");
  const [userInput, setUserInput] = useState([]);

  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const handleInputChange = (e) => {
    console.log(`${e.target.dataset.number} clicked`);
    const input = parseInt(e.target.dataset.number);
    const currentInput = [...userInput];

    if (currentInput.length === 0 && input === 0) {
      console.log("First number can't be zero");
      return;
    } else if (currentInput.length === 6) {
      console.log("Can't have more than six numbers");
      return;
    } else {
      console.log(`Adding ${input} to currentInput and setting new userInput`);
      currentInput.push(input);
      setUserInput(currentInput);
      console.log(`Sending ${currentInput} to handleTimerStates()`);
      handleTimerStates(currentInput);
      return;
    }
  };

  const undoLastTimerKey = () => {
    console.log("Back Clicked");
    const currentInput = [...userInput];
    if (currentInput.length === 0) {
      console.log("No numbers to erase");
      return;
    } else {
      console.log(
        `Erase last number: ${currentInput[currentInput.length - 1]}`
      );
      currentInput.splice(currentInput.length - 1, 1);
      setUserInput(currentInput);
      handleTimerStates(currentInput);
      return;
    }
  };

  const resetTimer = () => {
    console.log("Reset Clicked");
    const currentInput = [...userInput];
    currentInput.length = 0;
    setUserInput(currentInput);
    handleTimerStates(currentInput);
  };

  const startTimer = () => {
    console.log("Start Clicked");
  };

  const pauseTimer = () => {
    console.log("Pause Clicked");
  };

  const handleTimerStates = (userInput) => {
    console.log("handleTimerStates running");
    if (userInput.length === 0) {
      setsecondsInput("00");
      setminutesInput("00");
      setHoursInput("00");

      return;
    } else if (userInput.length === 1) {
      setsecondsInput(`0${userInput[0].toString()}`);
      setminutesInput("00");
      setHoursInput("00");

      return;
    } else if (userInput.length === 2) {
      setsecondsInput(`${userInput[0].toString()}${userInput[1].toString()}`);
      setminutesInput("00");
      setHoursInput("00");

      return;
    } else if (userInput.length === 3) {
      setsecondsInput(`${userInput[1].toString()}${userInput[2].toString()}`);
      setminutesInput(`0${userInput[0].toString()}`);
      setHoursInput("00");

      return;
    } else if (userInput.length === 4) {
      setsecondsInput(`${userInput[2].toString()}${userInput[3].toString()}`);
      setminutesInput(`${userInput[0].toString()}${userInput[1].toString()}`);
      setHoursInput("00");

      return;
    } else if (userInput.length === 5) {
      setsecondsInput(`${userInput[3].toString()}${userInput[4].toString()}`);
      setminutesInput(`${userInput[1].toString()}${userInput[2].toString()}`);
      setHoursInput(`0${userInput[0].toString()}`);

      return;
    } else if (userInput.length === 6) {
      setsecondsInput(`${userInput[4].toString()}${userInput[5].toString()}`);
      setminutesInput(`${userInput[2].toString()}${userInput[3].toString()}`);
      setHoursInput(`${userInput[0].toString()}${userInput[1].toString()}`);

      return;
    } else {
      console.log("userInput greater than 6");
      setsecondsInput("00");
      setminutesInput("00");
      setHoursInput("00");
      setUserInput([]);
      return;
    }
  };

  // buttons for user to click, 0-9
  const numberedButtons = numbers.map((number) => {
    return (
      <div key={number} className="key">
        <span data-number={number} onClick={handleInputChange}>
          {number}
        </span>
      </div>
    );
  });

  return (
    <Fragment>
      <button>Timers</button>
      <div className="keypad">
        {numberedButtons}
        <div className="key">
          <div className="editButtonsDiv">
            <button className="backButton" onClick={undoLastTimerKey}>
              Back
            </button>{" "}
            <button className="resetButton" onClick={resetTimer}>
              Reset
            </button>
          </div>
        </div>
        <div className="key">
          <div className="startPauseButtonsDiv">
            <button className="startButton" onClick={startTimer}>
              Start
            </button>
            <button className="pauseButton" onClick={pauseTimer}>
              Pause
            </button>
          </div>
        </div>
      </div>
      <br />
      <br />
      {hoursInput} : {minutesInput} : {secondsInput}
    </Fragment>
  );
};

export default Timers;
