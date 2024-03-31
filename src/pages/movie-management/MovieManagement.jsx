import React, { useState } from "react";
import { useMovieList } from "../../hooks/useMovieList";

import { Button, notification, Space, Table, Input } from "antd";

import {
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { deleteMovieApi } from "services/movie";

export default function MovieManagement() {
  const movieList = useMovieList();
  const navigate = useNavigate();

  console.log(movieList);

  const [keyword, setKeyWord] = useState("");

  const [filterData, setFilterData] = useState(null);

  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      key: "1",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "2",
      render: (text) => <img src={text} alt="" width={50} height={50} />,
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      key: "3",
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      key: "4",
    },
    {
      title: "Hành động",
      key: "5",
      render: (text) => {
        return (
          <div className="d-flex">
            <Button
              onClick={() => navigate(`/admin/films/edit/${text.maPhim}`)}
              size="small"
            >
              <Space>
                <EditOutlined />
              </Space>
            </Button>
            <Button
              onClick={async () => {
                try {
                  await deleteMovieApi(text.maPhim);
                  notification.success({
                    message: "Xoá phim thành công",
                  });
                } catch (error) {
                  notification.error({
                    message: error.response.data.content,
                  });
                }
              }}
              size="small"
            >
              <Space>
                <DeleteOutlined />
              </Space>
            </Button>
            <Button
              onClick={() => navigate(`/admin/films/showtime/${text.maPhim}`)}
              size="small"
            >
              <Space>
                <CalendarOutlined />
              </Space>
            </Button>
          </div>
        );
      },
    },
  ];

  const handleSearch = () => {
    let filterTable = movieList.filter((item) => {
      return item.tenPhim.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
    });

    setFilterData(filterTable);
  };

  return (
    <div>
      <Button
        onClick={() => navigate("/admin/films/addnew")}
        type="primary"
        size="large"
        className="mb-5"
      >
        Thêm phim
      </Button>
      <div>
        <Input.Search
          placeholder="Search here"
          enterButton
          onSearch={handleSearch}
          onChange={(event) => setKeyWord(event.target.value)}
        />
        <Table
          columns={columns}
          dataSource={filterData === null ? movieList : filterData}
        />
      </div>
    </div>
  );
}
