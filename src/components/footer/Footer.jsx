import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import "./stylefooter.css";

export default function Footer() {
  return (
    <footer className="py-5" style={{ backgroundColor: "#111111" }}>
      <div className="container footer__content ">
        <div className="row">
          <div className="col-12">
            <img
              src="./img/logo.png"
              alt=""
              width={100}
              height={50}
              className="d-block"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-4 col-xl-4 footer__item ">
            <address>
              <span>
                NetFlix là dịch vụ được cung cấp bởi Công ty Cổ Phần NetFlix
                thành viên của Công ty Cổ Phần Giải Trí và Giáo Dục NetFlix
                (GEE.,JSC)
              </span>
              <span>
                Địa chỉ: 59 Xa Lộ Hà Nội, Phường Thảo Điền, Thành Phố Thủ Đức,
                Thành Phố Hồ Chí Minh, Việt Nam.
              </span>
              <span> Mã số doanh nghiệp: 0106539659.</span>
              <span>
                Ngày cấp mã số doanh nghiệp: 15/5/2014. Nơi cấp: Sở kế hoạch và
                đầu tư thành phố Hà Nội.
              </span>
              <img src="./img/certificate.png" alt="" width={200} height={70} />
            </address>
          </div>
          <div className="col-6 col-md-6 col-lg-2 col-xl-2 footer__item p-2">
            <h4>Giới thiệu</h4>
            <ul>
              <li>
                <a href="#">Quy chế sử dụng dịch vụ</a>
              </li>
              <li>
                <a href="#">Chính sách bảo mật</a>
              </li>
              <li>
                <a href="#">Khuyến mãi</a>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md-6 col-lg-3 col-xl-3 footer__item p-2">
            <h4>Hỗ trợ</h4>
            <ul>
              <li>
                <a href="#">18009090</a>
              </li>
              <li>
                <a href="#">netflix@gmail.com</a>
              </li>
              <li>
                <a href="#">https://netflix.vn/help</a>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-6 col-lg-3 col-xl-3 footer__item px-2">
            <h4>Tải ứng dụng</h4>
            <div className="container-xl">
              <div className="row">
                <div className="col-6">
                  <a href="#">
                    <img
                      className="img-fluid"
                      src="./img/google-play-badge-1.png"
                      alt="gg-play"
                    />
                  </a>
                </div>
                <div className="col-6 ">
                  <a href="#">
                    <img
                      className="img-fluid"
                      src="./img/download-on-the-app-store-apple-1.png"
                      alt="appstore"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div>
              <h4 className="my-3">Kết nối với chúng tôi</h4>
              <ul className="footer__item--icon">
                <li>
                  <a href="#">
                    <FontAwesomeIcon icon={faInstagram} size="2x" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FontAwesomeIcon icon={faFacebook} size="2x" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FontAwesomeIcon icon={faYoutube} size="2x" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FontAwesomeIcon icon={faTiktok} size="2x" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
