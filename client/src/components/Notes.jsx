import React from "react";
import "../styles/notes.css";
import ImageUploader from "./ImageUploader";
import image from "../constants/addFileImage.png";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddImage, setIsShowImage } from "../redux/reducers/misc";

const Notes = ({ user, images = [], id, name }) => {
  const dispatch = useDispatch();

  const { isAddImage } = useSelector((state) => state.misc);

  return (
    <>
      {isAddImage && <ImageUploader id={id} />}
      <button className="back" onClick={() => dispatch(setIsShowImage(false))}>
        Back
      </button>
      <div className="imagesContainer">
        {images.length > 0 &&
          images.map(({ url }, i) => (
            <div className="imageContainer" key={i}>
              <img src={url} alt="" className="noteImage" />
            </div>
          ))}
        {user?.isAdmin ? (
          <div
            onClick={() => dispatch(setIsAddImage(true))}
            style={{ cursor: "pointer" }}
          >
            <img src={image} alt="" className="noteImage" />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Notes;
