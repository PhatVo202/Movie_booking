import { SET_REGISTER_INFO } from "store/types/registerType";

const DEFAULT_STATE = {
  nd: null,
};

if (localStorage.getItem("REGISTER_INFO_KEY")) {
  DEFAULT_STATE.userInfo = JSON.parse(
    localStorage.getItem("REGISTER_INFO_KEY")
  );
}

export const registerUserReducer = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_REGISTER_INFO: {
      state.nd = payload;
      break;
    }

    default:
      break;
  }
  return { ...state };
};
