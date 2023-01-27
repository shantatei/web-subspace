import { useState, useEffect, useRef } from "react";
import {
  Container,
  Heading,
  Box,
  Text,
  VStack,
  Avatar,
  useColorModeValue,
  Button,
  HStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { themeColor } from "../../utils/theme";
import { useForm } from "react-hook-form";
import { authapiToken } from "../../api/auth";
import ImagePreviewModal from "./components/ImagePreviewModal";
import { updateUser } from "../../redux/authSlice";
import ChangePassword from "./components/ChangePassword";

interface EditProfileValues {
  email: string;
  username: string;
  profile_image_filename: string;
  _method: string;
}

const Settings = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<File | null | undefined>();
  const [preview, setPreview] = useState<any>();
  const AuthUser = useSelector((state: RootState) => state.auth);
  const [modalState, setModalState] = useState({
    image: image,
    ImagePreview: preview,
    isOpen: false,
  });
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setModalState({
          image: image,
          ImagePreview: reader.result,
          isOpen: true,
        });
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileValues>();

  const onSubmitUpdate = (data: EditProfileValues) => {
    data._method = "PUT";
    // api call
    authapiToken(AuthUser.token)
      .post("/editUser", data)
      .then(
        (res) => {
          console.log(res.data);
          dispatch(updateUser(res.data));
          toast({
            description: "Profile Settings Updated",
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

  return (
    <Container size={{ sm: "xl", md: "2xl" }}>
      <Heading>Settings</Heading>
      <VStack align={"start"}>
        <Text mt="2" fontSize={{ base: "md", lg: "lg" }}>
          Profile Picture
        </Text>
        <Box
          bgColor={useColorModeValue("white", "#1d1e1f")}
          borderRadius="lg"
          borderWidth="1px"
          w="100%"
        >
          <HStack>
            <Avatar
              m={4}
              border={useColorModeValue(
                "4px solid black",
                "4px solid var(--chakra-colors-gray-700)"
              )}
              size={"xl"}
              src={AuthUser.user?.profile_image_url}
            ></Avatar>
            <VStack align={"center"}>
              <Input
                hidden
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={(event: any | null) => {
                  const file: File = event.target.files[0];
                  if (file) {
                    setImage(file);
                  } else {
                    setImage(null);
                  }
                }}
              />
              <Button m={2} onClick={() => inputRef.current?.click()}>
                Update Profile Picture
              </Button>
              <Text fontSize="sm">Must be JPG,PNG,BMP,JPEG</Text>
            </VStack>
          </HStack>
        </Box>
        <Text mt="2" fontSize={{ base: "md", lg: "lg" }}>
          Profile Settings
        </Text>
        <Box
          bgColor={useColorModeValue("white", "#1d1e1f")}
          borderRadius="lg"
          borderWidth="1px"
          w="100%"
        >
          <VStack
            as="form"
            m={2}
            justifyContent="center"
            onSubmit={handleSubmit(onSubmitUpdate)}
          >
            <FormControl isInvalid={errors.username != null}>
              <FormLabel>Username</FormLabel>
              <Input
                defaultValue={AuthUser.user?.username}
                focusBorderColor={themeColor.primary}
                {...register("username", {
                  required: "Username is Required",
                })}
              />
              <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.email != null}>
              <FormLabel>Email</FormLabel>
              <Input
                defaultValue={AuthUser.user?.email}
                focusBorderColor={themeColor.primary}
                {...register("email", {
                  required: "Email is Required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <Button type="submit" w="100%">
              Save Changes
            </Button>
          </VStack>
        </Box>
        <ChangePassword />
      </VStack>
      <ImagePreviewModal state={modalState} setState={setModalState} />
    </Container>
  );
};

export default Settings;
