import { combineReducers } from "redux";
import userDataReducer from "./user/userReducer";

const rootReducer = combineReducers({
  users: userDataReducer
});

export default rootReducer;
