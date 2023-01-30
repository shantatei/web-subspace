import { useEffect, useState } from "react";
import {
  VStack,
  Box,
  Flex,
  Avatar,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Comment, User } from "../utils/types";
import { authapi, authapiDev } from "../api/auth";

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
        // borderRadius="md"
        borderWidth="1px"
        bgColor={useColorModeValue("white", "blackAlpha.200")}
      >
        {comments.map((comment: Comment) => {
          const [user, setUser] = useState<Array<User>>();
          const fetchUser = () => {
            authapiDev.get(`/profile/${comment.user_id}`).then(
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
            <Box key={comment.id}>
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                {user?.map((owner: User) => {
                  return <Avatar src={owner.profile_image_url} size="md" />;
                })}
                <Box mr={8}>
                  {user?.map((owner: User) => {
                    return (
                      <Text size="sm" as="i">
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
