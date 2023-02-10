import {
  Card,
  CardBody,
  Heading,
  useColorModeValue,
  Text,
  Tag,
  Box,
  Image,
  CardFooter,
  HStack,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  IconButton,
  Portal,
} from "@chakra-ui/react";
import { themeColor } from "../../utils/theme";
import { Category, Post, User } from "../../utils/types";
import { useState } from "react";
import PostModal from "./PostModal";
import ReactTimeAgo from "react-time-ago";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { HamburgerIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";

interface PostProps {
  post: Post;
}

interface DeleteModalState {
  postid: number | null;
  isOpen: boolean;
}

const PostCard = ({ post }: PostProps) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
  });

  const [deleteModalState, setDeleteModalState] = useState<DeleteModalState>({
    postid: null,
    isOpen: false,
  });

  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [currentPostIndex, setCurrentPostIndex] = useState<number | null>(null);

  const handleEditComment = (index: number) => {
    setCurrentPostIndex(index);
  };

  const AuthUser = useSelector((state: RootState) => state.auth.user);

  const categories = post.category;

  return (
    <Card
      bgColor={useColorModeValue("white", "#1d1e1f")}
      borderRadius="md"
      borderWidth="1px"
      width="100%"
      _hover={{
        borderColor: useColorModeValue("#1d1e1f", "white"),
      }}
    >
      <CardBody>
        <Box
          mb={2}
          onClick={() => setModalState({ isOpen: true })}
          _hover={{
            cursor: "pointer",
          }}
        >
          {post.user?.map((owner: User) => {
            return (
              <HStack alignItems="baseline" mb={1} key={owner.id}>
                <Text>
                  Posted by {owner.username} {""}
                  <ReactTimeAgo
                    date={new Date(post.created_at)}
                    locale="en-US"
                  />
                </Text>
              </HStack>
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
        {isEditable && currentPostIndex == post.id ? (
          <EditPost
            title={post.title}
            text={post.text}
            setIsEditable={setIsEditable}
            post_id={post.id}
          />
        ) : (
          <Text>{post.text}</Text>
        )}
        {post.post_image_url == null ? null : (
          <Image
            src={post.post_image_url}
            alt={post.post_image_filename}
            maxH={"400px"}
            w="100%"
          />
        )}
      </CardBody>
      <CardFooter justify="space-between" flexWrap="wrap">
        <Box />
        {post.user_id == AuthUser?.id ? (
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
            />
            <MenuList>
              <MenuItem
                icon={<EditIcon />}
                display={post.text == null ? "none" : "flex"}
                onClick={() => {
                  handleEditComment(post.id);
                  setIsEditable(true);
                }}
              >
                Edit
              </MenuItem>
              <MenuItem
                icon={<DeleteIcon />}
                onClick={() => {
                  setDeleteModalState({
                    isOpen: true,
                    postid: post.id,
                  });
                }}
              >
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          []
        )}
      </CardFooter>
      <DeletePost state={deleteModalState} setState={setDeleteModalState} />
      <PostModal state={modalState} setState={setModalState} post={post} />
    </Card>
  );
};

export default PostCard;
