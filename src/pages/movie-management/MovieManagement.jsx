import React, { useCallback, useState } from "react";
import { useMovieList } from "../../hooks/useMovieList";

import { Button, notification, Space, Table, Input, Tooltip } from "antd";

import {
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { deleteMovieApi, fetchMovieListApi } from "services/movie";
import { debounce } from "lodash";

export default function MovieManagement() {
  const movieList = useMovieList();
  const navigate = useNavigate();

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
      render: (text) => (
        <img
          src={text}
          alt=""
          width={100}
          height={100}
          style={{ objectFit: "cover", borderRadius: "10px" }}
        />
      ),
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
            <Tooltip placement="topRight" title="Chỉnh sửa">
              <Button
                onClick={() => navigate(`/admin/films/edit/${text.maPhim}`)}
                size="middle"
                type="primary"
              >
                <Space>
                  <EditOutlined />
                </Space>
              </Button>
            </Tooltip>

            <Tooltip placement="topRight" title="Xoá">
              <Button
                className="mx-2"
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
                size="middle"
                type="primary"
                danger
              >
                <Space>
                  <DeleteOutlined />
                </Space>
              </Button>
            </Tooltip>

            <Tooltip placement="topRight" title="Tạo lịch chiếu">
              <Button
                onClick={() => navigate(`/admin/films/showtime/${text.maPhim}`)}
                size="middle"
                danger
              >
                <Space>
                  <CalendarOutlined />
                </Space>
              </Button>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const handleSearch = useCallback(
    debounce(async (query) => {
      if (!query) {
        setFilterData(null);
        return;
      }
      try {
        const dataKey = await fetchMovieListApi(query);
        setFilterData(dataKey.data);
      } catch (error) {
        notification.error({
          message: "Tìm kiếm thất bại",
        });
      }
    }, 500),
    []
  );

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
          // onSearch={handleSearch}
          onChange={(event) => handleSearch(event.target.value)}
        />
        <Table
          columns={columns}
          dataSource={filterData === null ? movieList : filterData}
        />
      </div>
    </div>
  );
}
