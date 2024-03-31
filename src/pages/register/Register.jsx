import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerApi } from "services/user";

import { CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Space } from "antd";
import { setRegisterInfoAction } from "store/actions/registerAction";
import { MA_NHOM } from "constants";

import Swal from "sweetalert2";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerUserState = useSelector((state) => state.registerUserReducer);

  const [values, setValues] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: MA_NHOM,
    hoTen: "",
  });

  const [errors, setErrors] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP03",
    hoTen: "",
  });

  const handleBlur = (event) => {
    let message = "";

    const { validity, name, title, minLength, maxLength } = event.target;
    const { valueMissing, tooShort, tooLong, patternMismatch } = validity;

    if (valueMissing) {
      message = `${title} không được để trống`;
    }

    if (tooShort || tooLong) {
      message = `${title} from ${minLength} - ${maxLength} `;
    }

    if (patternMismatch) {
      message = `${title} không đúng định dạng`;
    }

    setErrors({
      ...errors,
      [name]: message,
    });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await registerApi(values);
    localStorage.setItem(
      "REGISTER_INFO_KEY",
      JSON.stringify(result.data.content)
    );
    dispatch(setRegisterInfoAction(result.data.content));
    if (registerUserState.nd) {
      Swal.fire({
        title: "Đăng ký thành công",
        text: "Xin chào!!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    }

    navigate("/login");
  };

  return (
    <div className="bg__login py-5">
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

        <h1>Register</h1>
        <form
          noValidate
          method="post"
          onSubmit={(event) => handleSubmit(event)}
        >
          <div className="txt_field">
            <input
              type="text"
              required
              title="Tai Khoan"
              name="taiKhoan"
              onBlur={(event) => handleBlur(event)}
              onChange={(event) => handleChange(event)}
            />
            <span />
            <label>
              Tài khoản
              <span className="text-danger ml-3">{errors.taiKhoan}</span>
            </label>
          </div>
          <div className="txt_field">
            <input
              type="password"
              required
              title="Mat Khau"
              name="matKhau"
              onBlur={(event) => handleBlur(event)}
              onChange={(event) => handleChange(event)}
            />
            <span />
            <label>
              Mật khẩu
              <span className="text-danger ml-3">{errors.matKhau}</span>
            </label>
          </div>
          <div className="txt_field">
            <input type="password" required title="Password" />
            <span />
            <label>Nhập lại mật khẩu</label>
          </div>
          <div className="txt_field">
            <input
              type="text"
              required
              title="Ho ten"
              name="hoTen"
              minLength={5}
              maxLength={20}
              onBlur={(event) => handleBlur(event)}
              onChange={(event) => handleChange(event)}
            />
            <span />
            <label>
              Họ tên <span className="text-danger ml-3">{errors.hoTen}</span>
            </label>
          </div>

          <div className="txt_field">
            <input
              type="text"
              required
              title="Email"
              name="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              onBlur={(event) => handleBlur(event)}
              onChange={(event) => handleChange(event)}
            />
            <span />
            <label>
              Email <span className="text-danger ml-3">{errors.email}</span>
            </label>
          </div>
          <div className="txt_field">
            <input
              type="text"
              required
              name="soDt"
              minLength={5}
              maxLength={10}
              title="SDT"
              onBlur={(event) => handleBlur(event)}
              onChange={(event) => handleChange(event)}
            />
            <span />
            <label>
              SDT <span className="text-danger ml-3">{errors.soDt}</span>
            </label>
          </div>
          <div className="pass">Forgot Password?</div>
          <input type="submit" defaultValue="Login" />
        </form>
      </div>
    </div>
  );
}
