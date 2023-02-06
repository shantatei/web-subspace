import { Dispatch, SetStateAction, useState, useEffect, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Avatar,
  HStack,
  Text,
  Box,
  useColorModeValue,
  IconButton,
  Image,
  useToast,
} from "@chakra-ui/react";
import { themeColor } from "../../utils/theme";
import { useForm } from "react-hook-form";
import { DeleteIcon } from "@chakra-ui/icons";
import { communityapiToken } from "../../api/community";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface CreateCommunityProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

interface CreateCommunityValues {
  name: string;
  about: string;
  community_image_filename?: File | null | undefined;
  community_banner_filename?: File | null | undefined;
}

const CreateCommunity = ({ isOpen, setIsOpen }: CreateCommunityProps) => {
  const closeModal = () => setIsOpen(false);
  const [iconImage, setIconImage] = useState<File | null | undefined>();
  const [iconPreview, setIconPreview] = useState<any>();
  const [bannerImage, setBannerImage] = useState<File | null | undefined>();
  const [bannerPreview, setBannerPreview] = useState<any>();
  const iconInputRef = useRef<HTMLInputElement | null>(null);
  const bannerInputRef = useRef<HTMLInputElement | null>(null);
  const AuthUser = useSelector((state: RootState) => state.auth);
  const [uploading, setUploading] = useState<boolean>(false);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateCommunityValues>();

  const onSubmit = (data: CreateCommunityValues) => {
    data.community_image_filename = iconImage;
    if (data.community_image_filename == undefined) {
      data.community_image_filename = null;
    }
    data.community_banner_filename = bannerImage;
    if (data.community_banner_filename == undefined) {
      data.community_banner_filename = null;
    }
    console.log(data);
    setUploading(true);
    communityapiToken(AuthUser.token)
      .post("/createCommunity", data)
      .then(
        (res) => {
          console.log(res.data);
          setUploading(false);
          reset();
          setIconImage(null);
          setBannerImage(null);
          closeModal();
          toast({
            description: "Your Community has been created!",
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
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader display="flex" justifyContent="center" alignItems="center">
          Create Community
        </ModalHeader>
        <ModalCloseButton top={3.5} />
        <ModalBody
          justifyContent="center"
          alignItems="center"
          display="flex"
          mb={2}
        >
          <VStack
            as="form"
            w="100%"
            justifyContent="center"
            onSubmit={handleSubmit(onSubmit)}
            alignItems="start"
          >
            <FormControl isInvalid={errors.name != null}>
              <FormLabel>Name</FormLabel>
              <Input
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
                <Avatar
                  src={iconPreview}
                  size="lg"
                  border={`4px solid ${themeColor.secondary}`}
                />
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
                      Upload Icon (Optional)
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
                {bannerImage == null ? (
                  <Box
                    w="90%"
                    h="300px"
                    border={`4px solid ${themeColor.secondary}`}
                  />
                ) : (
                  <Image
                    border={`4px solid ${themeColor.secondary}`}
                    src={bannerPreview}
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
                    Upload Banner (Optional)
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
              isLoading={uploading}
              w="100%"
              bgColor={themeColor.primary}
              _hover={{ bgColor: themeColor.secondary }}
            >
              Create Community
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateCommunity;
