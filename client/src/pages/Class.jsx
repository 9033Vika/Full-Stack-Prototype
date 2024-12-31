import React, { useEffect } from "react";
import "../styles/courses.css";
import CoursesCard from "../components/CoursesCard";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import addFileImage from "../constants/addFileImage.png";
import { useParams } from "react-router-dom";
import { getCourses } from "../axios/courses";
import { setIsAddFile } from "../redux/reducers/misc";
import InputForm from "../components/InputForm";
import ConfirmationBox from "../components/ConfirmationBox";
import { server } from "../constants/MISC";

const Class = () => {
  const dispatch = useDispatch();
  const param = useParams();

  const { user, authLoader } = useSelector((state) => state.auth);
  const { courses, coursesLoader } = useSelector((state) => state.courses);
  const { isAddFile, isDeleteFile } = useSelector((state) => state.misc);

  useEffect(() => {
    getCourses(
      dispatch,
      `${server}class/getCourse/${param.id}`
    );
  }, [dispatch]);

  return authLoader || coursesLoader ? (
    <Loader />
  ) : (
    <>
      <div className="CoursesParent">
        <h1 className="courcesHeader">Course</h1>
        <div className="courcesCards">
          <div className="coursesCard">
            {courses.map(({ _id, courseName }, i) => (
              <CoursesCard
                key={i}
                name={courseName}
                user={user}
                id={_id}
                type={"course"}
              />
            ))}
            {user?.isAdmin ? (
              <div
                className="coursesCard-card"
                onClick={() => dispatch(setIsAddFile(true))}
              >
                <div className="coursesCard-card__image-container">
                  <img className="coursesCard-image" src={addFileImage} />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {isAddFile && <InputForm type={"course"} id={param.id} />}
      {isDeleteFile?.status ? (
        <ConfirmationBox type={"course"} id={param.id} />
      ) : null}
    </>
  );
};

export default Class;
