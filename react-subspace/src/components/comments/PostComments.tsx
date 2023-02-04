import {
  VStack,
  Box,
  Flex,
  Avatar,
  Text,
  useColorModeValue,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  IconButton,
  MenuList,
} from "@chakra-ui/react";
import { Comment, Post, User } from "../../utils/types";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import { HamburgerIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useState } from "react";
import EditComment from "./EditComment";
import DeleteComment from "./DeleteComment";
import { useEffect } from "react";
import en from "javascript-time-ago/locale/en.json";

TimeAgo.addLocale(en);

interface CommentProps {
  fetchComments: () => void;
  post: Post;
}
interface ModalState {
  commentid: number | null;
  isOpen: boolean;
}

const PostComments = ({ post, fetchComments }: CommentProps) => {
  const [modalState, setModalState] = useState<ModalState>({
    commentid: null,
    isOpen: false,
  });

  const AuthUser = useSelector((state: RootState) => state.auth.user);

  const commentsRedux = useSelector(
    (state: RootState) => state.comment.comments
  );

  const [isEditable, setIsEditable] = useState<boolean>(false);

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const [comments, setComments] = useState<Array<Comment>>([]);

  const handleEditComment = (index: number) => {
    setCurrentIndex(index);
  };

  const filterComments = () => {
    setComments([]);
    for (let index = 0; index < commentsRedux.length; index++) {
      const comment = commentsRedux[index];
      if (comment.post_id == post.id) {
        setComments((oldArray) => [...oldArray, comment]);
      }
    }
  };

  useEffect(() => {
    filterComments();
  }, [commentsRedux]);

  if (!comments.length) {
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
            <Box key={comment.id} p={2} w="100%">
              <HStack>
                <Flex flex="1" gap="4">
                  {comment.user?.map((owner: User) => {
                    return (
                      <Avatar
                        src={owner.profile_image_url}
                        size="md"
                        key={owner.id}
                      />
                    );
                  })}
                  <Box mr={8} w="100%">
                    {comment.user?.map((owner: User) => {
                      return (
                        <HStack key={owner.id} alignItems="baseline">
                          <Text fontSize="md">{owner.username}</Text>
                          <Text fontSize="small">
                            {comment.created_at !== comment.updated_at ? (
                              <>
                                Updated {""}
                                <ReactTimeAgo
                                  date={new Date(comment.updated_at)}
                                  locale="en-US"
                                />
                              </>
                            ) : (
                              <>
                                Posted {""}
                                <ReactTimeAgo
                                  date={new Date(comment.created_at)}
                                  locale="en-US"
                                />
                              </>
                            )}
                          </Text>
                        </HStack>
                      );
                    })}
                    {isEditable && currentIndex == comment.id ? (
                      <EditComment
                        text={comment.text}
                        fetchComments={fetchComments}
                        setIsEditable={setIsEditable}
                        comment_id={comment.id}
                      />
                    ) : (
                      <Text noOfLines={[1, 2, 3]}>{comment.text}</Text>
                    )}
                  </Box>
                </Flex>

                {comment.user_id == AuthUser?.id ? (
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
                        onClick={() => {
                          handleEditComment(comment.id);
                          setIsEditable(true);
                        }}
                      >
                        Edit
                      </MenuItem>
                      <MenuItem
                        icon={<DeleteIcon />}
                        onClick={() => {
                          setModalState({
                            isOpen: true,
                            commentid: comment.id,
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
              </HStack>
            </Box>
          );
        })}
        <DeleteComment
          state={modalState}
          setState={setModalState}
          fetchComments={fetchComments}
        />
      </VStack>
    );
  }
};

export default PostComments;
