import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
  HStack,
  Avatar,
  useColorModeValue,
  Button,
  IconButton,
  Text,
  Image,
  useToast,
} from "@chakra-ui/react";
import { themeColor } from "../../../utils/theme";
import { DeleteIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch, SetStateAction, useState, useRef, useEffect } from "react";
import { RootState } from "../../../store";
import { communityapiToken } from "../../../api/community";
import { SetCommunity, setSelectedCommunity } from "../../../redux/communitySlice";

interface EditCommunityProps {
  state: {
    name: string;
    about: string;
    community_id: number;
    community_image_url: string | undefined;
    community_banner_url: string | undefined;
    isOpen: boolean;
  };
  setState: Dispatch<
    SetStateAction<{
      name: string;
      about: string;
      community_id: number;
      community_image_url: string | undefined;
      community_banner_url: string | undefined;
      isOpen: boolean;
    }>
  >;
}

interface EditCommunityValues {
  name: string;
  about: string;
  community_id: number;
  community_image_filename?: File | null | undefined;
  community_banner_filename?: File | null | undefined;
  _method: "PUT";
}

const EditCommunity = ({ state, setState }: EditCommunityProps) => {
  const [iconImage, setIconImage] = useState<File | null | undefined>();
  const [iconPreview, setIconPreview] = useState<any>();
  const [bannerImage, setBannerImage] = useState<File | null | undefined>();
  const [bannerPreview, setBannerPreview] = useState<any>();
  const iconInputRef = useRef<HTMLInputElement | null>(null);
  const bannerInputRef = useRef<HTMLInputElement | null>(null);
  const AuthUser = useSelector((state: RootState) => state.auth);
  const [uploading, setUploading] = useState<boolean>(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditCommunityValues>();
  const closeModal = () => setState({ ...state, isOpen: false });
  const onSubmit = (data: EditCommunityValues) => {
    data.community_image_filename = iconImage;
    if (data.community_image_filename == undefined) {
      data.community_image_filename = null;
    }
    data.community_banner_filename = bannerImage;
    if (data.community_banner_filename == undefined) {
      data.community_banner_filename = null;
    }
    data.community_id = state.community_id;
    data._method = "PUT";
    console.log(data);
    setUploading(true);
    communityapiToken(AuthUser.token)
      .post("/editCommunity", data)
      .then(
        (res) => {
          console.log(res.data);
          dispatch(setSelectedCommunity(res.data.community))
          setUploading(false);
          reset();
          setIconImage(null);
          setBannerImage(null);
          closeModal();
          toast({
            description: "Your Community has been updated!",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        },
        (error) => {
          console.log(error.response.data);
        }
      );
  };

  useEffect(() => {
    if (iconImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIconPreview(reader.result);
      };
      reader.readAsDataURL(iconImage);
    } else {
      setIconPreview(null);
    }
  }, [iconImage]);

  useEffect(() => {
    if (bannerImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result);
      };
      reader.readAsDataURL(bannerImage);
    } else {
      setBannerPreview(null);
    }
  }, [bannerImage]);
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={state.isOpen}
      onClose={() => setState({ ...state, isOpen: false })}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader display="flex" justifyContent="center" alignItems="center">
          Edit Community
        </ModalHeader>
        <ModalCloseButton top={3.5} />
        <ModalBody
          justifyContent="center"
          alignItems="center"
          display="flex"
          mb={2}
        >
          <VStack
            id="editcommunityform"
            as="form"
            w="100%"
            justifyContent="center"
            onSubmit={handleSubmit(onSubmit)}
            alignItems="start"
          >
            <FormControl isInvalid={errors.name != null}>
              <FormLabel>Name</FormLabel>
              <Input
                defaultValue={state.name}
                focusBorderColor={themeColor.primary}
                {...register("name", {
                  required: "Name is Required",
                })}
              />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.about != null}>
              <FormLabel>About</FormLabel>
              <Input
                defaultValue={state.about}
                focusBorderColor={themeColor.primary}
                {...register("about", {
                  required: "About is Required",
                })}
              />
              <FormErrorMessage>{errors.about?.message}</FormErrorMessage>
            </FormControl>
            <FormLabel>Icon</FormLabel>
            <Box
              bgColor={useColorModeValue("white", "#1d1e1f")}
              borderRadius="lg"
              borderWidth="1px"
              w="100%"
            >
              <HStack m={4}>
                {iconImage == null && state.community_image_url == null ? (
                  <Avatar
                    size="lg"
                    border={`4px solid ${themeColor.secondary}`}
                    bg="darkgray"
                  />
                ) : (
                  <Avatar
                    src={
                      iconPreview == null
                        ? state.community_image_url
                        : iconPreview
                    }
                    size="lg"
                    border={`4px solid ${themeColor.secondary}`}
                  />
                )}
                <VStack align={"start"}>
                  <Input
                    hidden
                    type="file"
                    accept="image/*"
                    ref={iconInputRef}
                    onChange={(event: any | null) => {
                      const file: File = event.target.files[0];
                      if (file) {
                        setIconImage(file);
                      } else {
                        setIconImage(null);
                      }
                    }}
                  />
                  <HStack>
                    <Button
                      onClick={() => iconInputRef.current?.click()}
                      w="100%"
                      size="sm"
                      fontSize={{ base: "sm", md: "md" }}
                    >
                      Update Icon (Optional)
                    </Button>
                    <IconButton
                      size="sm"
                      variant="ghost"
                      aria-label="Delete Icon"
                      icon={<DeleteIcon color={themeColor.primary} />}
                      onClick={() => setIconImage(null)}
                    />
                  </HStack>
                  <Text fontSize="sm">Must be JPG,PNG,BMP,JPEG</Text>
                </VStack>
              </HStack>
            </Box>
            <FormLabel>Banner</FormLabel>
            <Box
              bgColor={useColorModeValue("white", "#1d1e1f")}
              borderRadius="lg"
              borderWidth="1px"
              w="100%"
            >
              <Box justifyContent="center" display="flex" mt={4}>
                {bannerImage == null && state.community_banner_url == null ? (
                  <Box
                    w="90%"
                    h="300px"
                    border={`4px solid ${themeColor.secondary}`}
                  />
                ) : (
                  <Image
                    border={`4px solid ${themeColor.secondary}`}
                    src={
                      bannerImage == null
                        ? state.community_banner_url
                        : bannerPreview
                    }
                    objectFit="fill"
                    w="90%"
                    h="300px"
                  />
                )}
              </Box>
              <VStack align="start" ml={5} mb={2}>
                <Input
                  hidden
                  type="file"
                  accept="image/*"
                  ref={bannerInputRef}
                  onChange={(event: any | null) => {
                    const file: File = event.target.files[0];
                    if (file) {
                      setBannerImage(file);
                    } else {
                      setBannerImage(null);
                    }
                  }}
                />
                <HStack>
                  <Button
                    onClick={() => bannerInputRef.current?.click()}
                    w="100%"
                    size="sm"
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    Update Banner (Optional)
                  </Button>
                  <IconButton
                    size="sm"
                    variant="ghost"
                    aria-label="Delete Icon"
                    icon={<DeleteIcon color={themeColor.primary} />}
                    onClick={() => setBannerImage(null)}
                  />
                </HStack>
                <Text fontSize="sm">Must be JPG,PNG,BMP,JPEG</Text>
              </VStack>
            </Box>
            <Button
              type="submit"
              variant="outline"
              w="100%"
              isLoading={uploading}
              bgColor={themeColor.primary}
              _hover={{ bgColor: themeColor.secondary }}
            >
              Edit Community
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditCommunity;
