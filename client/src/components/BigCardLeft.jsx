import React from "react";
import "../styles/bigCards.css";

const BigCardLeft = ({
  image,
  name,
  qualification,
  experience,
  subject,
  line,
}) => {
  return (
    <div className="responsive-container-block bigContainer">
      <div className="responsive-container-block Container">
        <img
          className="mainImg"
          src={
            image
              ? image
              : "https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/eaboutus1.svg"
          }
        />
        <div className="allText aboveText">
          <p className="text-blk headingText">{name ? name : "Name"}</p>
          <p className="text-blk subHeadingText">{subject}</p>
          {experience && (
            <p className="text-blk subHeadingText">{experience}</p>
          )}
          <p className="text-blk subHeadingText">
            {qualification ? qualification : "Qualification"}
          </p>
          <p className="text-blk description">{line ? line : "Line"}</p>
        </div>
      </div>
    </div>
  );
};

export default BigCardLeft;
