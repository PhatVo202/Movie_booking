import { SET_USER_LIST_TYPE } from "store/types/userListType";

export const setUserListAction = (data) => {
  return {
    type: SET_USER_LIST_TYPE,
    payload: data,
  };
};
