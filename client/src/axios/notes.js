import axios from "axios";
import { notesDoesNotExist, notesExists } from "../redux/reducers/notes";

export const getNotes = async (dispatch, url) => {
  try {
    axios
      .get(`${url}`, { withCredentials: true })
      .then((res) => {
        dispatch(notesExists(res.data.records));
      })
      .catch((err) => {
        dispatch(notesDoesNotExist()), console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};

export const addNote = async (url, name) => {
  return await axios
    .post(
      url,
      { chapter: name },
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

export const deleteNote = async (url, id) => {
  return await axios
    .post(
      url,
      { noteId: id },
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

export const addImagesToFolder = async (url, files) => {
  return await axios
    .post(url, files, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err.response.data;
    });
};
