import axios from "axios";
import { cartDoesNotExist, cartExists } from "../redux/reducers/cart";
import { paymentDoesNotExist, paymentExists } from "../redux/reducers/payment";

export const addToCart = async (url, id) => {
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

export const getCart = async (dispatch, url) => {
  await axios
    .get(url, { withCredentials: true })
    .then((res) => {
      dispatch(cartExists(res.data.records));
    })
    .catch((err) => {
      dispatch(cartDoesNotExist()), console.log(err);
    });
};

export const removeFromCart = async (url, id) => {
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

export const changeQuantity = async (url, id, op) => {
  return await axios
    .post(
      url,
      { subjectId: id, op: op },
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

export const checkout = async (url, total) => {
  return await axios
    .post(
      url,
      { total: total },
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

export const getKey = async (url) => {
  return await axios
    .get(url, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const getPayment = async (dispatch, url) => {
  return await axios
    .get(url, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      dispatch(paymentExists(res.data.records));
    })
    .catch((err) => {
      dispatch(paymentDoesNotExist()), console.log(err);
    });
};
