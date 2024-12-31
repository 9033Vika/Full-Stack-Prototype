import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, login, register } from "../axios/user";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { server } from "../constants/MISC";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Logging...");

    const data = await login(
      dispatch,
      `${server}user/login`,
      email,
      password
    );

    if (data?.success) {
      toast.success(data?.message, {
        id: toastId,
      });
    } else {
      toast.error(data?.response?.data?.message, {
        id: toastId,
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Registering...");

    const data = await register(
      dispatch,
      `${server}user/register`,
      name,
      email,
      password
    );

    if (data?.success) {
      toast.success(data?.message, {
        id: toastId,
      });
    } else {
      toast.error(data?.response?.data?.message, {
        id: toastId,
      });
    }
  };

  useEffect(() => {
    getProfile(dispatch, `${server}user/profile`);
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      navigate("/products");
    }
  }, [user]);

  return (
    <>
      {isLogin ? (
        <form className="login-container" onSubmit={(e) => handleLogin(e)}>
          <div class="ring">
            <div class="login">
              <h2>Login</h2>
              <div class="inputBx">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div class="inputBx">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={5}
                />
              </div>
              <div class="inputBx">
                <button type="submit">Login</button>
              </div>
              <div class="links">
                <a href="#">Forget Password?</a>
                <a href="#" onClick={() => setIsLogin(false)}>
                  Register
                </a>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <form className="login-container" onSubmit={(e) => handleRegister(e)}>
          <div class="ring">
            <div class="login">
              <h2>Register</h2>
              <div class="inputBx">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  minLength={3}
                />
              </div>
              <div class="inputBx">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div class="inputBx">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={5}
                />
              </div>
              <div class="inputBx">
                <button type="submit">Register</button>
              </div>
              <div class="links">
                <a href="#">Forget Password?</a>
                <a href="#" onClick={() => setIsLogin(true)}>
                  Login
                </a>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default Login;
