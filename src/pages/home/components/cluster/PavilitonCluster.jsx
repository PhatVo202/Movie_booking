import React, { useEffect, useState } from "react";
import { fetchInforClusterApi } from "services/inforcluster";
import { fetchSystemClusterApi } from "services/systemcluster";

import { Tabs, Tag, Space, Collapse } from "antd";
import { formatTime } from "utils";

import { NavLink } from "react-router-dom";

import { useMediaQuery } from "react-responsive";
import moment from "moment/moment";

const { TabPane } = Tabs;

const { Panel } = Collapse;

export default function PavilitonCluster() {
  const [systemCluster, setSystemCluster] = useState([]);
  const [inforCluster, setInforCluster] = useState([]);

  useEffect(() => {
    getSystemCluster();
    getInforCluster();
  }, []);

  const getSystemCluster = async () => {
    const result = await fetchSystemClusterApi();
    setSystemCluster(result.data);
  };

  const getInforCluster = async () => {
    const result = await fetchInforClusterApi(systemCluster.maHeThongRap);
    setInforCluster(result.data);
  };

  const isMobile = useMediaQuery({ query: `(max-width: 845px)` });
  const isDesktop = useMediaQuery({ query: `(min-width: 846px)` });

  const StyleFilms = {
    height: "500px",
    overflowY: "scroll",
  };

  return (
    <div
      id="lichchieu"
      style={{ border: "0.5px solid gray" }}
      className={isMobile ? "container-md" : "container-fluid my-5"}
    >
      <div>
        <Tabs
          type="card"
          tabPosition={isMobile ? "top" : "left"}
          defaultActiveKey="1"
          style={
            isMobile
              ? {
                  height: "500px",
                  backgroundColor: "white",
                  overflowY: "scroll",
                }
              : { height: "800px", backgroundColor: "white" }
          }
        >
          {inforCluster?.map((systemRap, index) => {
            return (
              <TabPane
                style={isMobile && StyleFilms}
                tab={
                  <div>
                    <img src={systemRap.logo} alt="" width={50} height={50} />
                  </div>
                }
                key={index}
              >
                {isMobile &&
                  systemRap.lstCumRap?.map((item, index) => {
                    return (
                      <Collapse
                        accordion={true}
                        key={index}
                        expandIconPosition="right"
                      >
                        <Panel
                          header={
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "start",
                                alignItems: "start",
                              }}
                            >
                              <h6
                                className="text-left "
                                style={{
                                  color: "#198754",
                                  marginBottom: 0,
                                  fontWeight: "600",
                                }}
                              >
                                {item.tenCumRap}
                              </h6>
                              <p
                                style={{ fontWeight: "300" }}
                                className="mb-0 fw-lighter"
                              >
                                {item.diaChi}
                              </p>
                              <p style={{ color: "rgb(251, 66, 38)" }}>
                                [Chi tiết]
                              </p>
                            </div>
                          }
                          key={index}
                        >
                          {item.danhSachPhim?.map((dsPhim, index) => {
                            return (
                              <Collapse
                                style={{ overflowY: "scroll" }}
                                key={index}
                                expandIconPosition="right"
                              >
                                <Panel
                                  showArrow={false}
                                  header={
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "start",
                                        alignItems: "start",
                                      }}
                                    >
                                      <img
                                        src={dsPhim.hinhAnh}
                                        alt=""
                                        width={50}
                                        height={50}
                                      />
                                      <div
                                        className="px-2"
                                        style={{
                                          display: "flex",
                                          alignItems: "start",
                                          justifyContent: "start",
                                        }}
                                      >
                                        <span
                                          style={{
                                            padding: "1px 7px",
                                            backgroundColor: "rgb(251, 66, 38)",
                                            display: "inline-block",
                                            borderRadius: "10px",
                                            color: "white",
                                            marginRight: "10px",
                                          }}
                                        >
                                          C18
                                        </span>
                                        <h6
                                          style={{
                                            color: "rgb(25, 135, 84)",
                                          }}
                                        >
                                          {dsPhim.tenPhim}
                                        </h6>
                                      </div>
                                    </div>
                                  }
                                  key={index}
                                >
                                  {dsPhim.lstLichChieuTheoPhim?.map(
                                    (xuatChieu, index) => {
                                      return (
                                        <Space className="mb-2" key={index}>
                                          <Tag color="default" className="mb-2">
                                            <NavLink
                                              style={{
                                                textDecoration: "none",
                                              }}
                                              to={`/detail/${xuatChieu.maLichChieu}`}
                                            >
                                              <div className="p-2 fs-6">
                                                <span className="text-success">
                                                  {moment(
                                                    xuatChieu.ngayChieuGioChieu
                                                  ).format("DD/MM/YYYY")}
                                                </span>
                                                <span> ~ </span>
                                                <span
                                                  style={{
                                                    fontSize: "17px",
                                                    color: "rgb(251, 66, 38)",
                                                  }}
                                                >
                                                  {moment(
                                                    xuatChieu.ngayChieuGioChieu
                                                  ).format("HH:mm")}
                                                </span>
                                              </div>
                                            </NavLink>
                                          </Tag>
                                        </Space>
                                      );
                                    }
                                  )}
                                </Panel>
                              </Collapse>
                            );
                          })}
                        </Panel>
                      </Collapse>
                    );
                  })}
                {isDesktop && (
                  <Tabs
                    defaultActiveKey="2
                        "
                    tabPosition="left"
                    type="card"
                    style={{ height: "700px", overflowY: "scroll" }}
                  >
                    {systemRap.lstCumRap?.map((heThongRap, index) => {
                      return (
                        <TabPane
                          tab={
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "start",
                                alignItems: "start",
                              }}
                            >
                              <h6
                                className="text-left "
                                style={{
                                  color: "#198754",
                                  marginBottom: 0,
                                  fontWeight: "600",
                                }}
                              >
                                {heThongRap.tenCumRap}
                              </h6>
                              <p
                                style={{ fontWeight: "300" }}
                                className="mb-0 fw-lighter"
                              >
                                {heThongRap.diaChi}
                              </p>
                              <p style={{ color: "rgb(251, 66, 38)" }}>
                                [Chi tiết]
                              </p>
                            </div>
                          }
                          key={index}
                        >
                          {heThongRap.danhSachPhim?.map((dsPhim, index) => {
                            return (
                              <div key={index}>
                                <div className="my-2">
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "start",
                                      alignItems: "start",
                                    }}
                                  >
                                    <img
                                      src={dsPhim.hinhAnh}
                                      alt={dsPhim.hinhAnh}
                                      width={100}
                                      height={150}
                                    />
                                    <div
                                      className="px-2"
                                      style={{
                                        display: "flex",
                                        alignItems: "start",
                                        justifyContent: "start",
                                      }}
                                    >
                                      <span
                                        style={{
                                          padding: "2px 8px",
                                          backgroundColor: "rgb(251, 66, 38)",
                                          display: "inline-block",
                                          borderRadius: "10px",
                                          margin: "10px 0",
                                          color: "white",
                                        }}
                                      >
                                        C18
                                      </span>
                                      <h4
                                        className="pt-2 pl-2"
                                        style={{
                                          color: "rgb(25, 135, 84)",
                                        }}
                                      >
                                        {dsPhim.tenPhim}
                                      </h4>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  {dsPhim.lstLichChieuTheoPhim.map(
                                    (xuatChieu, index) => {
                                      return (
                                        <Space className="mb-2" key={index}>
                                          <Tag color="default" className="mb-2">
                                            <NavLink
                                              style={{
                                                textDecoration: "none",
                                              }}
                                              to={`/detail/${xuatChieu.maLichChieu}`}
                                            >
                                              <div className="p-2 fs-6">
                                                <span className="text-success">
                                                  {moment(
                                                    xuatChieu.ngayChieuGioChieu
                                                  ).format("DD/MM/YYYY")}
                                                </span>
                                                <span> ~ </span>
                                                <span
                                                  style={{
                                                    fontSize: "17px",
                                                    color: "rgb(251, 66, 38)",
                                                  }}
                                                >
                                                  {moment(
                                                    xuatChieu.ngayChieuGioChieu
                                                  ).format("HH:mm")}
                                                </span>
                                              </div>
                                            </NavLink>
                                          </Tag>
                                        </Space>
                                      );
                                    }
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </TabPane>
                      );
                    })}
                  </Tabs>
                )}
              </TabPane>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
}
