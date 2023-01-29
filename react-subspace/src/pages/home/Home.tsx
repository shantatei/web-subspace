import { useEffect } from "react";
import { Container, VStack } from "@chakra-ui/react";
import { postapi } from "../../api/post";
import { useDispatch, useSelector } from "react-redux";
import { SetPost } from "../../redux/postSlice";
import { RootState } from "../../store";
import PostCard from "../../components/PostCard";
import { Post } from "../../utils/types";

const Home = () => {
  const dispatch = useDispatch();

  const posts = useSelector((state: RootState) => state.post.post);

  const fetchPost = () => {
    postapi.get("/showPosts").then(
      (res) => {
        console.log(res.data);
        dispatch(SetPost(res.data));
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <Container
      size={{ sm: "xl", md: "2xl" }}
      pb={2}
    >
      <VStack>
        {posts.map((post: Post) => {
          return <PostCard post={post} key={post.id}></PostCard>;
        })}
      </VStack>
    </Container>
  );
};

export default Home;
