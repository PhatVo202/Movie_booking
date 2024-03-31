import { Button, Card } from "antd";
import { useMovieList } from "hooks/useMovieList";
import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

import "./styleSlick.config.css";

export default function MultipleRows() {
  const settings = {
    className: "variale-width",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    rows: 1,
    slidesPerRow: 2,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          rows: 1,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
          rows: 1,
          slidesPerRow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          rows: 1,
          slidesPerRow: 2,
        },
      },
    ],
  };

  const navigate = useNavigate();
  const movieList = useMovieList();
  const renderMovieList = () => {
    return movieList.map((ele, index) => {
      return (
        <div key={index} className="width__item mb-3 ">
          <Card
            className="mt-3"
            hoverable
            style={{ height: "500px" }}
            cover={
              <img
                style={{ height: "350px", objectFit: "cover" }}
                alt={ele.hinhAnh}
                src={ele.hinhAnh}
              />
            }
          >
            <h6 style={{ height: "40px" }}>{ele.tenPhim}</h6>
            <Button
              onClick={() => navigate(`/movie-detail/${ele.maPhim}`)}
              size="large"
              danger
            >
              Xem chi tiết
            </Button>
          </Card>
        </div>
      );
    });
  };

  return (
    <div className="bg-secondary">
      <Slider {...settings}>{renderMovieList()}</Slider>
    </div>
  );
}
