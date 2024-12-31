import userSchema from "../models/User.js";
import subjectSchema from "../models/Subject.js";
import paymentSchema from "../models/Payment.js";
import { instance } from "../index.js";
import crypto from "crypto";

export const addToCart = async (req, res) => {
  try {
    const user = await userSchema.findById(req.uid);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "You are not a valid User",
      });
    }

    const { subjectId } = req.body;

    if (!subjectId) {
      return res.status(400).json({
        success: false,
        message: "Provide an id",
      });
    }

    const subject = await subjectSchema.findById(subjectId);

    if (!subject) {
      return res.status(400).json({
        success: false,
        message: "Subject Not Found",
      });
    }

    let isExists = false;
    user.cart.map((i) => {
      if (i.product._id.toString() === subject._id.toString()) {
        isExists = true;
        i.quantity++;
      }
    });

    if (isExists) {
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Quantity Increased",
      });
    }

    user.cart.push({ quantity: 1, product: subjectId });
    await user.save();

    return res.status(201).json({
      success: true,
      message: "added to cart",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const user = await userSchema.findById(req.uid);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "You are not a valid User",
      });
    }

    const { subjectId } = req.body;

    if (!subjectId) {
      return res.status(400).json({
        success: false,
        message: "Provide an id",
      });
    }

    const subject = await subjectSchema.findById(subjectId);

    if (!subject) {
      return res.status(400).json({
        success: false,
        message: "Subject Not Found In DB",
      });
    }

    let isExists = false;
    const updatedArray = [];

    user.cart.map((i) => {
      if (i.product._id.toString() === subject._id.toString()) {
        isExists = true;
      } else {
        updatedArray.push(i);
      }
    });

    if (!isExists) {
      return res.status(400).json({
        success: false,
        message: "Subject Not Found In Cart",
      });
    }

    user.cart = updatedArray;
    await user.save();

    return res.status(201).json({
      success: true,
      message: "removed from cart",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const changeQuantity = async (req, res) => {
  try {
    const user = await userSchema.findById(req.uid);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "You are not a valid User",
      });
    }

    const { subjectId, op } = req.body;

    if (!subjectId) {
      return res.status(400).json({
        success: false,
        message: "Provide an id",
      });
    }

    if (!op) {
      return res.status(400).json({
        success: false,
        message: "Define Operation",
      });
    }

    const subject = await subjectSchema.findById(subjectId);

    if (!subject) {
      return res.status(400).json({
        success: false,
        message: "Subject Not Found In DB",
      });
    }

    let msg = op == 1 ? "Quantity Increased" : "Quantity Decreased";
    let isExists = false;
    let currQuan;
    let idx = -1;

    user.cart.map((i, curr) => {
      if (i.product._id.toString() === subject._id.toString()) {
        isExists = true;
        if (op == 1) {
          currQuan = i.quantity + 1;
        } else {
          currQuan = i.quantity - 1;
        }
        idx = curr;
      }
    });

    if (!isExists) {
      return res.status(400).json({
        success: true,
        message: "Product Not Found",
      });
    }

    if (currQuan == 0) {
      user.cart.splice(idx, 1);
      msg = "Product Removed";
    } else {
      op === 1 ? user.cart[idx].quantity++ : user.cart[idx].quantity--;
    }

    await user.save();

    return res.status(201).json({
      success: true,
      message: msg,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getPayments = async (req, res) => {
  try {
    const user = await userSchema.findById(req.uid);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "You are not a valid User",
      });
    }

    let records = await paymentSchema
      .find({ owner: user._id })
      .populate("cart.product");

    return res.status(201).json({
      success: true,
      records,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getCartProducts = async (req, res) => {
  try {
    const user = await userSchema.findById(req.uid);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "You are not a valid User",
      });
    }

    let records = user.cart.map(async ({ product, quantity }) => {
      return {
        product: await subjectSchema.findById(product),
        quantity: quantity,
      };
    });

    records = await Promise.all(records);

    return res.status(201).json({
      success: true,
      records,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const checkout = async (req, res) => {
  try {
    const user = await userSchema.findById(req.uid);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "You are not a valid User",
      });
    }

    const { total } = req.body;

    if (!total) {
      return res.status(400).json({
        success: false,
        message: "Total is not defined",
      });
    }

    const options = {
      amount: Number(total * 100),
      currency: "INR",
    };

    const order = await instance.orders.create(options);

    return res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const verify = async (req, res) => {
  try {
    const user = await userSchema.findById(req.uid);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "You are not a valid User",
      });
    }

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expected = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isMatch = razorpay_signature === expected;

    if (!isMatch) {
      return res.status(500).json({
        success: false,
        message: "Transaction is fake",
      });
    }

    await paymentSchema.create({
      owner: user._id,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      signature: razorpay_signature,
      cart: user.cart,
    });

    user.cart.forEach((i) => {
      user.cource.push(i.product._id);
    });

    user.cart = [];

    await user.save();

    res.redirect(`http://localhost:5173/paymentSuccess/${razorpay_payment_id}`);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const getKey = async (req, res) => {
  try {
    const user = await userSchema.findById(req.uid);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "You are not a valid User",
      });
    }

    res.status(200).json({ key: process.env.KEY_ID });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};
