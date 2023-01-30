import { useEffect } from "react";
import { Container, VStack, Grid, GridItem } from "@chakra-ui/react";
import { postapi } from "../../api/post";
import { useDispatch, useSelector } from "react-redux";
import { SetPost } from "../../redux/postSlice";
import { RootState } from "../../store";
import PostCard from "../../components/PostCard";
import { Post } from "../../utils/types";
import { communityapi, communityapiDev } from "../../api/community";
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
  }, []);

  return (
    <Grid templateColumns="repeat(12, 1fr)" width="100%">
      <GridItem colSpan={3}>
        <Container display={{ sm: "none", md: "flex" }}>
          <CommunityFeed communities={communities} />
        </Container>
      </GridItem>
      <GridItem colSpan={{ sm: 12, md: 6 }}>
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
