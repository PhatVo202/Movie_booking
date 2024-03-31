import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function News() {
  const navigate = useNavigate();
  return (
    <div style={{ backgroundImage: "url(./img/imgbgdidong.jpeg)" }}>
      <div className="container py-5">
        <div className="row ">
          <div className="col-12 col-lg-5 col-xl-5 ">
            <div className="pl-4" style={{ width: "95%", margin: "auto" }}>
              <img
                src="./img/mobileimg.webp"
                alt=""
                style={{
                  width: "400px",
                  maxWidth: "100%",
                  display: "block",
                  height: "650px",
                }}
              />
            </div>
          </div>
          <div
            className=" col-12 col-lg-7 col-xl-7 text-white mt-4 mt-lg-0"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div>
              <h1>
                Nội dung đặc sắc trải nghiệm mượt mà trên thiết bị di động
              </h1>
              <p className="text-secondary">Trải nghiệm sự tiện lợi</p>
              <p className="text-secondary">
                Hãy đăng ký ngay để có những suất chiếu phù hợp nhất
              </p>
              <Button
                style={{ borderRadius: "20px", width: "200px" }}
                size="large"
                danger
                onClick={() => navigate("/register")}
              >
                Đăng ký ngay
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
