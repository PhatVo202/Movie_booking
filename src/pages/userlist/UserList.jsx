import React, { useCallback, useContext, useEffect, useState } from "react";
import { Space, Tag, Table, Button, Input, notification } from "antd";
import {
  deleteUserApi,
  getUserListApi,
  searchUserListApi,
} from "services/user";
import { LoadingContext } from "contexts/loading/LoadingContext";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserListAction } from "store/actions/userListAction";
import Swal from "sweetalert2";
import { debounce } from "lodash";

export default function UserList() {
  const navigate = useNavigate();
  const [setLoadingState] = useContext(LoadingContext);
  const [userList, setUserList] = useState([]);

  const dispatch = useDispatch();

  const [keyword, setKeyWord] = useState("");
  const [filterData, setFilterData] = useState(null);

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    const result = await getUserListApi();
    setUserList(result.data);
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUserApi(id);
      Swal.fire({
        title: "Xoá người dùng thành công!",
        text: "Hoàn tất!!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      notification.error({
        message: error.response.data.content,
      });
    }
  };

  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "1",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Mật khẩu",
      dataIndex: "matKhau",
      key: "2",
    },
    {
      title: "Loại người dùng",
      key: "3",
      dataIndex: "maLoaiNguoiDung",
      render: (tags) => (
        <Tag color={tags === "QuanTri" ? "volcano" : "geekblue"}>
          {tags === "QuanTri" ? "Quản trị" : "Khách hàng"}
        </Tag>
      ),
    },
    {
      title: "Email",
      key: "4",
      dataIndex: "email",
    },
    {
      title: "Họ tên",
      key: "5",
      dataIndex: "hoTen",
    },
    {
      title: "Sdt",
      key: "6",
      dataIndex: "soDt",
    },
    {
      title: "Thao tác",
      key: "7",
      render: (text) => {
        return (
          <div>
            <Button
              onClick={() => {
                dispatch(setUserListAction(text));
                navigate("/admin/edituser");
              }}
              size="middle"
              type="primary"
              className="mr-2"
            >
              <Space>
                <EditOutlined />
              </Space>
            </Button>

            <Button
              onClick={() => handleDeleteUser(text.taiKhoan)}
              size="middle"
              type="primary"
              danger
            >
              <Space>
                <DeleteOutlined />
              </Space>
            </Button>
          </div>
        );
      },
    },
  ];

  // const handleSearch = async () => {
  //   const dataKey = await searchUserListApi(keyword);
  //   setFilterData(dataKey.data);
  // };
  const handleSearch = useCallback(
    debounce(async (query) => {
      if (!query) {
        setFilterData(null);
        return;
      }
      try {
        // setLoading(true);
        const dataKey = await searchUserListApi(query);
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
      <Space>
        <Tag color="#2db7f5">
          <h4>Danh sách User</h4>
        </Tag>
      </Space>
      <div className="mt-3">
        <Button onClick={() => navigate("/admin/adduser")}>
          Thêm người dùng
        </Button>
      </div>
      <div className="mt-3">
        <Input.Search
          placeholder="Search here"
          enterButton
          className="mb-3"
          onChange={(event) => handleSearch(event.target.value)}
        />
        <Table
          columns={columns}
          dataSource={filterData === null ? userList : filterData}
        />
      </div>
    </div>
  );
}
