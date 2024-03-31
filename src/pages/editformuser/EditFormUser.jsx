import { MA_NHOM } from "constants";
import React, { useEffect, useState } from "react";
import { fetchListTypeUserApi, addUserApi, updateUserApi } from "services/user";

import Swal from "sweetalert2";

import { Button, notification, Space } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function EditFormUser() {
  const navigate = useNavigate();
  const hookStateUser = useSelector((state) => state.userListReducer.userList);
  const [typeUser, setTypeUser] = useState([]);
  const [values, setValues] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: MA_NHOM,
    maLoaiNguoiDung: "",
    hoTen: "",
  });

  const [errors, setErrors] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    hoTen: "",
    maLoaiNguoiDung: "",
  });

  const Swal = require("sweetalert2");

  useEffect(() => {
    getListTypeUser();
  }, []);

  const getListTypeUser = async () => {
    const result = await fetchListTypeUserApi();
    setTypeUser(result.data.content);
  };

  const renderMaLoaiNguoiDung = () => {
    return typeUser.map((item, index) => {
      return <option key={index}>{item.maLoaiNguoiDung}</option>;
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleBlur = (event) => {
    let message = "";
    const { name, title, validity } = event.target;

    const { valueMissing, patternMismatch } = validity;

    if (valueMissing) {
      message = `${title} is required`;
    }

    if (patternMismatch) {
      message = `${title} không đúng định dạng`;
    }

    setErrors({
      ...errors,
      [name]: message,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateUserApi(values);
      Swal.fire({
        title: "Cập nhật thành công!",
        text: "Hoàn tất!!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/admin/userlist");
    } catch (error) {
      notification.error({
        message: error.response.data.content,
      });
    }
  };

  useEffect(() => {
    if (hookStateUser) {
      setValues({
        hoTen: hookStateUser.hoTen,
        matKhau: hookStateUser.matKhau,
        taiKhoan: hookStateUser.taiKhoan,
        email: hookStateUser.email,
        maLoaiNguoiDung: hookStateUser.maLoaiNguoiDung,
        soDt: hookStateUser.soDT,
        maNhom: MA_NHOM,
      });
    }
  }, [hookStateUser]);

  const { hoTen, matKhau, taiKhoan, email, soDt, maLoaiNguoiDung } =
    values || {};

  return (
    <div>
      <h1>Thêm người dùng</h1>
      <form
        onSubmit={(event) => handleSubmit(event)}
        action=""
        className="container-xl"
      >
        <div className="row">
          <div className="col-6">
            <div className="form-group w-100">
              <label>Tài khoản</label>
              <input
                title="Tai khoan"
                type="text"
                value={taiKhoan}
                className="form-control"
                name="taiKhoan"
                required
                onChange={(event) => handleChange(event)}
                onBlur={(event) => handleBlur(event)}
              />
              <span className="text-danger">{errors.taiKhoan}</span>
            </div>
          </div>
          <div className="col-6">
            <div className="form-group w-100">
              <label>Số điện thoại</label>
              <input
                title="SDT"
                type="text"
                value={soDt}
                className="form-control"
                name="soDt"
                required
                onChange={(event) => handleChange(event)}
                onBlur={(event) => handleBlur(event)}
              />
              <span className="text-danger">{errors.soDt}</span>
            </div>
          </div>
          <div className="col-6">
            <div className="form-group w-100">
              <label>Mật khẩu</label>
              <input
                type="text"
                title="Mat Khau"
                value={matKhau}
                className="form-control"
                name="matKhau"
                required
                onChange={(event) => handleChange(event)}
                onBlur={(event) => handleBlur(event)}
              />
              <span className="text-danger">{errors.matKhau}</span>
            </div>
          </div>
          <div className="col-6">
            <div className="form-group w-100">
              <label>Họ tên</label>
              <input
                type="text"
                title="Ho ten"
                value={hoTen}
                className="form-control"
                name="hoTen"
                required
                onChange={(event) => handleChange(event)}
                onBlur={(event) => handleBlur(event)}
              />
              <span className="text-danger">{errors.hoTen}</span>
            </div>
          </div>
          <div className="col-6">
            <div className="form-group w-100">
              <label>Email</label>
              <input
                required
                type="text"
                title="Email"
                value={email}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                className="form-control"
                name="email"
                onChange={(event) => handleChange(event)}
                onBlur={(event) => handleBlur(event)}
              />
              <span className="text-danger">{errors.email}</span>
            </div>
          </div>
          <div className="col-6">
            <div className="form-group w-100">
              <label>Mã loại người dùng</label>
              <select
                class="form-control"
                title="Mã loại người dùng"
                required
                value={maLoaiNguoiDung}
                name="maLoaiNguoiDung"
                onChange={(event) => handleChange(event)}
              >
                {renderMaLoaiNguoiDung()}
                <span className="text-danger">{errors.maLoaiNguoiDung}</span>
              </select>
            </div>
          </div>
          <div className="col-12 text-right">
            <Space wrap className="ml-2">
              <Button htmlType="submit" danger type="primary" size="large">
                Cập nhật
              </Button>
            </Space>
          </div>
        </div>
      </form>
    </div>
  );
}
