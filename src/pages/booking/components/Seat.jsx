import React from "react";
import { useState } from "react";

export default function Seat(props) {
  // đang đặt
  const [isSelected, setIsSelected] = useState(false); // false: mặc định chưa đặt là false
  // tạo màu ghế
  const populateClassName = () => {
    if (props.ele.daDat) {
      // đã đặt
      return "btn-secondary";
    }

    // đặt ghế
    if (isSelected) {
      return "btn-primary";
    }

    // xem loại ghế
    if (props.ele.loaiGhe === "Vip") {
      return "btn-warning";
    }

    return "btn-dark"; // mặc định ko có gì hết thì return như này
  };

  // ddang đặt
  const handleSelectSeat = () => {
    // khi click vô thì đổi isselected đổi thành true
    setIsSelected(!isSelected); // nghịch đảo, nếu true = false, nếu false == true

    props.handleSelect(props.ele);
  };

  return (
    <button
      onClick={handleSelectSeat}
      disabled={props.ele.daDat} // disable ko click đc
      style={{
        width: 30,
        height: 30,
        padding: 0,
        borderRadius: "7px",
        position: "relative",
      }}
      className={`mr-1 mb-1 btn ${populateClassName()}`}
    >
      {props.ele.tenGhe}
    </button>
  );
}
