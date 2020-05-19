import React, { Fragment } from "react";

const ConfirmationBox = (props) => {
  return (
    <Fragment>
      <p>Are you sure?</p>
      <p onClick={props.yes}>Yes</p>
      <p onClick={props.no}>No</p>
    </Fragment>
  );
};

export default ConfirmationBox;
