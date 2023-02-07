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
import { communityapiToken } from "../../../api/community";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { deleteSelectedCommunity } from "../../../redux/communitySlice";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../../utils/routes";

interface DeleteCommunityProps {
  state: {
    communityid: number | null;
    isOpen: boolean;
  };
  setState: Dispatch<
    SetStateAction<{
      communityid: number | null;
      isOpen: boolean;
    }>
  >;
}

const DeleteCommunity = ({ state, setState }: DeleteCommunityProps) => {
  const closeModal = () => setState({ communityid: null, isOpen: false });
  const AuthUser = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const onSubmit = () => {
    const data = {
      community_id: state.communityid,
      _method: "DELETE",
    };
    console.log(data);
    communityapiToken(AuthUser.token)
      .post("/deleteCommunity", data)
      .then(
        (res) => {
          console.log(res.data);
          dispatch(deleteSelectedCommunity());
          closeModal();
          toast({
            description: "Your Community has been deleted",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          navigate(AppRoute.Home);
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
          Delete Community
        </ModalHeader>
        <ModalCloseButton top={3.5} />
        <ModalBody justifyContent="center" alignItems="center" display="flex">
          <Text>Are you sure you want to delete this community ?</Text>
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

export default DeleteCommunity;
