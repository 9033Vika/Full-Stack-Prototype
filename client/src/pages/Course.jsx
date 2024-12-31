import React, { useEffect } from "react";
import "../styles/courses.css";
import CoursesCard from "../components/CoursesCard";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import { getSubjects } from "../axios/subjects";
import InputForm from "../components/InputForm";
import addFileImage from "../constants/addFileImage.png";
import { setIsAddFile } from "../redux/reducers/misc";
import ConfirmationBox from "../components/ConfirmationBox";
import { server } from "../constants/MISC";

const Course = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { user, authLoader } = useSelector((state) => state.auth);
  const { subjects, subjectsLoader } = useSelector((state) => state.subjects);
  const { isAddFile, isDeleteFile } = useSelector((state) => state.misc);

  useEffect(() => {
    getSubjects(
      dispatch,
      `${server}course/getSubject/${params.id}`
    );
  }, [dispatch]);

  return authLoader || subjectsLoader ? (
    <Loader />
  ) : (
    <>
      <div className="CoursesParent">
        <h1 className="courcesHeader">subjects</h1>
        <div className="courcesCards">
          <div className="coursesCard">
            {subjects.map(({ _id, subjectName, price }, i) => (
              <CoursesCard
                key={i}
                name={subjectName}
                user={user}
                id={_id}
                type={"subject"}
                price={price}
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
      {isAddFile && <InputForm type={"subject"} id={params.id} />}
      {isDeleteFile?.status ? (
        <ConfirmationBox type={"subject"} id={params.id} />
      ) : null}
    </>
  );
};

export default Course;
