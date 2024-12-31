import React from "react";
import "../styles/coursesCard.css";
import folder from "../constants/Folder.png";
import { useDispatch } from "react-redux";
import { setIsDeleteFile, setIsShowImage } from "../redux/reducers/misc";
import toast from "react-hot-toast";

const NoteCard = ({ user, name, id, images = [], openedChapter, index }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    if (index || user?.isAdmin) {
      dispatch(setIsShowImage(true));
      openedChapter(id, images, name);
    } else {
      toast.error("This is not free");
    }
  };

  return (
    <>
      <div className="coursesCard-card">
        <div
          className="coursesCard-card__image-container"
          onClick={handleClick}
        >
          <img className="coursesCard-image" src={folder} />
        </div>
        <div className="coursesCard-card__content">
          <p className="coursesCard-card__title coursesCard-text--medium">
            {name}
          </p>
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

export default NoteCard;
