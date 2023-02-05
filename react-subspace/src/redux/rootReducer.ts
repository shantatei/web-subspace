import { combineReducers } from "redux";
import AuthReducer from "./authSlice";
import PostReducer from "./postSlice";
import CommunityReducer from "./communitySlice";
import CommentReducer from "./commentSlice";
import CommunityUserReducer from "./communityUserSlice";

export default combineReducers({
    auth: AuthReducer,
    post: PostReducer,
    community: CommunityReducer,
    comment: CommentReducer,
    communityUser: CommunityUserReducer
});