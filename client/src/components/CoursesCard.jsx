import React from "react";
import "../styles/coursesCard.css";
import folder from "../constants/Folder.png";
import { useDispatch } from "react-redux";
import { setIsDeleteFile } from "../redux/reducers/misc";

const CoursesCard = ({ name, user, id, type, price, status }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="coursesCard-card">
        <a
          href={`/${type}/${id}`}
          className="coursesCard-card__image-container"
        >
          <img className="coursesCard-image" src={folder} />
        </a>
        <div className="coursesCard-card__content">
          <p className="coursesCard-card__title coursesCard-text--medium">
            {name}
          </p>
          {!status && type === "subject" && !user?.isAdmin ? (
            <button className="CoursesButton">{price}rs</button>
          ) : null}
          {user?.isAdmin ? (
            <button
              className="CoursesButton"
              onClick={() =>
                dispatch(setIsDeleteFile({ status: true, fileId: id }))
              }
            >
              Delete
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default CoursesCard;
