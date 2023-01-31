import {
  VStack,
  Box,
  Flex,
  Avatar,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Comment, User } from "../utils/types";

interface CommentProps {
  comments: Array<Comment>;
}

const PostComments = ({ comments }: CommentProps) => {
  if (!comments.length) {
    console.log("no comments");
    return <Text>No Comments Posted Yet</Text>;
  } else {
    return (
      <VStack
        alignItems="start"
        mt={2}
        p={2}
        borderWidth="1px"
        bgColor={useColorModeValue("white", "blackAlpha.200")}
      >
        {comments.map((comment: Comment) => {
          return (
            <Box key={comment.id}>
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                {comment.user?.map((owner: User) => {
                  return (
                    <Avatar
                      src={owner.profile_image_url}
                      size="md"
                      key={owner.id}
                    />
                  );
                })}
                <Box mr={8}>
                  {comment.user?.map((owner: User) => {
                    return (
                      <Text size="sm" as="i" key={owner.id}>
                        {owner.username}
                      </Text>
                    );
                  })}
                  <Text size="md"> {comment.text}</Text>
                </Box>
              </Flex>
            </Box>
          );
        })}
      </VStack>
    );
  }
};

export default PostComments;
