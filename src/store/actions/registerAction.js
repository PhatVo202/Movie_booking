import { SET_REGISTER_INFO } from "store/types/registerType";

//action register
export const setRegisterInfoAction = (data) => {
  return {
    type: SET_REGISTER_INFO,
    payload: data,
  };
};
