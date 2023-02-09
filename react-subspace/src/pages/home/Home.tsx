import { useEffect } from "react";
import {
  Container,
  VStack,
  Grid,
  GridItem,
  useBreakpointValue,
  Box,
} from "@chakra-ui/react";
import { postapi } from "../../api/post";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../redux/postSlice";
import { RootState } from "../../store";
import PostCard from "../../components/post/PostCard";
import { Post } from "../../utils/types";
import { communityapi } from "../../api/community";
import { SetCommunity } from "../../redux/communitySlice";
import CommunityFeed from "./components/CommunityFeed";
import HomeFeed from "./components/HomeFeed";
import { setComment } from "../../redux/commentSlice";
import { commentapi } from "../../api/comment";
import FilterPost from "./components/FilterPost";

const Home = () => {
  const posts = useSelector((state: RootState) => state.post.post);
  const communities = useSelector(
    (state: RootState) => state.community.communities
  );
  const dispatch = useDispatch();

  const fetchPost = () => {
    postapi.get("/showPosts").then(
      (res) => {
        dispatch(setPost(res.data));
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  };
  const fetchCommunities = () => {
    communityapi.get("/showCommunity").then(
      (res) => {
        dispatch(SetCommunity(res.data));
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  };

  const fetchComments = () => {
    commentapi.get("/showComments").then(
      (res) => {
        dispatch(setComment(res.data));
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  };

  useEffect(() => {
    fetchPost();
    fetchCommunities();
    fetchComments();
    console.log(import.meta.env.VITE_ENVIRONMENT_KEY);
  }, []);

  const display = useBreakpointValue({
    base: "none",
    md: "flex",
  });

  return (
    <Grid templateColumns="repeat(3, 1fr)">
      <GridItem colSpan={1} display={display} justifyContent="end">
        <Box >
          <CommunityFeed communities={communities} />
        </Box>
      </GridItem>
      <GridItem colSpan={{ base: 3, md: 1 }} mb={2}>
        <VStack mx={{ base: 2  }} mt={2}>
          {/* <FilterPost /> */}
          {posts.map((post: Post) => {
            return <PostCard post={post} key={post.id}></PostCard>;
          })}
        </VStack>
      </GridItem>
      <GridItem colSpan={1} display={display}>
        <Container>
          <HomeFeed />
        </Container>
      </GridItem>
    </Grid>
  );
};

export default Home;
