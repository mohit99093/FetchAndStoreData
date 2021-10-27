import { SET_USERS_DATA, EDIT_USER_DATA, DELETE_USER_DATA } from "./useType";

export const setUsersDataRedx = (payload) => {
  console.log("hi", payload);

  return {
    type: SET_USERS_DATA,
    payload
  };
};

export const editUserDataRedx = (payload) => {
  return {
    type: EDIT_USER_DATA,
    payload
  };
};

export const deleteUserDataRedx = (payload) => {
  return {
    type: DELETE_USER_DATA,
    payload
  };
};
