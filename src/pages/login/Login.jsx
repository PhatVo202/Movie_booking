import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../services/user";
import { setUserInfoAction } from "../../store/actions/userAction";
import Swal from "sweetalert2";

import { Link } from "react-router-dom";

import "./stylelogin.css";

import { CloseOutlined } from "@ant-design/icons";
import { Space } from "antd";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.userReducer);

  const [state, setState] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await loginApi(state);

      localStorage.setItem("USER_INFO_KEY", JSON.stringify(result.data));
      dispatch(setUserInfoAction(result.data));
      if (userState.userInfo) {
        Swal.fire({
          title: "Đăng nhập thành công",
          text: `Xin chào ${userState.userInfo.hoTen}`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
      navigate("/");
    } catch (error) {
      Swal.fire({
        title: `${error.response.data}`,
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="bg__login">
      <div className="center">
        <Space onClick={() => navigate("/")}>
          <CloseOutlined
            className="text-white"
            style={{
              position: "absolute",
              right: "16px",
              fontSize: "20px",
              cursor: "pointer",
            }}
          />
        </Space>
        <h1>Login</h1>
        <form method="post" onSubmit={handleSubmit}>
          <div className="txt_field">
            <input
              type="text"
              required
              name="taiKhoan"
              onChange={handleChange}
            />
            <span />
            <label>Username</label>
          </div>
          <div className="txt_field">
            <input
              type="password"
              required
              name="matKhau"
              onChange={handleChange}
            />
            <span />
            <label>Password</label>
          </div>
          <div className="pass">Forgot Password?</div>
          <input type="submit" defaultValue="Login" />
          <div className="signup_link">
            Not a member? <Link to="/register">Signup</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
