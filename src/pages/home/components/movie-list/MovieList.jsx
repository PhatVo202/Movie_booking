import React from "react";

import MultipleRows from "components/slick/MultipleRows";
import SearchBookSchedule from "./components/SearchBookSchedule";

export default function MovieList() {
  return (
    <div id="lichChieu" className="container my-5 ">
      <div className="my-5">
        <div className="my-4">
          <SearchBookSchedule />
        </div>
        <MultipleRows />
      </div>
    </div>
  );
}
