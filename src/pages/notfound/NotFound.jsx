import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export default function NotFound() {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 50,
      }}
      spin
    />
  );

  return (
    <div className="mainbox">
      <div className="err">4</div>
      <div className="mainbox--icon">
        <Spin indicator={antIcon} />
      </div>
      <div className="err2">4</div>
      <div className="msg">
        Maybe this page moved? Got deleted? Is hiding out in quarantine? Never
        existed in the first place?
        <p>
          Let's go <Link to="/">home</Link> and try from there.
        </p>
      </div>
    </div>
  );
}
