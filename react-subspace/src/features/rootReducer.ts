import { combineReducers } from "redux";
import AuthReducer from "./authSlice";

export default combineReducers({
    auth: AuthReducer
});