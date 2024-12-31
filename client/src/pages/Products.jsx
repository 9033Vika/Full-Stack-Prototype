import React, { useEffect } from "react";
import "../styles/courses.css";
import CoursesCard from "../components/CoursesCard";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import addFileImage from "../constants/addFileImage.png";
import { getClasses } from "../axios/classes";
import InputForm from "../components/InputForm";
import { setIsAddFile } from "../redux/reducers/misc";
import ConfirmationBox from "../components/ConfirmationBox";
import { server } from "../constants/MISC";

const Products = () => {
  const dispatch = useDispatch();

  const { user, authLoader } = useSelector((state) => state.auth);
  const { classes, classesLoader } = useSelector((state) => state.classes);
  const { isAddFile, isDeleteFile } = useSelector((state) => state.misc);

  useEffect(() => {
    getClasses(dispatch, `${server}courses/getClass`);
  }, [dispatch]);

  return authLoader || classesLoader ? (
    <Loader />
  ) : (
    <>
      <div className="CoursesParent">
        <h1 className="courcesHeader">Classes</h1>
        <div className="courcesCards">
          <div className="coursesCard">
            {classes.map(({ _id, className }, i) => (
              <CoursesCard
                key={i}
                name={className}
                user={user}
                id={_id}
                type={"class"}
              />
            ))}
            {user && user.isAdmin ? (
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
      {isAddFile ? <InputForm type={"class"} /> : null}
      {isDeleteFile?.status ? <ConfirmationBox type={"class"} /> : null}
    </>
  );
};

export default Products;
