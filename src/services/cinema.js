import { axiosRequest } from "../configs/axios.config";

export const fetchMovieShowtimesApi = (id) => {
  return axiosRequest({
    url: `/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`,
    method: "GET",
  });
};
