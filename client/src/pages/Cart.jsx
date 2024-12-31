import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkout, getCart, getKey } from "../axios/cart";
import CartCard from "../components/CartCard";
import { server } from "../constants/MISC";
import "../styles/cart.css";

const Cart = () => {
  const dispatch = useDispatch();

  const { user, loader } = useSelector((state) => state.auth);
  const { cart, cartLoader } = useSelector((state) => state.cart);
  const [totalVal, setTotalVal] = useState(0);

  const confirmPaymentHandler = async () => {
    const key = await getKey(`${server}cart/getKey`);

    const { order } = await checkout(`${server}cart/checkout`, totalVal);

    const options = {
      key: key,
      amount: order.amount,
      currency: "INR",
      name: "V++",
      description: "Test Transaction",
      image: "V++",
      order_id: order.id,
      callback_url: `${server}cart/verify`,
      prefill: {
        name: user.name,
        email: user.email,
      },
      notes: {
        address: "papa raj",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  useEffect(() => {
    let val = 0;
    cart.map(({ product, quantity }) => {
      val += product.price * quantity;
    });
    setTotalVal(val);
  }, [cart]);

  useEffect(() => {
    getCart(dispatch, `${server}cart/getCartProducts`);
  }, [dispatch]);
  return !loader || !cartLoader ? (
    <>
      <div className="cartCardBox">
        {cart.map(({ product, quantity }, i) => {
          return <CartCard key={i} quantity={quantity} product={product} />;
        })}
      </div>

      <div className="cartButtonBox">
        {totalVal ? (
          <button className="paymentButton" onClick={confirmPaymentHandler}>
            Click Here For Payment Of {totalVal}
          </button>
        ) : (
          <h1 className="paymentHeader">No Products Yet</h1>
        )}
      </div>
    </>
  ) : null;
};

export default Cart;
