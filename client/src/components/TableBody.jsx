import React from "react";
import "../styles/history.css";

const TableBody = ({ id, cart, date }) => {
  let price = 0;
  let name = "";

  cart.map(({ quantity, product }) => {
    name += product.subjectName + " ";
    price += quantity * product.price;
  });

  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{id}</td>
        <td>{price}</td>
        <td>{date}</td>
      </tr>
    </>
  );
};

export default TableBody;
