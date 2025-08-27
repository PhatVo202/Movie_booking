import React, { useContext, useEffect, useRef, useState } from "react";
import { Space, Tag, Button, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { MA_NHOM } from "constants";
import { inforTkApi, updateApi } from "services/user";
import { formatDate } from "utils";
import Swal from "sweetalert2";
import { LoadingContext } from "contexts/loading/LoadingContext";
import { useSelector } from "react-redux";
import moment from "moment";

export default function Profile() {
  const formRef = useRef(null);
  const taiKhoanReducer = useSelector(
    (state) => state.userReducer.userInfo.taiKhoan
  );
  const [_, setLoadingState] = useContext(LoadingContext);
  const [stateInfoTk, setStateInfoTk] = useState([]);
  const [stateValues, setStateValues] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: MA_NHOM,
    maLoaiNguoiDung: stateInfoTk.maLoaiNguoiDung,
    hoTen: "",
  });

  useEffect(() => {
    getInforTk();
  }, []);

  const getInforTk = async () => {
    setLoadingState({ isLoading: true });
    const result = await inforTkApi(taiKhoanReducer);
    setStateInfoTk(result.data);
    setLoadingState({ isLoading: false });
  };

  console.log({ thongtinVe: stateInfoTk.thongTinDatVe });
  const data = Array.isArray(stateInfoTk.thongTinDatVe)
    ? stateInfoTk.thongTinDatVe
    : [];

  const groupedData = data.reduce((acc, ve) => {
    // lấy ngày (bỏ giờ nếu chỉ quan tâm ngày)
    const dateOnly = ve.ngayDat.split("T")[0];
    const key = `${ve.tenPhim}_${dateOnly}`;

    let group = acc.find((item) => item.key === key);

    if (group) {
      group.maVe.push(ve.maVe);
      group.danhSachGhe.push(...ve.danhSachGhe);
    } else {
      acc.push({
        key,
        tenPhim: ve.tenPhim,
        ngayDat: dateOnly,
        thoiLuongPhim: ve.thoiLuongPhim,
        maVe: [ve.maVe],
        danhSachGhe: [...ve.danhSachGhe],
      });
    }

    return acc;
  }, []);

  console.log({ groupedData: groupedData });

  const renderContentTable = () => {
    // return groupedData.map((item, index) => {
    //   // console.log({ dataProfile: item });
    //   return (
    //     <tr
    //       key={index}
    //       className={(index + 1) % 2 === 0 ? "bg-light" : undefined}
    //     >
    //       <td>{index + 1}</td>
    //       <td>{item.tenPhim}</td>
    //       <td>{item.thoiLuongPhim}</td>
    //       <td>
    //         {item.danhSachGhe?.map((dsGhe, index) => {
    //           return <span key={index}>{dsGhe.tenCumRap},</span>;
    //         })}
    //       </td>

    //       <td>{formatDate(item.ngayDat)}</td>
    //       <td>{item.maVe}</td>
    //       <td>
    //         {item.danhSachGhe?.map((dsGhe, index) => {
    //           return <span key={index}>{dsGhe.tenGhe},</span>;
    //         })}
    //       </td>

    //       <td>{item.giaVe} vnd</td>
    //       {/* <td>{item.giaVe.toLocaleString()} vnd</td> */}
    //     </tr>
    //   );
    // });

    return stateInfoTk?.thongTinDatVe?.map((item, index) => {
      // console.log({ dataProfile: item });
      return (
        <tr
          key={index}
          className={(index + 1) % 2 === 0 ? "bg-light" : undefined}
        >
          <td>{index + 1}</td>
          <td>{item.tenPhim}</td>
          <td>{item.thoiLuongPhim} phút</td>
          <td>
            {item.danhSachGhe?.map((dsGhe, index) => {
              return <span key={index}>{dsGhe.tenCumRap}</span>;
            })}
          </td>

          <td>{`${moment(item.ngayDat).format("DD/MM/YYYY")} ~ ${moment(
            item.ngayDat
          ).format("hh:mm A")} `}</td>
          <td>{item.maVe}</td>
          <td>
            {item.danhSachGhe?.map((dsGhe, index) => {
              return <span key={index}>{dsGhe.tenGhe}</span>;
            })}
          </td>

          <td>{item.giaVe.toLocaleString()} vnd</td>
          {/* <td>{item.giaVe.toLocaleString()} vnd</td> */}
        </tr>
      );
    });
  };

  const updateForm = async (data) => {
    await updateApi(data);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Cập nhật thành công",
      showConfirmButton: false,
      confirmButtonText: "Ok",
      timer: 1500,
    });
  };

  useEffect(() => {
    if (stateInfoTk) {
      setStateValues({
        taiKhoan: stateInfoTk.taiKhoan,
        matKhau: stateInfoTk.matKhau,
        email: stateInfoTk.email,
        soDt: stateInfoTk.soDT,
        hoTen: stateInfoTk.hoTen,
        maLoaiNguoiDung: stateInfoTk.maLoaiNguoiDung,
        maNhom: stateInfoTk.maNhom,
      });
    }
  }, [stateInfoTk]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setStateValues({
      ...stateValues,
      [name]: value,
    });
  };

  const { taiKhoan, matKhau, email, soDt, hoTen } = stateValues || {};

  return (
    <>
      <div className="container-xl my-5" style={{ overflowX: "hidden" }}>
        <div className="row">
          <div className="col-12 col-sm-12 col-lg-3 col-xl-3 text-center">
            <Space className="mt-5">
              <Avatar
                style={{
                  backgroundColor: "#87d068",
                  width: "150px",
                  height: "150px",
                  lineHeight: "150px",
                }}
                icon={
                  <UserOutlined
                    className="text-center"
                    style={{ lineHeight: "150px", fontSize: "30px" }}
                  />
                }
              />
            </Space>
            <p className="mt-3">{stateInfoTk.hoTen}</p>
            <p>{stateInfoTk?.loaiNguoiDung?.tenLoai}</p>
          </div>
          <div className="col-12 col-sm-12 col-lg-9 col-xl-9 ">
            <div>
              <Space className="mt-5 ">
                <Tag color="#108ee9">
                  <h3>Thông tin người dùng</h3>
                </Tag>
              </Space>

              <form ref={formRef} className="form-group container mt-4">
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <label>Tài khoản:</label>
                    <input
                      type="text"
                      name="taiKhoan"
                      value={taiKhoan}
                      onChange={(event) => handleChange(event)}
                      className="form-control w-100"
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <label>Số điện thoại:</label>
                    <input
                      type="text"
                      name="soDt"
                      value={soDt}
                      onChange={(event) => handleChange(event)}
                      className="form-control w-100"
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <label>Mật khẩu:</label>
                    <input
                      type="text"
                      name="matKhau"
                      value={matKhau}
                      onChange={(event) => handleChange(event)}
                      className="form-control w-100"
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <label>Họ tên:</label>
                    <input
                      type="text"
                      name="hoTen"
                      value={hoTen}
                      onChange={(event) => handleChange(event)}
                      className="form-control w-100"
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <label>Email:</label>
                    <input
                      type="text"
                      name="email"
                      value={email}
                      onChange={(event) => handleChange(event)}
                      className="form-control w-100"
                    />
                  </div>
                  <div className="col-12 col-lg-12 mt-4 text-right">
                    <Space wrap>
                      <Button onClick={() => updateForm(stateValues)}>
                        Cập nhật
                      </Button>
                    </Space>
                  </div>
                </div>
              </form>

              <div className="container-xl">
                <h4 className="text-primary">Lịch sử đặt vé</h4>
                <div className="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Tên phim</th>
                        <th>Thời lượng phim</th>
                        <th>Tên rạp</th>
                        <th>Ngày đặt</th>
                        <th>Mã vé</th>
                        <th>Ghế</th>
                        <th>Tổng tiền</th>
                      </tr>
                    </thead>
                    <tbody>{renderContentTable()}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
