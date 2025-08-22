import { Button, Card } from "antd";
import { useMovieList } from "hooks/useMovieList";
import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

import "./styleSlick.config.css";

export default function MultipleRows() {
  // const settings = {
  //   className: "variale-width",
  //   centerMode: true,
  //   infinite: true,
  //   centerPadding: "60px",
  //   slidesToShow: 3,
  //   speed: 500,
  //   rows: 1,
  //   slidesPerRow: 2,
  //   variableWidth: true,
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 3,
  //         infinite: true,
  //         dots: true,
  //         rows: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 991,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 2,
  //         initialSlide: 1,
  //         rows: 1,
  //         slidesPerRow: 2,
  //       },
  //     },
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         initialSlide: 1,
  //         rows: 1,
  //         slidesPerRow: 2,
  //       },
  //     },
  //   ],
  // };

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          rows: 1,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 1,
          rows: 1,
          slidesPerRow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
          rows: 1,
          slidesPerRow: 1,
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
            className="mt-3 mx-2"
            hoverable
            cover={
              <img
                style={{
                  height: "348px",
                  objectFit: "contain",
                  marginTop: "20px",
                  borderRadius: "5px",
                }}
                alt={ele.hinhAnh}
                src={ele.hinhAnh}
              />
            }
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
            <h5>
              {ele.tenPhim.length > 16
                ? `${ele.tenPhim.slice(0, 16)}...`
                : ele.tenPhim}
            </h5>
            <p>
              {ele.moTa.length > 50 ? `${ele.moTa.slice(0, 50)}...` : ele.moTa}
            </p>
            <Button
              onClick={() => navigate(`/movie-detail/${ele.maPhim}`)}
              size="middle"
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
    <div className="bg-white">
      <Slider {...settings}>{renderMovieList()}</Slider>
    </div>
  );
}
