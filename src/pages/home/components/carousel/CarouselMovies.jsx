import React from "react";
import { Space } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import { useMovieList } from "hooks/useMovieList";

const contentStyle = {
  width: "100%",
  height: "100vh",
  objectFit: "contain",
};

export default function CarouselMovies() {
  const movieList = useMovieList();

  const renderBannerList = () => {
    return movieList.slice(4, 8).map((item, index) => {
      return (
        <div
          key={index}
          className={`carousel-item ${index === 0 && "active"}`}
          style={
            isMobile
              ? { height: "400px", width: "100%", objectFit: "contain" }
              : contentStyle
          }
        >
          <img
            className="d-block w-100 img-fluid"
            src={item.hinhAnh}
            alt="Second slide"
            style={{ height: "100%" }}
          />

          <a
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
            type="button"
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >
            <img src="./img/play-video.png" alt="" />
          </a>
          <div
            className="modal fade"
            id="exampleModalCenter"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content ">
                <Space>
                  <CloseOutlined
                    className="text-white"
                    style={{
                      position: "absolute",
                      right: "-60px",
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  />
                </Space>
                <iframe
                  width="560"
                  height="315"
                  src={item.trailer}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const isMobile = useMediaQuery({ query: `(max-width: 600px)` });

  return (
    <div>
      <div
        id="carouselExampleIndicators"
        className="carousel slide "
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to={0}
            className="active"
          />
          <li data-target="#carouselExampleIndicators" data-slide-to={1} />
          <li data-target="#carouselExampleIndicators" data-slide-to={2} />
        </ol>
        <div className="carousel-inner">{renderBannerList()}</div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
}
