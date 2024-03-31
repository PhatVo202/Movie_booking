import React, { useEffect, useState } from "react";
import { fetchInforClusterApi } from "services/inforcluster";
import { fetchSystemClusterApi } from "services/systemcluster";

import { Tabs, Tag, Space, Collapse } from "antd";
import { formatTime } from "utils";

import { NavLink } from "react-router-dom";

import { useMediaQuery } from "react-responsive";

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
    <div className={isMobile ? "container-md" : "container"}>
      <div>
        <Tabs
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
                            <div style={{ display: "flex" }}>
                              <img
                                src={item.hinhAnh}
                                alt=""
                                width={50}
                                height={50}
                              />
                              <div className="ml-3">
                                <p className="mb-0 text-primary">
                                  {item.tenCumRap}
                                </p>
                                <p>{item.diaChi}</p>
                              </div>
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
                                    <div style={{ display: "flex" }}>
                                      <img
                                        src={dsPhim.hinhAnh}
                                        alt=""
                                        width={50}
                                        height={50}
                                      />
                                      <p>{dsPhim.tenPhim}</p>
                                    </div>
                                  }
                                  key={index}
                                >
                                  {dsPhim.lstLichChieuTheoPhim?.map(
                                    (xuatChieu, index) => {
                                      return (
                                        <Space>
                                          <Tag color="gold" className="mb-2">
                                            <NavLink
                                              style={{ textDecoration: "none" }}
                                              key={index}
                                              to={`/booking/${xuatChieu.maLichChieu}`}
                                            >
                                              {formatTime(
                                                xuatChieu.ngayChieuGioChieu
                                              )}
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
                    style={{ height: "700px", overflowY: "scroll" }}
                  >
                    {systemRap.lstCumRap?.map((heThongRap, index) => {
                      return (
                        <TabPane
                          tab={
                            <div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                  justifyContent: "space-around",
                                }}
                              >
                                <img
                                  src={heThongRap.hinhAnh}
                                  alt=""
                                  width={50}
                                  height={50}
                                />
                                <div>
                                  <p
                                    className="text-left "
                                    style={{
                                      marginBottom: 0,
                                      fontSize: "14px",
                                    }}
                                  >
                                    {heThongRap.tenCumRap}
                                  </p>
                                </div>
                              </div>
                            </div>
                          }
                          key={index}
                        >
                          {heThongRap.danhSachPhim?.map((dsPhim, index) => {
                            return (
                              <div key={index}>
                                <div className="my-2">
                                  <div style={{ display: "flex" }}>
                                    <img
                                      src={dsPhim.hinhAnh}
                                      alt={dsPhim.hinhAnh}
                                      width={100}
                                      height={150}
                                    />
                                    <h4
                                      className="text-info ml-4"
                                      style={{
                                        alignItems: "center",
                                        display: "flex",
                                      }}
                                    >
                                      {dsPhim.tenPhim}
                                    </h4>
                                  </div>
                                </div>
                                <div>
                                  {dsPhim.lstLichChieuTheoPhim.map(
                                    (xuatChieu, index) => {
                                      return (
                                        <Space>
                                          <Tag color="gold" className="mb-2">
                                            <NavLink
                                              style={{ textDecoration: "none" }}
                                              key={index}
                                              to={`/booking/${xuatChieu.maLichChieu}`}
                                            >
                                              {formatTime(
                                                xuatChieu.ngayChieuGioChieu
                                              )}
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
