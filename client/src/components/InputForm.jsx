import React, { useState } from "react";
import "../styles/form.css";
import { useDispatch } from "react-redux";
import { setIsAddFile } from "../redux/reducers/misc";
import { addClass, getClasses } from "../axios/classes";
import { toast } from "react-hot-toast";
import { addCourse, getCourses } from "../axios/courses";
import { addSubject, getSubjects } from "../axios/subjects";
import { addNote, getNotes } from "../axios/notes";
import { server } from "../constants/MISC";

const InputForm = ({ type, id }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(500);

  const addFile = async () => {
    let response;
    const toastId = toast.loading(`Adding ${type}...`);

    if (type == "class") {
      response = await addClass(`${server}courses/addClass`, name);
    } else if (type == "course") {
      response = await addCourse(`${server}class/addCourse/${id}`, name);
    } else if (type == "subject") {
      response = await addSubject(
        `${server}course/addSubject/${id}`,
        name,
        price
      );
    } else if (type == "chapter") {
      response = await addNote(`${server}note/addNote/${id}`, name);
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
      getClasses(dispatch, `${server}courses/getClass`);
    } else if (type == "course") {
      getCourses(dispatch, `${server}class/getCourse/${id}`);
    } else if (type == "subject") {
      getSubjects(dispatch, `${server}course/getSubject/${id}`);
    } else if (type == "chapter") {
      getNotes(dispatch, `${server}note/getNote/${id}`);
    }

    dispatch(setIsAddFile(false));
    setName("");
  };

  return (
    <>
      <div className="formContainer">
        <div className="form">
          <div className="title">Add {type}</div>
          <div className="input-container">
            <input
              id="firstname"
              className="formInput"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {type === "subject" ? (
            <>
              <br />
              <div className="input-container">
                <input
                  id="firstname"
                  className="formInput"
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </>
          ) : null}
          <div className="buttons">
            <button type="submit" className="submit" onClick={addFile}>
              submit
            </button>
            <button
              type="button"
              className="submit"
              onClick={() => dispatch(setIsAddFile(false))}
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InputForm;
