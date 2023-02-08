import { combineReducers } from "redux";
import AuthReducer from "./authSlice";
import PostReducer from "./postSlice";
import CommunityReducer from "./communitySlice";
import CommentReducer from "./commentSlice";
import CommunityUserReducer from "./communityUserSlice";
import UserReducer from "./userSlice";
import SearchReducer from "./searchSlice";

export default combineReducers({
    auth: AuthReducer,
    post: PostReducer,
    user: UserReducer,
    community: CommunityReducer,
    comment: CommentReducer,
    communityUser: CommunityUserReducer,
    search : SearchReducer
});