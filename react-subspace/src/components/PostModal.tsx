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
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Post, User, Category } from "../utils/types";
import { authapi } from "../api/auth";
import { themeColor } from "../utils/theme";
import CommunityCard from "./CommunityCard";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import PostComments from "./PostComments";
import CreateComment from "./CreateComment";

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

  const comments = useSelector((state: RootState) => state.comment.comments);

  const categories = post.category;

  const fetchUser = () => {
    authapi.get(`/profile/${post.user_id}`).then(
      (res) => {
        console.log(res.data);
        setUser(res.data);
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <Modal
      isOpen={state.isOpen}
      size={{ sm: "sm", md: "5xl" }}
      onClose={() => setState({ ...state, isOpen: false })}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader display="flex" justifyContent="center" alignItems="center">
          {post.title}
        </ModalHeader>
        <ModalCloseButton top={3.5} />

        <ModalBody>
          <Grid
            templateColumns="repeat(5, 1fr)"
            // templateRows="repeat(2, 1fr)"
            width="100%"
          >
            <GridItem colSpan={{ sm: 5, md: 3 }}>
              <VStack align="start">
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
            <GridItem colSpan={2} display={{ sm: "none", md: "flex" }}>
              <CommunityCard />
            </GridItem>
            <GridItem colSpan={{ sm: 5, md: 3 }} mt={2}>
              <CreateComment />
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
