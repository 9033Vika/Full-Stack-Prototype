import React from "react";
import "../styles/cart.css";
import { useDispatch } from "react-redux";
import { changeQuantity, getCart, removeFromCart } from "../axios/cart";
import toast from "react-hot-toast";
import { getProfile } from "../axios/user";
import { server } from "../constants/MISC";

const CartCard = ({ quantity, product }) => {
  const dispatch = useDispatch();

  const changeQuantityHandler = async (op) => {
    let toastId;

    if (op == 1) {
      toastId = toast.loading(`Incrementing...`);
    } else {
      toastId = toast.loading(`Decrementing...`);
    }

    const response = await changeQuantity(
      `${server}cart/changeQuantity`,
      product._id,
      op
    );

    if (response.success) {
      toast.success(response.message, {
        id: toastId,
      });
    } else {
      toast.error(response.message, {
        id: toastId,
      });
    }

    getProfile(dispatch, `${server}user/profile`);
    getCart(dispatch, `${server}cart/getCartProducts`);
  };

  const removeHandler = async () => {
    const toastId = toast.loading(`Removing...`);

    const response = await removeFromCart(
      `${server}cart/removeFromCart`,
      product._id
    );

    if (response.success) {
      toast.success(response.message, {
        id: toastId,
      });
    } else {
      toast.error(response.message, {
        id: toastId,
      });
    }

    getProfile(dispatch, `${server}user/profile`);
    getCart(dispatch, `${server}cart/getCartProducts`);
  };
  return (
    <div className="cartCard">
      <div className="cartCardUpperBox">
        <h2 className="cartCardName">{product.subjectName}</h2>
        <div className="cartCardButtonBox">
          <button
            className="cartCardNegButton"
            onClick={() => changeQuantityHandler(2)}
          >
            -
          </button>
          <button className="cartCardCntButton">{quantity}</button>
          <button
            className="cartCardPosButton"
            onClick={() => changeQuantityHandler(1)}
          >
            +
          </button>
        </div>
      </div>
      <div className="cartCardLowerBox">
        <h2 className="cartCardPrice">{product.price}rs</h2>
        <button className="cartCardRemoveButton" onClick={removeHandler}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartCard;
