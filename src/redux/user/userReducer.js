import { SET_USERS_DATA, EDIT_USER_DATA, DELETE_USER_DATA } from "./useType";

const initialState = {
  data: []
};

const usersReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS_DATA: {
      console.log("payload", action.payload);

      return {
        ...state,
        data: action.payload
      };
    }

    case EDIT_USER_DATA: {
      const newData = state.data.map((user) =>
        user.id === action.payload.id ? { ...user, ...action.payload } : user
      );
      console.log("new data", newData);
      return {
        ...state,
        data: newData
      };
    }

    case DELETE_USER_DATA: {
      const newData = state.data.filter(
        (user) => user.id !== action.payload.id
      );
      return {
        ...state,
        data: newData
      };
    }

    default:
      return state;
  }
};

export default usersReducers;
