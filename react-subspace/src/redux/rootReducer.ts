import { combineReducers } from "redux";
import AuthReducer from "./authSlice";
import PostReducer from "./postSlice";
import CommunityReducer from "./communitySlice";

export default combineReducers({
    auth: AuthReducer,
    post: PostReducer,
    community: CommunityReducer
});