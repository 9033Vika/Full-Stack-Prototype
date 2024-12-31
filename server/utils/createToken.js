import JWT from "jsonwebtoken";

export const sendToken = async (res, user, code, msg) => {
  const token = await JWT.sign({ _id: user._id }, process.env.JWT);

  return res
    .status(code)
    .cookie("token", token, {
      maxAge: new Date(Date.now() + 1000 * 60 * 60 * 60 * 24),
      httpOnly: true,
      same_site: "none",
    })
    .json({
      success: true,
      message: msg,
      user,
    });
};
