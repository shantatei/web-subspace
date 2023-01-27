import { Dispatch, SetStateAction, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useColorModeValue,
  Avatar,
  ModalFooter,
  Button,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  RenderProps,
} from "@chakra-ui/react";
import { themeColor } from "../../../utils/theme";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { authapiToken } from "../../../api/auth";
import { updateUser } from "../../../redux/authSlice";

interface ImagePreviewModalProps {
  state: {
    image: File | null | undefined;
    ImagePreview: string | null;
    isOpen: boolean;
  };
  setState: Dispatch<
    SetStateAction<{
      image: File | null | undefined;
      ImagePreview: string | null;
      isOpen: boolean;
    }>
  >;
}

const ImagePreviewModal = ({ state, setState }: ImagePreviewModalProps) => {
  const closeModal = () => setState({ ...state, isOpen: false });
  const AuthUser = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const toast = useToast();

  const onSubmit = (ProfileImage: File | null | undefined) => {
    const data = {
      username: AuthUser.user?.username,
      email: AuthUser.user?.email,
      profile_image_filename: ProfileImage,
      _method: "PUT",
    };
    setUploading(true);
    // api call
    authapiToken(AuthUser.token)
      .post("/editUser", data)
      .then(
        (res) => {
          console.log(res.data);
          setUploading(false);
          closeModal();
          dispatch(updateUser(res.data));
          toast({
            // description: `Successfully updated your profile picture. Looking good there ${AuthUser.user?.username}!`,
            status: "success",
            duration: 5000,
            isClosable: true,
            render: (props: RenderProps) => {
              return (
                <Alert status="success" variant="solid">
                  <AlertIcon />
                  <Box>
                    <AlertTitle>
                      Successfully updated your profile picture
                    </AlertTitle>
                    <AlertDescription>
                      Looking good there {AuthUser.user?.username}!
                    </AlertDescription>
                  </Box>
                </Alert>
              );
            },
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
      preserveScrollBarGap
      isOpen={state.isOpen}
      onClose={() => setState({ ...state, isOpen: false })}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader display="flex" justifyContent="center" alignItems="center">
          Update Profile Picture
        </ModalHeader>
        <ModalCloseButton top={3.5} disabled={uploading} />
        <ModalBody justifyContent="center" alignItems="center" display="flex">
          <Avatar
            border={useColorModeValue(
              "4px solid black",
              "4px solid var(--chakra-colors-gray-700)"
            )}
            size={"2xl"}
            src={state.ImagePreview!}
          ></Avatar>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={closeModal} disabled={uploading}>
            Cancel
          </Button>
          <Button
            bgColor={themeColor.primary}
            isLoading={uploading}
            _hover={{ bgColor: themeColor.secondary }}
            onClick={() => onSubmit(state.image)}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ImagePreviewModal;
