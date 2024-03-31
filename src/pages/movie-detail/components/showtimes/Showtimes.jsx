import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams, NavLink } from "react-router-dom";
import { fetchMovieShowtimesApi } from "../../../../services/cinema";

import { formatTime } from "../../../../utils";

import { Tabs, Tag, Collapse } from "antd";
import { useMediaQuery } from "react-responsive";

const { TabPane } = Tabs;
const { Panel } = Collapse;

export default function Showtimes() {
  const params = useParams();
  const [movieShowtimes, setMovieShowtimes] = useState({});

  useEffect(() => {
    getMovieShowtimes();
  }, []);

  const getMovieShowtimes = async () => {
    const result = await fetchMovieShowtimesApi(params.id);

    setMovieShowtimes(result.data);
  };

  const renderTabs = () => {
    return movieShowtimes.heThongRapChieu?.map((item, index) => {
      return (
        <TabPane
          tab={
            <div className="">
              <img src={item.logo} alt="" width={50} height={50} />
            </div>
          }
          key={index}
        >
          {item.cumRapChieu?.map((cumRapChieu, index) => {
            return (
              <div key={index}>
                <div className="py-2">
                  <img
                    src="https://evoseating.com.vn/wp-content/uploads/2021/12/11.2-thu-vien-cad-ghe-rap-chieu-phim1.jpg"
                    alt=""
                    width={60}
                    height={60}
                  />
                  <span className="ml-2">{cumRapChieu.tenCumRap}</span>
                </div>
                <div>
                  {cumRapChieu.lichChieuPhim?.map((lichChieu, index) => {
                    return (
                      <span key={index}>
                        <Tag color="lime">
                          <Link
                            to={`/booking/${lichChieu.maLichChieu}`}
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            {formatTime(lichChieu.ngayChieuGioChieu)}
                          </Link>
                        </Tag>
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </TabPane>
      );
    });
  };

  const isMobile = useMediaQuery({ query: `(max-width: 767px)` });
  const isDesktop = useMediaQuery({ query: `(min-width: 768px)` });

  return (
    <div className="glass__content mt-5">
      <Tabs style={{ color: "white" }}>
        <TabPane tab="Lịch chiếu" key={1}>
          <Tabs style={{ color: "white" }} tabPosition="left">
            {isDesktop && renderTabs()}
          </Tabs>
          {isMobile &&
            movieShowtimes.heThongRapChieu?.map((item, index) => {
              return (
                <Collapse key={index} expandIconPosition="right">
                  <Panel
                    header={
                      <div style={{ display: "flex" }}>
                        <img src={item.logo} alt="" width={60} height={60} />
                        <p className="text-white mt-3 ml-5">
                          {item.tenHeThongRap}
                        </p>
                      </div>
                    }
                    key={index}
                  >
                    {item.cumRapChieu.map((cumRap, index) => {
                      return (
                        <Collapse key={index} expandIconPosition="right">
                          <Panel
                            header={
                              <div
                                style={{
                                  display: "flex",
                                }}
                              >
                                <img
                                  src="https://evoseating.com.vn/wp-content/uploads/2021/12/11.2-thu-vien-cad-ghe-rap-chieu-phim1.jpg"
                                  alt=""
                                  width={60}
                                  height={60}
                                />
                                <div className="ml-2">
                                  <p className="text-primary mb-0">
                                    {cumRap.tenCumRap}
                                  </p>
                                  <p className="text-secondary">
                                    {cumRap.diaChi}
                                  </p>
                                </div>
                              </div>
                            }
                            key={index}
                          >
                            {cumRap.lichChieuPhim?.map((xuatChieu, index) => {
                              return (
                                <Tag key={index} color="gold">
                                  <NavLink
                                    to={`/booking/${xuatChieu.maLichChieu}`}
                                  >
                                    {formatTime(xuatChieu.ngayChieuGioChieu)}
                                  </NavLink>
                                </Tag>
                              );
                            })}
                          </Panel>
                        </Collapse>
                      );
                    })}
                  </Panel>
                </Collapse>
              );
            })}
        </TabPane>
        <TabPane tab="Đánh giá" key={2}>
          <section>
            <div className="container text-dark">
              <div className="row d-flex justify-content-center">
                <div className="col-md-12 col-lg-10 col-xl-8">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="d-flex flex-start">
                        <img
                          className="rounded-circle shadow-1-strong me-3"
                          src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(26).webp"
                          alt="avatar"
                          width={40}
                          height={40}
                        />
                        <div className="w-100">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="text-primary fw-bold mb-0">
                              lara_stewart
                              <span className="text-dark ml-2">
                                Phim hay, đáng xem
                              </span>
                            </h6>
                            <p className="mb-0">2 days ago</p>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <p className="small mb-0" style={{ color: "#aaa" }}>
                              <a href="#!" className="link-grey">
                                Remove
                              </a>{" "}
                              •
                              <a href="#!" className="link-grey">
                                Reply
                              </a>{" "}
                              •
                              <a href="#!" className="link-grey">
                                Translate
                              </a>
                            </p>
                            <div className="d-flex flex-row">
                              <i className="fas fa-star text-warning me-2" />
                              <i
                                className="far fa-check-circle"
                                style={{ color: "#aaa" }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="d-flex flex-start">
                        <img
                          className="rounded-circle shadow-1-strong me-3"
                          src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(21).webp"
                          alt="avatar"
                          width={40}
                          height={40}
                        />
                        <div className="w-100">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="text-primary fw-bold mb-0">
                              the_sylvester_cat
                              <span className="text-dark ms-2">Vui!!</span>
                            </h6>
                            <p className="mb-0">3 days ago</p>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <p className="small mb-0" style={{ color: "#aaa" }}>
                              <a href="#!" className="link-grey">
                                Remove
                              </a>{" "}
                              •
                              <a href="#!" className="link-grey">
                                Reply
                              </a>{" "}
                              •
                              <a href="#!" className="link-grey">
                                Translate
                              </a>
                            </p>
                            <div className="d-flex flex-row">
                              <i className="far fa-check-circle text-primary" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="d-flex flex-start">
                        <img
                          className="rounded-circle shadow-1-strong me-3"
                          src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(20).webp"
                          alt="avatar"
                          width={40}
                          height={40}
                        />
                        <div className="w-100">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="text-primary fw-bold mb-0">
                              mindyy_def
                              <span className="text-dark ms-2">Hấp dẫn</span>
                            </h6>
                            <p className="mb-0">3 days ago</p>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <p className="small mb-0" style={{ color: "#aaa" }}>
                              <a href="#!" className="link-grey">
                                Remove
                              </a>{" "}
                              •
                              <a href="#!" className="link-grey">
                                Reply
                              </a>{" "}
                              •
                              <a href="#!" className="link-grey">
                                Translate
                              </a>
                            </p>
                            <div className="d-flex flex-row">
                              <i
                                className="fas fa-user-plus"
                                style={{ color: "#aaa" }}
                              />
                              <i
                                className="far fa-star mx-2"
                                style={{ color: "#aaa" }}
                              />
                              <i className="far fa-check-circle text-primary" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="d-flex flex-start">
                        <img
                          className="rounded-circle shadow-1-strong me-3"
                          src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(14).webp"
                          alt="avatar"
                          width={40}
                          height={40}
                        />
                        <div className="w-100">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="text-primary fw-bold mb-0">
                              t_anya
                              <span className="text-dark ms-2">Tuyệt </span>
                            </h6>
                            <p className="mb-0">4 days ago</p>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <p className="small mb-0" style={{ color: "#aaa" }}>
                              <a href="#!" className="link-grey">
                                Remove
                              </a>{" "}
                              •
                              <a href="#!" className="link-grey">
                                Reply
                              </a>{" "}
                              •
                              <a href="#!" className="link-grey">
                                Translate
                              </a>
                            </p>
                            <div className="d-flex flex-row">
                              <i className="far fa-check-circle text-primary" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </TabPane>
      </Tabs>
    </div>
  );
}
