import { Dispatch, SetStateAction } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import { postapiToken } from "../../api/post";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { deletePost, setPost } from "../../redux/postSlice";
import { postapi } from "../../api/post";

interface DeletePostProps {
  state: {
    postid: number | null;
    isOpen: boolean;
  };
  setState: Dispatch<
    SetStateAction<{
      postid: number | null;
      isOpen: boolean;
    }>
  >;
}

const DeletePost = ({ state, setState }: DeletePostProps) => {
  const closeModal = () => setState({ postid: null, isOpen: false });
  const AuthUser = useSelector((state: RootState) => state.auth);
  const toast = useToast();
  const dispatch = useDispatch();
  const fetchPost = () => {
    postapi.get("/showPosts").then(
      (res) => {
        dispatch(setPost(res.data));
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  };
  const onSubmit = () => {
    postapiToken(AuthUser.token)
      .delete(`/deletePost/${state.postid}`)
      .then(
        (res) => {
          console.log(res.data);
          dispatch(deletePost(state.postid));
          fetchPost();
          closeModal();
          toast({
            description: "Your Post has been deleted",
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
          Delete Post
        </ModalHeader>
        <ModalCloseButton top={3.5} />
        <ModalBody justifyContent="center" alignItems="center" display="flex">
          <Text>Are you sure you want to delete your post ?</Text>
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

export default DeletePost;
