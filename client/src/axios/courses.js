import axios from "axios";
import { coursesDoesNotExist, coursesExists } from "../redux/reducers/courses";

export const getCourses = async (dispatch, url) => {
  await axios
    .get(`${url}`, { withCredentials: true })
    .then((res) => {
      dispatch(coursesExists(res.data.records));
    })
    .catch((err) => {
      dispatch(coursesDoesNotExist()), console.log(err);
    });
};

export const addCourse = async (url, name) => {
  return await axios
    .post(
      url,
      { courseName: name },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const deleteCourse = async (url, id) => {
  return await axios
    .post(
      url,
      { courseId: id },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
