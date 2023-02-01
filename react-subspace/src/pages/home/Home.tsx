import { useEffect } from "react";
import {
  Container,
  VStack,
  Grid,
  GridItem,
  useBreakpointValue,
} from "@chakra-ui/react";
import { postapi } from "../../api/post";
import { useDispatch, useSelector } from "react-redux";
import { SetPost } from "../../redux/postSlice";
import { RootState } from "../../store";
import PostCard from "../../components/post/PostCard";
import { Post } from "../../utils/types";
import { communityapi } from "../../api/community";
import { SetCommunity } from "../../redux/communitySlice";
import CommunityFeed from "./components/CommunityFeed";

const Home = () => {
  const dispatch = useDispatch();

  const posts = useSelector((state: RootState) => state.post.post);
  const communities = useSelector(
    (state: RootState) => state.community.communities
  );

  const fetchPost = () => {
    postapi.get("/showPosts").then(
      (res) => {
        dispatch(SetPost(res.data));
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

  useEffect(() => {
    fetchPost();
    fetchCommunities();
    console.log(import.meta.env.VITE_ENVIRONMENT_KEY);
  }, []);

  const display = useBreakpointValue({
    base: "none",
    md: "flex",
  });

  return (
    <Grid templateColumns="repeat(12, 1fr)" width="100%">
      <GridItem colSpan={3} display={display}>
        <Container>
          <CommunityFeed communities={communities} />
        </Container>
      </GridItem>
      <GridItem colSpan={{ base: 12, md: 6 }} mb={2}>
        <Container>
          <VStack>
            {posts.map((post: Post) => {
              return <PostCard post={post} key={post.id}></PostCard>;
            })}
          </VStack>
        </Container>
      </GridItem>
    </Grid>
  );
};

export default Home;
