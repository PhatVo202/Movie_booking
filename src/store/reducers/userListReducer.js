import { SET_USER_LIST_TYPE } from "store/types/userListType";

const STATE_USER_LIST = {
  userList: {},
};

export const userListReducer = (state = STATE_USER_LIST, action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_USER_LIST_TYPE: {
      state.userList = payload;
      break;
    }

    default:
      break;
  }
  return { ...state };
};
