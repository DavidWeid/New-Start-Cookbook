import React, { Fragment, useState, useEffect } from "react";
import "./assets/css/timer.css";

const Timers = () => {
  const [hoursInput, setHoursInput] = useState("00");
  const [minutesInput, setMinutesInput] = useState("00");
  const [secondsInput, setSecondsInput] = useState("00");
  const [userInput, setUserInput] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isInProcessOfRunning, setIsInProcessOfRunning] = useState(false);

  useEffect(() => {
    console.log("isRunning", isRunning);

    if (isRunning) {
      const id = window.setInterval(() => {
        console.log("tick");
        setSecondsInput((secondsInput) => {
          const nextSecond = (parseInt(secondsInput) - 1).toString();
          if (nextSecond.length < 2) {
            return `0${(parseInt(secondsInput) - 1).toString()}`;
          } else if (nextSecond.length === 2) {
            return (parseInt(secondsInput) - 1).toString();
          }
        });
      }, 1000);
      return () => window.clearInterval(id);
    }
    return;
  }, [isRunning]);

  // This effect checks for timer hitting 0 while running
  // When running and the timer hits 0, set isRunning, isInProcessOfRunning to false
  // set userInput and hours/minutes/secondsInput to pre-timer values
  useEffect(() => {
    if (isRunning) {
      console.log("Run this effect on secondsInput while timer running change");
      console.log("secondsInput", secondsInput);
      console.log("userInput", userInput);
      if (
        hoursInput === "00" &&
        minutesInput === "00" &&
        secondsInput === "00"
      ) {
        console.log(
          "hours, minutes, seconds should be 00",
          hoursInput,
          minutesInput,
          secondsInput
        );
        setIsRunning(false);
        setIsInProcessOfRunning(false);
        setUserInput(userInput);
        handleTimerStates(userInput);
      }
      return;
    }
    return;
  }, [userInput, hoursInput, minutesInput, secondsInput, isRunning]);

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
    setIsRunning(false);
    setIsInProcessOfRunning(false);
  };

  const startTimer = () => {
    console.log("Start Clicked");
    console.log(`${hoursInput}:${minutesInput}:${secondsInput}`);
    setIsRunning(true);
    setIsInProcessOfRunning(true);
  };

  const pauseTimer = () => {
    console.log("Pause Clicked");
    console.log(`${hoursInput}:${minutesInput}:${secondsInput}`);
    setIsRunning(false);
  };

  const handleTimerStates = (userInput) => {
    console.log("handleTimerStates running");
    if (userInput.length === 0) {
      setSecondsInput("00");
      setMinutesInput("00");
      setHoursInput("00");

      return;
    } else if (userInput.length === 1) {
      setSecondsInput(`0${userInput[0].toString()}`);
      setMinutesInput("00");
      setHoursInput("00");

      return;
    } else if (userInput.length === 2) {
      setSecondsInput(`${userInput[0].toString()}${userInput[1].toString()}`);
      setMinutesInput("00");
      setHoursInput("00");

      return;
    } else if (userInput.length === 3) {
      setSecondsInput(`${userInput[1].toString()}${userInput[2].toString()}`);
      setMinutesInput(`0${userInput[0].toString()}`);
      setHoursInput("00");

      return;
    } else if (userInput.length === 4) {
      setSecondsInput(`${userInput[2].toString()}${userInput[3].toString()}`);
      setMinutesInput(`${userInput[0].toString()}${userInput[1].toString()}`);
      setHoursInput("00");

      return;
    } else if (userInput.length === 5) {
      setSecondsInput(`${userInput[3].toString()}${userInput[4].toString()}`);
      setMinutesInput(`${userInput[1].toString()}${userInput[2].toString()}`);
      setHoursInput(`0${userInput[0].toString()}`);

      return;
    } else if (userInput.length === 6) {
      setSecondsInput(`${userInput[4].toString()}${userInput[5].toString()}`);
      setMinutesInput(`${userInput[2].toString()}${userInput[3].toString()}`);
      setHoursInput(`${userInput[0].toString()}${userInput[1].toString()}`);

      return;
    } else {
      console.log("userInput greater than 6");
      setSecondsInput("00");
      setMinutesInput("00");
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
        {isInProcessOfRunning ? <div></div> : <div>{numberedButtons}</div>}

        <div className="key">
          <div className="editButtonsDiv">
            {!isInProcessOfRunning && userInput.length > 0 ? (
              <button className="backButton" onClick={undoLastTimerKey}>
                Back
              </button>
            ) : (
              <div className="noButton"></div>
            )}
            <button className="resetButton" onClick={resetTimer}>
              Reset
            </button>
          </div>
        </div>
        <div className="key">
          <div className="startPauseButtonsDiv">
            {isRunning ? (
              <button className="startButton" onClick={pauseTimer}>
                Pause
              </button>
            ) : (
              <button className="pauseButton" onClick={startTimer}>
                Start
              </button>
            )}
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
