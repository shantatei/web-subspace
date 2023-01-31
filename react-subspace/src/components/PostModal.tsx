import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  Heading,
  Text,
  Tag,
  Image,
  Grid,
  GridItem,
  VStack,
  Divider,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Post, User, Category } from "../utils/types";
import { authapi } from "../api/auth";
import { themeColor } from "../utils/theme";
import CommunityCard from "./CommunityCard";
import PostComments from "./PostComments";
import CreateComment from "./CreateComment";
import { commentapi } from "../api/comment";
import { Comment } from "../utils/types";

interface PostModalProps {
  state: {
    isOpen: boolean;
  };
  setState: Dispatch<
    SetStateAction<{
      isOpen: boolean;
    }>
  >;
  post: Post;
}

const PostModal = ({ state, setState, post }: PostModalProps) => {
  const [user, setUser] = useState<Array<User>>();

  const categories = post.category;

  const [comments, setComments] = useState<Array<Comment>>([]);

  const fetchUser = () => {
    authapi.get(`/profile/${post.user_id}`).then(
      (res) => {
        setUser(res.data);
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  };

  const fetchComments = () => {
    commentapi.get(`/commentByPost/${post.id}`).then(
      (res) => {
        setComments(res.data);
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  };

  useEffect(() => {
    fetchUser();
    fetchComments();
  }, []);

  const display = useBreakpointValue({
    base: "none",
    md: "flex",
  });

  return (
    <Modal
      isOpen={state.isOpen}
      size={{ base: "sm", md: "5xl" }}
      onClose={() => setState({ ...state, isOpen: false })}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader display="flex" justifyContent="center" alignItems="center">
          {post.title}
        </ModalHeader>
        <ModalCloseButton top={3.5} />

        <ModalBody>
          <Grid templateColumns="repeat(5, 1fr)" width="100%">
            <GridItem colSpan={{ base: 5, md: 3 }}>
              <VStack
                p={2}
                align="start"
                borderRadius="md"
                borderWidth="1px"
                bgColor={useColorModeValue("white", "blackAlpha.100")}
              >
                <Box mb={2}>
                  {user?.map((owner: User) => {
                    return (
                      <Text key={owner.id} mb={1}>
                        Posted by {owner.username}{" "}
                      </Text>
                    );
                  })}
                  <Heading size="md" mb={1}>
                    {post.title}
                  </Heading>
                  {categories?.map((category: Category) => {
                    return (
                      <Tag
                        size="md"
                        bgColor={themeColor.primary}
                        borderRadius="full"
                        key={category.id}
                      >
                        {category.category_name}
                      </Tag>
                    );
                  })}
                </Box>
                <Text>{post.text}</Text>
                <Image
                  src={post.post_image_url}
                  alt={post.post_image_filename}
                />
              </VStack>
            </GridItem>
            <GridItem colSpan={2} display={display} justifyContent="center">
              <CommunityCard />
            </GridItem>
            <GridItem colSpan={{ base: 5, md: 3 }} mt={2}>
              <CreateComment post={post} fetchComments={fetchComments} />
              <Divider orientation="horizontal" />
              <PostComments comments={comments} />
            </GridItem>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PostModal;
