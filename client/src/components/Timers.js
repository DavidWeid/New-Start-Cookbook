import React, { Fragment, useState } from "react";

const Timers = () => {
  const [timers, setTimers] = useState([
    {
      startTime: 0,
      isPaused: true,
      remainingTime: 0,
    },
  ]);

  const [desiredTime, setDesiredTime] = useState([
    {
      number: undefined,
      timeType: "",
    },
  ]);

  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  // set user's desiredTime: up to 6 numbers, not starting with 0
  const handleInputChange = (e) => {
    const updatedDesiredTime = [...desiredTime];
    const input = parseInt(e.target.dataset.number);

    if (updatedDesiredTime[0].number === undefined && input === 0) {
      return;
    } else if (updatedDesiredTime.length === 6) {
      return;
    } else if (updatedDesiredTime[0].number === undefined && input !== 0) {
      updatedDesiredTime[0] = { number: input, timeType: "s" };
      setDesiredTime(updatedDesiredTime);
    } else if (updatedDesiredTime.length < 2) {
      updatedDesiredTime.push({ number: input, timeType: "s" });
      setDesiredTime(updatedDesiredTime);
    } else if (updatedDesiredTime.length >= 2) {

      
      updatedDesiredTime[0].timeType = "m";
      updatedDesiredTime.push({ number: input, timeType: "s" });
      setDesiredTime(updatedDesiredTime);


    }
  };

  // buttons for user to click, 0-9
  const numberedButtons = numbers.map((number) => {
    return (
      <div key={number}>
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
      {numberedButtons}
      {displayedTime}
    </Fragment>
  );
};

export default Timers;
