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
  Button,
} from "@chakra-ui/react";
import { themeColor } from "../utils/theme";
import { Category, Post } from "../utils/types";
import { BiLike, BiChat, BiSave } from "react-icons/bi";

interface PostProps {
  post: Post;
}
const PostCard = ({ post }: PostProps) => {
  const categories = post.category;

  return (
    <Card
      bgColor={useColorModeValue("white", "#1d1e1f")}
      borderRadius="md"
      borderWidth="1px"
      width="100%"
    >
      <CardBody>
        <Box mb={2}>
          <Heading size="md" mb={1}>
            {post.title}
          </Heading>
          {categories?.map((category: Category) => {
            return (
              <Tag size="md" bgColor={themeColor.primary} borderRadius="full">
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
      </CardBody>

      <CardFooter justify="space-between">
        <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
          Like
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<BiChat />}>
          Comment
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<BiSave />}>
          Save
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
