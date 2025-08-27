import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { setUserInfoAction } from "../../store/actions/userAction";
// import logoImg from "../../../public/img/logoImg.png";

import "./styleheader.css";

import { UserOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Space, Button, Dropdown } from "antd";
import { useMediaQuery } from "react-responsive";

export default function Header({
  scrollIntoShowTimesRef,
  scrollIntoCinemasRef,
  scrollIntoNewsRef,
  scrollIntoAppRef,
}) {
  const userState = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("USER_INFO_KEY");
    dispatch(setUserInfoAction(null));
    navigate("/");
  };

  const items = [
    {
      label: (
        <NavLink to="/profile" style={{ fontSize: "18px" }}>
          <UserOutlined className="mr-1" />
          Thông tin cá nhân
        </NavLink>
      ),
      key: "1",
    },
    {
      label: (
        <NavLink to="/admin/userlist" style={{ fontSize: "18px" }}>
          <SettingOutlined className="mr-1" />
          Quản trị
          {/* {userState.userInfo && userState.userInfo.maLoaiNguoiDung} */}
        </NavLink>
      ),
      key: "2",
    },
    {
      label: (
        <Button size="middle" danger onClick={handleLogout}>
          Đăng xuất
        </Button>
      ),
      key: "",
    },
  ];

  const isMobile = useMediaQuery({ query: `(max-width: 600px)` });

  return (
    <div className="header__content">
      <div className="container-xl bg-rg">
        <nav className="navbar navbar-expand-md navbar-light ml-auto">
          <Link
            className="navbar-brand"
            to="/"
            onClick={() => window.scrollTo(0, 0)}
          >
            <img
              src="/img/logo12.webp"
              alt="logo"
              width={isMobile ? 150 : 240}
              height={70}
              style={{ objectFit: "contain" }}
            />
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="collapsibleNavId">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0 ml-auto">
              <li className="nav-item active">
                <NavLink to="/"></NavLink>
              </li>
              <li className="nav-item ">
                <NavLink
                  onClick={() => window.scrollTo(0, 0)}
                  to="/"
                  className="nav-link"
                >
                  Trang chủ
                </NavLink>
              </li>
              <li className="nav-item ">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    scrollIntoShowTimesRef && scrollIntoShowTimesRef();
                  }}
                  href="#lichchieu"
                  className="nav-link"
                >
                  Lịch chiếu
                </a>
              </li>
              <li className="nav-item ">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    scrollIntoCinemasRef && scrollIntoCinemasRef();
                  }}
                  href="#cumrap"
                  className="nav-link"
                >
                  Cụm rạp
                </a>
              </li>
              <li className="nav-item ">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    scrollIntoNewsRef && scrollIntoNewsRef();
                  }}
                  href="#tin-tuc"
                  className="nav-link"
                >
                  Tin tức
                </a>
              </li>
            </ul>
            <div>
              {userState.userInfo ? (
                <div className="container" k>
                  <div style={{ textAlign: "center" }}>
                    <span className=" text-white ">
                      <Dropdown
                        menu={{
                          items,
                        }}
                        trigger={["click"]}
                        placement="bottomRight"
                        arrow
                      >
                        <a onClick={(e) => e.preventDefault()}>
                          <Space size={16} wrap>
                            <Avatar
                              style={{ backgroundColor: "#87d068" }}
                              icon={<UserOutlined />}
                            />
                            {userState.userInfo.hoTen}
                          </Space>
                        </a>
                      </Dropdown>
                    </span>
                  </div>
                </div>
              ) : (
                <Fragment className="container">
                  <div className="row">
                    <Space
                      className="col-sm-12 col-md-6 col-xl-6"
                      wrap
                      style={{ justifyContent: "center" }}
                    >
                      <Button
                        size="middle"
                        className="btn__register"
                        danger
                        type="text"
                        onClick={() => navigate("/register")}
                      >
                        Đăng ký
                      </Button>
                    </Space>
                    <Space
                      className="col-sm-12 col-md-6 col-xl-6"
                      wrap
                      style={{ justifyContent: "center" }}
                    >
                      <Button
                        size="middle"
                        danger
                        onClick={() => navigate("/login")}
                      >
                        Đăng nhập
                      </Button>
                    </Space>
                  </div>
                </Fragment>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
