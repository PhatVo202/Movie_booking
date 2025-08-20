import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetailApi } from "../../../../services/movie";

import { formatDate } from "../../../../utils";
import { Rate, Progress, Modal } from "antd";
import "./style.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

export default function Detail() {
  const params = useParams();

  const [movieDetail, setMovieDetail] = useState({});
  const [url, setUrl] = useState("");

  useEffect(() => {
    getMovieDetail();
  }, []);

  const getMovieDetail = async () => {
    const result = await fetchMovieDetailApi(params.id);
    setUrl(result.data.trailer);
    setMovieDetail(result.data);
  };

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="row">
      <div className="col-12 glass__content text-white">
        <div className="row ">
          <div className="col-sm-12 col-md-3 col-xl-3 col-xxl-3 ">
            <div style={{ position: "relative" }}>
              <FontAwesomeIcon
                icon={faPlayCircle}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: "40px",
                  height: "40px",
                  transform: "translate(-50%,-50%)",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
                className="glass__content--icon"
                onClick={showModal}
              />

              <Modal
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <br />
                <br />
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${url.split("v=")[1]}`}
                  title=""
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </Modal>

              <img className="w-100" src={movieDetail.hinhAnh} />
            </div>
          </div>
          <div className=" col-sm-12 col-md-6 col-xl-6 col-xxl-6">
            <h4>{movieDetail.tenPhim}</h4>
            <p>{movieDetail.moTa}</p>
            <p>
              <span className="text-warning">Ngày khởi chiếu:</span>{" "}
              {formatDate(movieDetail.ngayKhoiChieu)}
            </p>
          </div>
          <div className=" col-sm-12 col-md-3 col-xl-3 col-xxl-3 text-center">
            <h4 style={{ color: "#fadb14" }}>Đánh giá</h4>
            <Progress type="dashboard" percent={movieDetail.danhGia * 10} />
            <div>
              <Rate disabled value={movieDetail.danhGia / 2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
