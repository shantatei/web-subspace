import { combineReducers } from "redux";
import AuthReducer from "./authSlice";
import PostReducer from "./postSlice";

export default combineReducers({
    auth: AuthReducer,
    post: PostReducer
});