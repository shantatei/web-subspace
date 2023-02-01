import { Dispatch, SetStateAction } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import { commentapiToken } from "../../api/comment";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface DeleteCommentProps {
  state: {
    commentid: number | null;
    isOpen: boolean;
  };
  setState: Dispatch<
    SetStateAction<{
      commentid: number | null;
      isOpen: boolean;
    }>
  >;
  fetchComments: () => void;
}

const DeleteComment = ({
  state,
  setState,
  fetchComments,
}: DeleteCommentProps) => {
  const closeModal = () => setState({ commentid: null, isOpen: false });
  const AuthUser = useSelector((state: RootState) => state.auth);
  const toast = useToast();
  const onSubmit = () => {
    const data = {
      comment_id: state.commentid,
      _method: "DELETE",
    };
    // api call
    commentapiToken(AuthUser.token)
      .post("/deleteComment", data)
      .then(
        (res) => {
          console.log(res.data);
          fetchComments();
          closeModal();
          toast({
            description: "Your Comment has been deleted",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        },
        (error) => {
          console.log(error.response.data);
        }
      );
  };
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={state.isOpen}
      onClose={() => setState({ ...state, isOpen: false })}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader display="flex" justifyContent="center" alignItems="center">
          Delete Profile Picture
        </ModalHeader>
        <ModalCloseButton top={3.5} />
        <ModalBody justifyContent="center" alignItems="center" display="flex">
          <Text>Are you sure you want to delete your comment ?</Text>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={closeModal}>
            Cancel
          </Button>
          <Button
            bgColor="red"
            _hover={{ bgColor: "red" }}
            onClick={() => onSubmit()}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteComment;
