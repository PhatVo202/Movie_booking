import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { bookTicketApi, fetchTicketDetailApi } from "../../services/ticket";
import { Button } from "antd";
import Seat from "./components/Seat";
import * as _ from "lodash";
import { useMediaQuery } from "react-responsive";
import Swal from "sweetalert2";

import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

export default function Booking() {
  const navigate = useNavigate();

  const [ticketDetail, setTicketDetail] = useState({});
  const [selectedSeatList, setSelectedSeatList] = useState([]);

  const params = useParams();

  useEffect(() => {
    getTicketDetail();
  }, []);

  const getTicketDetail = async () => {
    const result = await fetchTicketDetailApi(params.id);
    setTicketDetail(result.data);
  };

  // render danh sách ghế
  const renderSeats = () => {
    return ticketDetail?.danhSachGhe?.map((ele, idx) => {
      return (
        <React.Fragment key={ele.maGhe}>
          <Seat ele={ele} handleSelect={handleSelect} />
          {(idx + 1) % 16 === 0 && <br />}
        </React.Fragment>
      );
    });
  };

  const handleSelect = (seat) => {
    const data = [...selectedSeatList];
    const idx = data.findIndex((ele) => ele.maGhe === seat.maGhe);

    if (idx !== -1) {
      data.splice(idx, 1);
    } else {
      data.push(seat);
    }

    setSelectedSeatList(data);
  };

  useEffect(() => {}, [selectedSeatList]);

  const bookTicket = async () => {
    const data = {
      maLichChieu: params.id,
      danhSachVe: selectedSeatList.map((ele) => {
        return {
          maGhe: ele.maGhe,
          giaVe: ele.giaVe,
        };
      }),
    };

    await bookTicketApi(data);
    Swal.fire({
      title: "Đặt vé thành công!",
      text: "Hoàn tất!!",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });

    navigate("/");
  };

  const isTablet = useMediaQuery({ query: `(min-width: 768px)` });

  const isMobile = useMediaQuery({ query: `(max-width: 767px) ` });

  const steps = [
    {
      label: (
        <div className="mt-5">{ticketDetail?.thongTinPhim?.tenCumRap}</div>
      ),
      description: (
        <div className="container-fluid">
          <div className="mt-3 w-90 mx-auto">
            <img
              style={{
                width: "100%",
                maxWidth: "100%",
                display: "block",
                borderRadius: "4px",
              }}
              src="https://movie-booking-project.vercel.app/img/bookticket/screen.png"
              alt="manhinh"
              width={550}
              height={90}
            />
          </div>
          <div
            style={{
              width: "90%",
              margin: "0 auto",
              display: "grid",
              placeItems: "center",
              overflowY: "scroll",
              position: "relative",
            }}
          >
            <div style={{ position: "" }}>{renderSeats()}</div>
          </div>
        </div>
      ),
    },
    {
      label: "Chi tiet",
      description: (
        <div className=" mt-5">
          <div className="d-flex">
            <img
              style={{ width: 150, height: 220, objectFit: "cover" }}
              src={ticketDetail?.thongTinPhim?.hinhAnh}
              alt="#"
            />
            <h4 className="mb-0">{ticketDetail?.thongTinPhim?.tenPhim}</h4>
          </div>
          <div
            className="mt-2"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <p>Cụm rạp: </p>
            <p className="text-success">
              {ticketDetail?.thongTinPhim?.tenCumRap}
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>Ngày giờ chiếu: </p>
            <p className="text-success">
              {ticketDetail?.thongTinPhim?.ngayChieu} ~{" "}
              <span className="text-danger">
                {ticketDetail?.thongTinPhim?.gioChieu}
              </span>
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>Địa chỉ: </p>
            <p className="text-success">{ticketDetail?.thongTinPhim?.diaChi}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="mb-0">Ghế đã chọn:</p>
            <div className="d-flex">
              {selectedSeatList.map((ele) => {
                return (
                  <p key={ele.maGhe} className=" mr-2 mb-0">
                    <span style={{ fontSize: "14px" }} className="text-success">
                      Ghế {ele.tenGhe}
                    </span>
                  </p>
                );
              })}
            </div>
          </div>
          <hr className="mt-5 mb-5" />
          <div className="">
            <h5 className="mb-5">
              Thành tiền: {_.sumBy(selectedSeatList, "giaVe").toLocaleString()}{" "}
              VND
            </h5>

            <Button
              style={{ height: "50px" }}
              type="primary"
              onClick={bookTicket}
              block
            >
              Đặt vé
            </Button>
          </div>
        </div>
      ),
    },
  ];

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="py-5">
      {isTablet && (
        <div className="container-fluid">
          <div className="row">
            <div className="col-8 mt-5">
              <div className="mt-3 w-90 mx-auto">
                <img
                  style={{
                    width: "100%",
                    maxWidth: "100%",
                    display: "block",
                    borderRadius: "4px",
                  }}
                  src="https://movie-booking-project.vercel.app/img/bookticket/screen.png"
                  alt="manhinh"
                  width={900}
                  height={90}
                />
              </div>
              <div
                style={{
                  width: "90%",
                  margin: "0 auto",
                  display: "grid",
                  flexWrap: "nowrap",
                  placeItems: "center",
                }}
              >
                <div>{renderSeats()}</div>
              </div>
            </div>
            {isTablet && (
              <div className="col-4 mt-5">
                <div className="d-flex">
                  <img
                    style={{ width: 150, height: 220, objectFit: "cover" }}
                    src={ticketDetail?.thongTinPhim?.hinhAnh}
                    alt="#"
                  />
                  <h4 className="mb-0">
                    {ticketDetail?.thongTinPhim?.tenPhim}
                  </h4>
                </div>
                <div
                  className="mt-2"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>Cụm rạp: </p>
                  <p className="text-success">
                    {ticketDetail?.thongTinPhim?.tenCumRap}
                  </p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>Ngày giờ chiếu: </p>
                  <p className="text-success">
                    {ticketDetail?.thongTinPhim?.ngayChieu} ~{" "}
                    <span className="text-danger">
                      {ticketDetail?.thongTinPhim?.gioChieu}
                    </span>
                  </p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>Địa chỉ: </p>
                  <p className="text-success">
                    {ticketDetail?.thongTinPhim?.diaChi}
                  </p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p className="mb-0">Ghế đã chọn:</p>
                  <div className="d-flex">
                    {selectedSeatList.map((ele) => {
                      return (
                        <p key={ele.maGhe} className=" mr-2 mb-0">
                          <span
                            style={{ fontSize: "14px" }}
                            className="text-success"
                          >
                            Ghế {ele.tenGhe}
                          </span>
                        </p>
                      );
                    })}
                  </div>
                </div>
                <hr className="mt-5 mb-5" />
                <div className="">
                  <h5 className="mb-5">
                    Thành tiền:{" "}
                    {_.sumBy(selectedSeatList, "giaVe").toLocaleString()} VND
                  </h5>

                  <Button
                    style={{ height: "50px" }}
                    type="primary"
                    onClick={bookTicket}
                    block
                  >
                    Đặt vé
                  </Button>
                </div>
              </div>
            )}
            <div className="col-12 mb-4 ">
              <div className="mx-auto " style={{ display: "flex" }}>
                <div className="mr-4 ml-5">
                  <button
                    className="btn btn-secondary"
                    style={{
                      width: 30,
                      height: 30,
                      padding: 0,
                      borderRadius: "7px",
                      position: "relative",
                    }}
                  ></button>
                  <p>Ghế đã đặt</p>
                </div>
                <div className="mr-4">
                  <button
                    className="btn btn-secondary"
                    style={{
                      width: 30,
                      height: 30,
                      padding: 0,
                      borderRadius: "7px",
                      position: "relative",
                    }}
                  ></button>
                  <p>Ghế chưa đặt</p>
                </div>
                <div className="mr-4">
                  <button
                    className="btn btn-primary"
                    style={{
                      width: 30,
                      height: 30,
                      padding: 0,
                      borderRadius: "7px",
                      position: "relative",
                    }}
                  ></button>
                  <p>Ghế đang đặt</p>
                </div>
                <div>
                  <button
                    className="btn btn-warning"
                    style={{
                      width: 30,
                      height: 30,
                      padding: 0,
                      borderRadius: "7px",
                      position: "relative",
                    }}
                  ></button>
                  <p>Ghế VIP</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isMobile && (
        <Box sx={{ maxWidth: 767, flexGrow: 1 }}>
          <Paper
            square
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              height: 50,
              pl: 2,
              bgcolor: "background.default",
            }}
          >
            <Typography>{steps[activeStep].label}</Typography>
          </Paper>
          <Box sx={{ height: 1000, maxWidth: 767, width: "100%", p: 2 }}>
            {steps[activeStep].description}
          </Box>
          <MobileStepper
            variant="text"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                size="large"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="large"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </Box>
      )}
    </div>
  );
}
//.toLocaleString(): format dạng tiền tệ
