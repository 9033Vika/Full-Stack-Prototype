import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../axios/user";
import { server } from "../constants/MISC";
import { userDoesNotExist } from "../redux/reducers/auth";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const toastId = toast.loading("Logging Out...");

    const data = await logout(dispatch, `${server}user/logout`);

    if (data.success) {
      dispatch(userDoesNotExist());
      toast.success(data.message, {
        id: toastId,
      });
      navigate("/");
    } else {
      toast.error(data.response.data.message, {
        id: toastId,
      });
    }
  };
  return (
    <div
      style={{
        width: "100%",
        height: "10rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button
        style={{
          height: "3rem",
          width: "40%",
          border: "2px solid rgba(88, 197, 255, 0.75)",
          borderRadius: "10px",
          backgroundColor: "transparent",
          cursor: "pointer",
          color: "rgba(88, 197, 255, 0.75)",
        }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
