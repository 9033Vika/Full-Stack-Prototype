import JWT from "jsonwebtoken";

export const sendToken = async (res, user, code, msg) => {
  const token = await JWT.sign({ _id: user._id }, process.env.JWT);

  return res
    .status(code)
    .cookie("token", token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 60 * 24),
      httpOnly: false,
      sameSite: "None",
      secure: true,
    })
    .json({
      success: true,
      message: msg,
      user,
    });
};
