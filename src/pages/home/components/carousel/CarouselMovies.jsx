import React, { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import { useMovieList } from "hooks/useMovieList";

const contentStyle = {
  width: "100%",
  height: "70vh",
  objectFit: "contain",
};

export default function CarouselMovies() {
  const movieList = useMovieList();
  const isMobile = useMediaQuery({ query: `(max-width: 600px)` });
  const [showModal, setShowModal] = useState(false);
  const [activeTrailer, setActiveTrailer] = useState(null);

  const banners = movieList.slice(17, 20);

  const openTrailer = (trailer) => {
    setActiveTrailer(trailer);
    setShowModal(true);
  };

  const closeTrailer = () => {
    setShowModal(false);
    setActiveTrailer(null);
  };

  console.log({ banners: banners });

  const renderBannerList = () => {
    return banners.map((item, index) => {
      return (
        <div
          key={index}
          className={`carousel-item ${index === 0 ? "active" : ""}`}
          style={isMobile ? { height: "400px" } : contentStyle}
        >
          <img
            className="d-block w-100 img-fluid"
            src={item.hinhAnh}
            alt={item.tenPhim || `slide-${index}`}
            style={{ height: "100%", objectFit: "cover" }}
          />

          <button
            onClick={() => openTrailer(item.trailer)}
            type="button"
            aria-label={`Play trailer for ${item.tenPhim || index}`}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              border: "none",
              background: "transparent",
              padding: 0,
              cursor: "pointer",
            }}
          >
            <img src="/img/play-video.png" alt="play" />
          </button>
        </div>
      );
    });
  };

  return (
    <div>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          {banners.map((_, idx) => (
            <li
              key={idx}
              data-target="#carouselExampleIndicators"
              data-slide-to={idx}
              className={idx === 0 ? "active" : ""}
            />
          ))}
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

      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
            padding: "1rem",
          }}
          role="dialog"
          aria-modal="true"
        >
          <div style={{ position: "relative", maxWidth: 900, width: "100%" }}>
            <CloseOutlined
              onClick={closeTrailer}
              className="text-white"
              style={{
                position: "absolute",
                right: -40,
                top: -10,
                fontSize: 24,
                cursor: "pointer",
              }}
            />

            <div style={{ position: "relative", paddingTop: "56.25%" }}>
              <iframe
                src={activeTrailer}
                title="Trailer"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
