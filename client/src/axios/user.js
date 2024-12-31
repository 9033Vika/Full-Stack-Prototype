import axios from "axios";
import { userDoesNotExist, userExists } from "../redux/reducers/auth";

export const getProfile = async (dispatch, url) => {
  try {
    await axios
      .get(url, { withCredentials: true })
      .then((res) => {
        dispatch(userExists(res.data.user));
      })
      .catch((err) => {
        dispatch(userDoesNotExist()), console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (dispatch, url, mail, password) => {
  return await axios
    .post(
      url,
      {
        email: mail,
        password: password,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      dispatch(userExists(res.data.user));
      return res.data;
    })
    .catch((err) => {
      dispatch(userDoesNotExist());
      return err;
    });
};

export const register = async (dispatch, url, name, mail, password) => {
  return await axios
    .post(
      url,
      {
        name: name,
        email: mail,
        password: password,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      dispatch(userExists(res.data.user));
      return res.data;
    })
    .catch((err) => {
      dispatch(userDoesNotExist());
      return err;
    });
};

export const logout = async (dispatch, url) => {
  return await axios
    .get(url, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(userDoesNotExist());
      return res.data;
    })
    .catch((err) => {
      dispatch(userExists(err));
      return err;
    });
};
