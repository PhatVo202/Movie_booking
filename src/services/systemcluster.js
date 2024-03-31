import { axiosRequest } from "configs/axios.config";

export const fetchSystemClusterApi = () => {
  return axiosRequest({
    url: `/QuanLyRap/LayThongTinHeThongRap`,
    method: "GET",
  });
};
