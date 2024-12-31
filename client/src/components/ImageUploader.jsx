import React, { useState } from "react";
import "../styles/imageUploader.css";
import { useDispatch } from "react-redux";
import { setIsAddImage, setIsShowImage } from "../redux/reducers/misc";
import "../styles/form.css";
import { addImagesToFolder } from "../axios/notes";
import toast from "react-hot-toast";
import { server } from "../constants/MISC";

const ImageUploader = ({ id }) => {
  const dispatch = useDispatch();

  const handleChange = async (event) => {
    const toastId = toast.loading("Adding Images...");

    const files = Array.from(event.target.files);

    if (files.length < 1) {
      toast.error("Insert atleast 1 Image", {
        id: toastId,
      });
      return;
    }

    const fd = new FormData();

    files.forEach((i) => {
      fd.append("files", i);
    });


    const url = `${server}note/addImages/${id}`;
    const res = await addImagesToFolder(url, fd);

    if (res.success) {
      toast.success(res.message, {
        id: toastId,
      });
    } else {
      toast.error(res.message, {
        id: toastId,
      });
    }

    dispatch(setIsAddImage(false));
    dispatch(setIsShowImage(false));
  };

  return (
    <>
      <div className="formContainer">
        <div className="form">
          <div className="input-container">
            <input
              id="firstname"
              className="formInput"
              multiple
              accept="image/png, image/jpeg"
              type="file"
              name="files"
              placeholder="Image"
              onChange={handleChange}
            />
          </div>
          <div className="buttons">
            {/* <button type="submit" className="submit" onClick={addImageHandler}>
              submit
            </button> */}
            <button
              type="button"
              className="submit"
              onClick={() => dispatch(setIsAddImage(false))}
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageUploader;
