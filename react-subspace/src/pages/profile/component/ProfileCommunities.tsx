import React, { FC ,useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Community } from "../../../utils/types";

const ProfileCommunities: FC = () => {
  // const communities = useSelector((state: RootState) => state.community.communities);
  // const user = useSelector((state: RootState) => state.user.user);
  // const [userCommunities, setUserCommunities] = useState<Array<Community>>([]);

  // const filterCommunities = () => {
  //   setUserCommunities([]);
  //   for (let index = 0; index < posts.length; index++) {
  //     const post = posts[index];
  //     if (post.user_id == user?.id) {
  //       setUserPosts((oldArray) => [...oldArray, post]);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   filterCommunities();
  // }, [communities]);

  // return (
  //   <SimpleGrid columns={2} spacing={10}>
  //     {userposts.map((post: Post) => {
  //       return <PostCard post={post} key={post.id}></PostCard>;
  //     })}
  //   </SimpleGrid>
  // );
  return (
    <div>
      User Communities
    </div>
  )
};

export default ProfileCommunities;
