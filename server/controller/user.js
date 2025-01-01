import compare from "bcrypt";
import userSchema from "../models/User.js";
import { sendToken } from "../utils/createToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !password || !email) {
      return res.status(401).json({
        success: false,
        message: "Fill all the fields",
      });
    }

    const isExist = await userSchema.findOne({ email: email });

    if (isExist) {
      return res.status(401).json({
        success: false,
        message: "User already exist",
      });
    }

    const user = await userSchema.create({
      name,
      email,
      password,
    });

    await sendToken(res, user, 201, "user created");
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "fill all blanks",
      });
    }

    const user = await userSchema.findOne({ email: email }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }

    const isMatch = compare.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    await sendToken(res, user, 200, "user logged in");
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const user = await userSchema.findById(req.uid).populate("cource");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { expires: 0 }).json({
      success: true,
      message: "Logged out",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
