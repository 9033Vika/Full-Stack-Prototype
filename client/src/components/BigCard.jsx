import React, { useEffect, useState } from "react";
import "../styles/bigCard.css";
import image from "../constants/banner.png";

const BigCard = () => {
  return <img className="banner" src={image} alt="banner"></img>;
};

export default BigCard;
