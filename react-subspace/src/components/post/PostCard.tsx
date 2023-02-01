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
  Button
} from "@chakra-ui/react";
import { themeColor } from "../../utils/theme";
import { Category, Post, User } from "../../utils/types";
import { BiChat } from "react-icons/bi";
import { useState, useEffect } from "react";
import { authapi } from "../../api/auth";
import PostModal from "./PostModal";

interface PostProps {
  post: Post;
}
const PostCard = ({ post }: PostProps) => {
  const [user, setUser] = useState<Array<User>>();
  const [modalState, setModalState] = useState({
    isOpen: false,
  });

  const categories = post.category;

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

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Card
      bgColor={useColorModeValue("white", "#1d1e1f")}
      borderRadius="md"
      borderWidth="1px"
      width="100%"
      _hover={{
        borderColor: useColorModeValue("#1d1e1f", "white"),
      }}
      onClick={() => setModalState({ isOpen: true })}
    >
      <CardBody>
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
        <Image src={post.post_image_url} alt={post.post_image_filename} />
      </CardBody>
      <CardFooter>
        <Button variant="ghost" leftIcon={<BiChat />}>
          Comment
        </Button>
      </CardFooter>
      <PostModal state={modalState} setState={setModalState} post={post} />
    </Card>
  );
};

export default PostCard;
