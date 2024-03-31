import React from "react";
import Detail from "./components/detail/Detail";
import Showtimes from "./components/showtimes/Showtimes";

import "./style.css";

export default function MovieDetail() {
  return (
    <div className="py-5 bg__detail">
      <div className=" container mt-5">
        <Detail />
        <Showtimes />
      </div>
    </div>
  );
}
