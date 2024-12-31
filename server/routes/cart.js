import express from "express";
import { isAuthenticated } from "../middleware/authenticated.js";
import {
  addToCart,
  changeQuantity,
  checkout,
  getCartProducts,
  getKey,
  getPayments,
  removeFromCart,
  verify,
} from "../controller/cart.js";

const router = express.Router();

router.use(isAuthenticated);

router.post("/addToCart", addToCart);
router.post("/removeFromCart", removeFromCart);
router.post("/changeQuantity", changeQuantity);
router.get("/getCartProducts", getCartProducts);
router.post("/checkout", checkout);
router.post("/verify", verify);
router.get("/getKey", getKey);
router.get("/getPayment", getPayments);

export default router;
