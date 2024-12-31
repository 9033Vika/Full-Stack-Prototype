import axios from "axios";
import { classesDoesNotExist, classesExists } from "../redux/reducers/classes";

export const getClasses = async (dispatch, url) => {
  await axios
    .get(url, { withCredentials: true })
    .then((res) => {
      dispatch(classesExists(res.data.classes));
    })
    .catch((err) => {
      dispatch(classesDoesNotExist()), console.log(err);
    });
};

export const addClass = async (url, name) => {
  return await axios
    .post(
      url,
      { className: name },
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

export const deleteClass = async (url, id) => {
  return await axios
    .post(
      url,
      { classId: id },
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
