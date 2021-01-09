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

    // if timer is running, check the time
    if (isRunning) {
      // if there are seconds
      if (secondsInput !== "00") {
        // reduce seconds by 1 / second
        const id = window.setInterval(() => {
          console.log("tick");
          setSecondsInput((secondsInput) => {
            const nextSecond = (parseInt(secondsInput) - 1).toString();

            if (nextSecond.length < 2) {
              return `0${nextSecond}`;
            } else if (nextSecond.length === 2) {
              return nextSecond;
            }
          });
        }, 1000);
        return () => window.clearInterval(id);

        // if seconds is 0
      } else if (secondsInput === "00") {
        // if there are minutes
        if (minutesInput !== "00") {
          // reduce minutes by 1
          setMinutesInput((minutesInput) => {
            const nextMinute = (parseInt(minutesInput) - 1).toString();
            if (nextMinute.length < 2) {
              return `0${nextMinute}`;
            } else if (nextMinute.length === 2) {
              return nextMinute;
            }
          });
          // set seconds to 59
          setSecondsInput(59);

          // if minutes is 0
        } else if (minutesInput === "00") {
          // reduce hours by 1
          setHoursInput((hoursInput) => {
            const nextHour = (parseInt(hoursInput) - 1).toString();
            if (nextHour.length < 2) {
              return `0${nextHour}`;
            } else if (nextHour.length === 2) {
              return nextHour;
            }
          });
          // set minutes and seconds to 59
          setMinutesInput(59);
          setSecondsInput(59);
        }
      }
    }
    return;
  }, [hoursInput, minutesInput, secondsInput, isRunning]);

  // This effect checks for timer hitting 0 while running (00:00:00)
  // When running and the timer hits 0, set isRunning, isInProcessOfRunning to false
  // set userInput and hours/minutes/secondsInput to pre-timer values
  useEffect(() => {
    if (isRunning) {
      console.log("Run this effect on timeInput change while timer running");
      console.log("minutesInput", minutesInput);
      console.log("secondsInput", secondsInput);
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
        toggleTimerModuleAlert();
      }
      return;
    }
    return;
  }, [userInput, hoursInput, minutesInput, secondsInput, isRunning]);

  const toggleTimerModule = () => {
    document.getElementById("timerModule").classList.toggle("display-none");
  };

  const toggleTimerModuleAlert = () => {
    document
      .getElementById("timerModuleAlert")
      .classList.toggle("display-none");
  };

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  const handleInputChange = (e) => {
    console.log(e.target);
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
    console.log(
      "handleTimerStates running (userInput (array of numbers) converted to timeInputs (state strings hh, mm, ss)"
    );
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
      <div
        key={number}
        className="key text-align-center"
        data-number={number}
        onClick={handleInputChange}
      >
        {number}
      </div>
    );
  });

  return (
    <Fragment>
      <button className="btn-orange" onClick={() => toggleTimerModule()}>
        Timers
      </button>
      <div id="timerModule" className="blur display-none">
        <div className="timer-module bg-muted-dark">
          <div
            id="timerModuleAlert"
            className="display-none timer-module-alert padtop2 padbot2"
          >
            <h2 className="text-muted-dark text-align-center">
              Timer Finished
            </h2>
            <div
              className="btn-close text-align-center"
              onClick={() => toggleTimerModuleAlert()}
            >
              <span>Dismiss</span>
            </div>
          </div>
          <div className="keypad">
            {/* if timer is running, empty div, else show the numbered buttons (0-9) */}
            {isInProcessOfRunning ? (
              <div></div>
            ) : (
              <div className="display-flex flex-wrap">
                {numberedButtons}{" "}
                {/* if timer isn't in the process of running and user has entered a number, show the back button */}
                {!isInProcessOfRunning && userInput.length > 0 ? (
                  <div
                    className="key text-align-center"
                    onClick={undoLastTimerKey}
                  >
                    <span>Back</span>
                  </div>
                ) : (
                  <div className="key">
                    <span></span>
                  </div>
                )}
                <div className="key text-align-center" onClick={resetTimer}>
                  <span>Reset</span>
                </div>
              </div>
            )}

            {/* if timer is running, show the pause button, else the start button */}
            {isRunning ? (
              <div
                className="btn-start btn-orange text-align-center"
                onClick={pauseTimer}
              >
                <span>Pause</span>
              </div>
            ) : (
              <div
                className="btn-pause btn-orange text-align-center"
                onClick={startTimer}
              >
                <span>Start</span>
              </div>
            )}

            {/* if timer is in process of running, show the reset button */}
            {isInProcessOfRunning ? (
              <div
                className="btn-reset btn-dark text-align-center"
                onClick={resetTimer}
              >
                <span>Reset</span>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="timer padtop1 padbot1 text-align-center">
            {hoursInput} : {minutesInput} : {secondsInput}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Timers;
