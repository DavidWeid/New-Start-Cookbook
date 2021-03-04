import React from "react";
import "./assets/css/confirmationBox.css";

const ConfirmationBox = (props) => {
  return (
    <div className="blur">
      <div className="confirmation-box on-top padding1 card-shadow rounded">
        <div className="text-align-center padding1">
          <p>Delete recipe forever?</p>
          <div className="display-flex">
            <button className="btn-muted-light rounded" onClick={props.yes}>
              Yes
            </button>
            <div className="padsideshalf"></div>
            <button className="btn-orange rounded" onClick={props.no}>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationBox;
