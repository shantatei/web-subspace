import { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Post } from "../../../utils/types";
import PostCard from "../../../components/post/PostCard";
import { SimpleGrid, Text } from "@chakra-ui/react";

const ProfilePosts: FC = () => {
  const posts = useSelector((state: RootState) => state.post.post);
  const user = useSelector((state: RootState) => state.user.user);
  const [userposts, setUserPosts] = useState<Array<Post>>([]);

  const filterComments = () => {
    setUserPosts([]);
    for (let index = 0; index < posts.length; index++) {
      const post = posts[index];
      if (post.user_id == user?.id) {
        setUserPosts((oldArray) => [...oldArray, post]);
      }
    }
  };

  useEffect(() => {
    filterComments();
  }, [posts, user]);

  return (
    <>
      {!userposts.length ? (
        <Text>Wow Such Empty !</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          {userposts.map((post: Post) => {
            return <PostCard post={post} key={post.id}></PostCard>;
          })}
        </SimpleGrid>
      )}
    </>
  );
};
export default ProfilePosts;
