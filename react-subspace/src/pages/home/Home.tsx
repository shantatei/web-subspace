import { useEffect } from "react";
import {
  VStack,
  Grid,
  GridItem,
  useBreakpointValue,
  Box,
  Text,
  Heading,
  useColorModeValue,
  Progress,
} from "@chakra-ui/react";
import { postapi } from "../../api/post";
import { useDispatch, useSelector } from "react-redux";
import { setCategories, setPost } from "../../redux/postSlice";
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
import { themeColor } from "../../utils/theme";

const Home = () => {
  const posts = useSelector((state: RootState) => state.post.post);
  const communities = useSelector(
    (state: RootState) => state.community.communities
  );
  const dispatch = useDispatch();

  const fetchPost = () => {
    postapi.get("/showPosts").then(
      (res) => {
        dispatch(setPost(res.data.reverse()));
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  };

  const fetchCategories = () => {
    postapi.get("/categories").then(
      (res) => {
        dispatch(setCategories(res.data));
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
    fetchCategories();
    console.log(import.meta.env.VITE_ENVIRONMENT_KEY);
  }, []);

  const display = useBreakpointValue({
    base: "none",
    md: "flex",
  });

  return (
    <Grid templateColumns="repeat(3, 1fr)" w="100%">
      <GridItem colSpan={1} display={display} justifyContent="end">
        <Box mt={2}>
          <CommunityFeed communities={communities} />
        </Box>
      </GridItem>
      <GridItem colSpan={{ base: 3, md: 1 }} mb={2}>
        {/* <FilterPost /> */}
        {!posts.length ? (
          <Box
            w="100%"
            bgColor={useColorModeValue("white", "#1d1e1f")}
            borderRadius="md"
            borderWidth="1px"
            h="max-content"
            position="sticky"
            top={"5rem"}
          >
            <VStack w="100%" pb={2}>
              <Box
                bgColor={themeColor.secondary}
                objectFit="cover"
                borderTopRadius="md"
                objectPosition="center"
                boxSize="10"
                w="100%"
              />
              <VStack p={3} alignItems="start" w="100%">
                <Box w="100%">
                  <Heading fontSize="md">Loading Data</Heading>
                  <Text>Please be patient, Fetching Post ...</Text>
                  <Progress size="xs" isIndeterminate />
                </Box>
              </VStack>
            </VStack>
          </Box>
        ) : (
          <VStack mx={{ base: 2 }} mt={2}>
            {posts.map((post: Post) => {
              return <PostCard post={post} key={post.id}></PostCard>;
            })}
          </VStack>
        )}
      </GridItem>
      <GridItem colSpan={1} display={display}>
        <HomeFeed />
      </GridItem>
    </Grid>
  );
};

export default Home;
