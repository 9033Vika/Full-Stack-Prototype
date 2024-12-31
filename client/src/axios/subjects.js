import axios from "axios";
import {
  subjectsDoesNotExists,
  subjectsExists,
} from "../redux/reducers/subjects";

export const getSubjects = async (dispatch, url) => {
  await axios
    .get(`${url}`, { withCredentials: true })
    .then((res) => {
      dispatch(subjectsExists(res.data.records));
    })
    .catch((err) => {
      dispatch(subjectsDoesNotExists()), console.log(err);
    });
};

export const addSubject = async (url, name, price) => {
  return await axios
    .post(
      url,
      { subjectName: name, price: price },
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

export const deleteSubject = async (url, id) => {
  return await axios
    .post(
      url,
      { subjectId: id },
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
