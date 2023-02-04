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
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  IconButton,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Post, User, Category, Community } from "../../utils/types";
import { themeColor } from "../../utils/theme";
import { CommunityCard } from "../community/CommunityCard";
import PostComments from "../comments/PostComments";
import CreateComment from "../comments/CreateComment";
import { commentapi } from "../../api/comment";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import ReactTimeAgo from "react-time-ago";
import { setComment } from "../../redux/commentSlice";
import { HamburgerIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";

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
  const categories = post.category;
  const AuthUser = useSelector((state: RootState) => state.auth.user);
  const [community, SetCommunity] = useState<Community>({
    id: 1,
    name: "test",
    about: "string",
    community_image_url: "string",
    community_image_filename: "string",
    community_banner_url: "string",
    community_banner_filename: "string",
    created_at: "string",
  });

  const communities = useSelector(
    (state: RootState) => state.community.communities
  );

  const dispatch = useDispatch();

  const fetchCommunity = () => {
    for (let index = 0; index < communities.length; index++) {
      const community = communities[index];
      if (community.id == post.community_id) {
        SetCommunity(community);
      }
    }
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
    fetchCommunity();
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
                h="100%"
                align="start"
                borderRadius="md"
                borderWidth="1px"
                bgColor={useColorModeValue("white", "blackAlpha.100")}
              >
                <Box mb={2}>
                  {post.user?.map((owner: User) => {
                    return (
                      <Text key={owner.id} mb={1}>
                        Posted by {owner.username}{" "}
                        <ReactTimeAgo
                          date={new Date(post.created_at)}
                          locale="en-US"
                        />
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
                {post.post_image_url == null ? null : (
                  <Image
                    src={post.post_image_url}
                    alt={post.post_image_filename}
                    h="400px"
                    w="100%"
                  />
                )}
                {post.user_id == AuthUser?.id ? (
                  <Menu >
                    <MenuButton
                      as={IconButton}
                      aria-label="Options"
                      icon={<HamburgerIcon />}
                      variant="outline"
                    />
                    <MenuList>
                      <MenuItem icon={<EditIcon />}>Edit</MenuItem>
                      <MenuItem icon={<DeleteIcon />}>Delete</MenuItem>
                    </MenuList>
                  </Menu>
                ) : (
                  []
                )}
              </VStack>
            </GridItem>
            <GridItem colSpan={2} display={display} justifyContent="center">
              <CommunityCard
                community={community}
                bgColorDark="blackAlpha.100"
              />
            </GridItem>
            <GridItem colSpan={{ base: 5, md: 3 }} mt={2}>
              <CreateComment post={post} fetchComments={fetchComments} />
              <Divider orientation="horizontal" />
              <PostComments post={post} fetchComments={fetchComments} />
            </GridItem>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PostModal;
