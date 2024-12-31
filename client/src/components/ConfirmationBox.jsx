import React from "react";
import "../styles/form.css";
import { useDispatch, useSelector } from "react-redux";
import { setIsDeleteFile } from "../redux/reducers/misc";
import { deleteClass, getClasses } from "../axios/classes";
import { toast } from "react-hot-toast";
import { deleteCourse, getCourses } from "../axios/courses";
import { deleteSubject, getSubjects } from "../axios/subjects";
import { deleteNote, getNotes } from "../axios/notes";
import { server } from "../constants/MISC";

const ConfirmationBox = ({ type, id }) => {
  const dispatch = useDispatch();

  const { isDeleteFile } = useSelector((state) => state.misc);

  const confirmationHandler = async () => {
    let response;
    const toastId = toast.loading(`Deleting ${type}...`);
    if (type == "class") {
      response = await deleteClass(
        `${server}courses/deleteClass`,
        isDeleteFile?.fileId
      );
    } else if (type == "course") {
      response = await deleteCourse(
        `${server}class/deleteCourse/${id}`,
        isDeleteFile?.fileId
      );
    } else if (type == "subject") {
      response = await deleteSubject(
        `${server}course/deleteSubject/${id}`,
        isDeleteFile?.fileId
      );
    } else if (type == "chapter") {
      response = await deleteNote(
        `${server}note/deleteNote/${id}`,
        isDeleteFile?.fileId
      );
    }

    if (response.success) {
      toast.success(response.message, {
        id: toastId,
      });
    } else {
      toast.error(response.message, {
        id: toastId,
      });
    }

    if (type == "class") {
      await getClasses(dispatch, `${server}courses/getClass`);
    } else if (type == "course") {
      await getCourses(dispatch, `${server}class/getCourse/${id}`);
    } else if (type == "subject") {
      await getSubjects(dispatch, `${server}course/getSubject/${id}`);
    } else if (type == "chapter") {
      await getNotes(dispatch, `${server}note/getNote/${id}`);
    }

    dispatch(setIsDeleteFile({ status: false, fileId: null }));
  };

  return (
    <>
      <div className="formContainer">
        <div className="form">
          <div className="title" style={{ fontSize: "1.5rem" }}>
            Do you really want to delete this {type}?
          </div>
          <div className="buttons">
            <button
              type="submit"
              className="submit"
              onClick={confirmationHandler}
            >
              submit
            </button>
            <button
              type="button"
              className="submit"
              onClick={() =>
                dispatch(setIsDeleteFile({ status: false, fileId: null }))
              }
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationBox;
