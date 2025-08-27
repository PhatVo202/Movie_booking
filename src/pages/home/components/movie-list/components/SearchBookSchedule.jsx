import { Button, Select } from "antd";
import { useMovieList } from "hooks/useMovieList";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMovieShowtimesApi } from "services/cinema";

export default function SearchBookSchedule() {
  const [movieListFilter, setMovieListFilter] = useState([]);
  const [searchFilm, setSearchFilm] = useState("");
  const [rap, setRap] = useState([]);
  const [searchRap, setSearchRap] = useState("");
  const [time, setTime] = useState([]);
  const [searchTime, setSearchTime] = useState("");

  const movieList = useMovieList();
  const navigate = useNavigate();

  useEffect(() => {
    setMovieListFilter(
      movieList.map((movie) => {
        return { label: movie.tenPhim, value: movie.maPhim };
      })
    );
  }, [movieList]);

  useEffect(() => {
    if (searchFilm) {
      getMovieShowtimes();
    }
  }, [searchFilm]);

  const getMovieShowtimes = async () => {
    const res = await fetchMovieShowtimesApi(searchFilm);
    setRap(
      res.data.heThongRapChieu.map((movie) => {
        return { label: movie.tenHeThongRap, value: movie.maHeThongRap };
      })
    );

    setTime(
      res.data.heThongRapChieu.flatMap((heThongRap) =>
        heThongRap.cumRapChieu.flatMap((cumRap) =>
          cumRap.lichChieuPhim.map((lich) => ({
            value: lich.maLichChieu,
            label: `${moment(lich.ngayChieuGioChieu).format(
              "DD/MM/YYYY ~ hh:mm A"
            )}`,
          }))
        )
      )
    );
  };

  const handleClick = (id) => {
    if (searchTime) {
      navigate(`/booking/${id}`);
    } else {
      return;
    }
  };

  return (
    <div className="row">
      <div className="col-12 mb-3 col-sm-12 mb-md-0 col-md-3 col-xs-12">
        <Select
          size="large"
          disabled={movieListFilter.length === 0}
          placeholder="Chọn phim"
          options={movieListFilter}
          onChange={(e) => setSearchFilm(e)}
          className="w-100"
        />
      </div>
      <div className="col-12 mb-3 col-sm-12 mb-md-0 col-md-3 col-xs-12">
        <Select
          size="large"
          placeholder="Chọn rạp"
          options={rap}
          className="w-100"
          disabled={searchFilm === ""}
          onChange={(e) => {
            setSearchRap(e);
          }}
        />
      </div>
      <div className="col-12 mb-3 col-sm-12 mb-md-0 col-md-3 col-xs-12">
        <Select
          size="large"
          placeholder="Chọn thời gian"
          options={time}
          className="w-100"
          disabled={searchRap === ""}
          onChange={(e) => setSearchTime(e)}
        />
      </div>
      <div className="col-3">
        <Button
          type="primary"
          danger
          style={{
            width: "100%",
            height: "100%",
            cursor: searchTime === "" ? "not-allowed" : "pointer",
            opacity: searchTime === "" ? 0.5 : 1,
          }}
          onClick={() => handleClick(searchTime)}
        >
          Đặt vé
        </Button>
      </div>
    </div>
  );
}
