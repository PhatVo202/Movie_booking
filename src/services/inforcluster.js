import { axiosRequest } from "configs/axios.config";
import { MA_NHOM } from "constants";

export const fetchInforClusterApi = (maRap) => {
  return axiosRequest({
    maHeThongRap: maRap,
    url: `/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${MA_NHOM}`,
    method: "GET",
  });
};

export const fetchInfoRapApi = () => {
  return axiosRequest({
    url: `/QuanLyRap/LayThongTinHeThongRap`,
    method: "GET",
  });
};

export const fetchInfoCumRapApi = (rap) => {
  return axiosRequest({
    url: `/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${rap}`,
    method: "GET",
  });
};
