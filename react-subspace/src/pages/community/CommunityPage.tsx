import {
  VStack,
  Box,
  Image,
  Grid,
  GridItem,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { themeColor } from "../../utils/theme";
import { useLocation } from "react-router-dom";
import { Community } from "../../utils/types";
import { CommunityBanner } from "./components/CommunityBanner";
import { Post } from "../../utils/types";
import PostCard from "../../components/post/PostCard";
import { CommunityCard } from "../../components/community/CommunityCard";
import { useState, useEffect } from "react";
import { postapi } from "../../api/post";
import CommunityMembers from "../../components/community/CommunityMembers";

const CommunityPage = () => {
  const location = useLocation();
  const community: Community = location.state.community;
  const [communityPost, setCommunityPost] = useState<Array<Post>>([]);

  const fetchCommunityPost = () => {
    postapi.get(`/postByCommunity/${community.id}`).then(
      (res) => {
        setCommunityPost(res.data.posts);
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  };

  function Banner() {
    if (community.community_banner_url) {
      return (
        <Image
          borderRadius="md"
          borderBottomRadius="none"
          borderWidth="1px"
          src={community.community_banner_url}
          objectFit="cover"
          w="full"
          h={40}
        />
      );
    }
    return <Box bgColor={themeColor.secondary} w="full" h={40} />;
  }

  function CommunityPosts() {
    if (!communityPost.length) {
      return <Text>No Post Posted Yet</Text>;
    }
    return (
      <>
        {communityPost.map((post: Post) => {
          return <PostCard post={post} key={post.id}></PostCard>;
        })}
      </>
    );
  }

  useEffect(() => {
    fetchCommunityPost();
  }, []);

  const display = useBreakpointValue({
    base: "none",
    md: "flex",
  });

  return (
    <VStack w={{ base: "90%", md: "70%" }} h="100%">
      <Banner />
      <CommunityBanner community={community} />
      <Grid templateColumns="repeat(3, 1fr)" w="100%">
        <GridItem colSpan={{ base: 3, md: 2 }} mb={2}>
          <VStack>
            <CommunityPosts />
          </VStack>
        </GridItem>
        <GridItem colSpan={1} display={display} justifyContent="right">
          <VStack w="100%">
            <CommunityCard community={community} bgColorDark="#1d1e1f" />
            <CommunityMembers community={community} bgColorDark="#1d1e1f" />
          </VStack>
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default CommunityPage;
