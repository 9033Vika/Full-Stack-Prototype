import React from "react";
import { Link, useParams } from "react-router-dom";

const PaymentResult = () => {
  const params = useParams();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
      }}
    >
      <h1>Your payment id is :- {params.id}</h1>
      <Link to={"/profile"}>Click here to go back to profile</Link>
    </div>
  );
};

export default PaymentResult;
