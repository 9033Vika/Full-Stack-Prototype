import React from "react";
import "../styles/counter.css";

const Counter = () => {
  return (
    <>
      <div className="counter-container">
        <div className="counter">4</div>
        <span className="counterText">Branches</span>
      </div>
      <div className="counter-container">
        <div className="counter">1278</div>
        <span className="counterText">Students</span>
      </div>
      <div className="counter-container">
        <div className="counter">27</div>
        <span className="counterText">Teachers</span>
      </div>
    </>
  );
};

export default Counter;
