import React, { Fragment, useState, useRef } from "react";
import "./assets/css/timer.css";

const Timers = () => {
  const [desiredTime, setDesiredTime] = useState([
    {
      number: undefined,
      timeType: ""
    }
  ]);

  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  let interval = useRef();

  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  // set user's desiredTime: up to 6 numbers, not starting with 0
  // time has hours (h), minutes (m), and seconds (s) with 2 number slots available per time type
  const handleInputChange = (e) => {
    const updatedDesiredTime = [...desiredTime];
    const input = parseInt(e.target.dataset.number);

    if (updatedDesiredTime[0].number === undefined && input === 0) return;
    else if (updatedDesiredTime.length === 6) return;
    else if (updatedDesiredTime[0].number === undefined && input !== 0) {
      updatedDesiredTime[0] = { number: input, timeType: "s" };
      setDesiredTime(updatedDesiredTime);
    } else if (updatedDesiredTime.length < 2) {
      updatedDesiredTime.push({ number: input, timeType: "s" });
      setDesiredTime(updatedDesiredTime);
    } else if (updatedDesiredTime.length === 2) {
      updatedDesiredTime[0].timeType = "m";
      updatedDesiredTime.push({ number: input, timeType: "s" });
      setDesiredTime(updatedDesiredTime);
    } else if (updatedDesiredTime.length === 3) {
      updatedDesiredTime[1].timeType = "m";
      updatedDesiredTime.push({ number: input, timeType: "s" });
      setDesiredTime(updatedDesiredTime);
    } else if (updatedDesiredTime.length === 4) {
      updatedDesiredTime[0].timeType = "h";
      updatedDesiredTime[2].timeType = "m";
      updatedDesiredTime.push({ number: input, timeType: "s" });
      setDesiredTime(updatedDesiredTime);
    } else if (updatedDesiredTime.length === 5) {
      updatedDesiredTime[1].timeType = "h";
      updatedDesiredTime[3].timeType = "m";
      updatedDesiredTime.push({ number: input, timeType: "s" });
      setDesiredTime(updatedDesiredTime);
    }
  };

  // under last number entered
  const undoLastTimerKey = () => {
    const updatedDesiredTime = [...desiredTime];

    if (updatedDesiredTime[0].number === undefined) return;
    else if (updatedDesiredTime.length === 1) {
      setDesiredTime([{ number: undefined, timeType: "" }]);
    } else {
      updatedDesiredTime.pop();

      if (updatedDesiredTime.length === 1 || updatedDesiredTime.length === 2) {
        for (let i = 0; i < updatedDesiredTime.length; i++) {
          updatedDesiredTime[i].timeType = "s";
        }
        setDesiredTime(updatedDesiredTime);
      } else if (updatedDesiredTime.length === 3) {
        updatedDesiredTime[0].timeType = "m";
        updatedDesiredTime[1].timeType = "s";
        updatedDesiredTime[2].timeType = "s";
        setDesiredTime(updatedDesiredTime);
      } else if (updatedDesiredTime.length === 4) {
        updatedDesiredTime[0].timeType = "m";
        updatedDesiredTime[1].timeType = "m";
        updatedDesiredTime[2].timeType = "s";
        updatedDesiredTime[3].timeType = "s";
        setDesiredTime(updatedDesiredTime);
      } else if (updatedDesiredTime.length === 5) {
        updatedDesiredTime[0].timeType = "h";
        updatedDesiredTime[1].timeType = "m";
        updatedDesiredTime[2].timeType = "m";
        updatedDesiredTime[3].timeType = "s";
        updatedDesiredTime[4].timeType = "s";
        setDesiredTime(updatedDesiredTime);
      }
    }
  };

  // reset timer to 0
  const resetTimer = () => {
    const resetTime = [{ number: undefined, timeType: "" }];
    setDesiredTime(resetTime);
  };

  const startTimer = () => {
    const timeEntered = desiredTime;
    const target = 0;

    console.log(timeEntered); // [{ number: #, timeType: "h/m/s"}] up to length 6

    let hoursEntered;
    let minutesEntered;
    let secondsEntered = 0;

    // if (timeEntered[0].number === undefined) return;

    if (timeEntered.length < 3) {
      for (let i = 0; i < timeEntered.length; i++) {
        secondsEntered += timeEntered[i].number;
      }

      console.log(secondsEntered);
    }

    interval = setInterval(() => {
      const hours = 0;
      const minutes = 0;
      const seconds = secondsEntered;
      setTimerSeconds(seconds);
    }, 1000);
  };

  const pauseTimer = () => {};

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

  // display numbers user has clicked
  const displayedTime = desiredTime.map((number, idx) => {
    return (
      <span key={`number[${idx}]: ${number.number}`}>
        {number.number}
        {number.timeType}
      </span>
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
      {displayedTime}
      {timerHours}:{timerMinutes}:{timerSeconds}
    </Fragment>
  );
};

export default Timers;
