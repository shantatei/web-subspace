import { useState } from "react";
import { Box, HStack, VStack, Text, Image } from "@chakra-ui/react";
import { Post } from "../../../utils/types";
import PostModal from "../../../components/post/PostModal";

interface PostFilteredBoxProps {
  post: Post;
}

const PostFilteredBox = ({ post }: PostFilteredBoxProps) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
  });
  return (
    <Box
      w="100%"
      key={post.id}
      p={2}
      justifyContent="start"
      onClick={() => setModalState({ isOpen: true })}
      _hover={{
        cursor: "pointer",
      }}
    >
      <HStack justifyContent="space-between">
        <VStack align="start">
          <Text fontWeight="semi-bold">{post.title}</Text>
          <Text pt="2" fontSize="sm">
            {post.text}
          </Text>
        </VStack>
        <Image
          display={post.post_image_url != null ? "flex" : "none"}
          src={post.post_image_url}
          boxSize="60px"
          objectFit="cover"
        />
      </HStack>
      <PostModal state={modalState} setState={setModalState} post={post} />
    </Box>
  );
};

export default PostFilteredBox;
