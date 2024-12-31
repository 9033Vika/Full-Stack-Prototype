import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/courceCard.css";

const CourseCard = ({ name, image, teachers }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="CCcard"
        onClick={() =>
          navigate("/detail", {
            state: teachers,
          })
        }
      >
        <div className="CCcard__image-container">
          <img
            className="CCimage"
            src={
              image
                ? image
                : "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=80"
            }
          />
        </div>
        <div className="CCcard__content">
          <p className="CCcard__title text--medium">{name}</p>
          {/* <div className="CCcard__info">
            <p className="CCtext--medium">30 Min</p>
            <p className="CCcard__price text--medium">Free</p>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default CourseCard;
