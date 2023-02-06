import { useState, useRef, useEffect } from "react";
import {
  Container,
  Heading,
  VStack,
  useColorModeValue,
  Box,
  Input,
  Textarea,
  FormControl,
  FormErrorMessage,
  Button,
  FormLabel,
  HStack,
  Avatar,
  Text,
  Image,
  useToast,
} from "@chakra-ui/react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { themeColor } from "../../utils/theme";
import Select, { SingleValue } from "react-select";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Community } from "../../utils/types";
import { postapiToken } from "../../api/post";
import { ActionMeta } from "react-select";

export interface PostValues {
  community_id: number | null;
  title: string;
  text?: string | null;
  post_image_filename?: File | null | undefined;
  category_id: number;
}

interface Options {
  value: number;
  label: string;
  key: number;
  image: string;
}

const CreatePost = () => {
  const communities = useSelector(
    (state: RootState) => state.community.communities
  );
  const AuthUser = useSelector((state: RootState) => state.auth);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<File | null | undefined>();
  const [preview, setPreview] = useState<any>();
  const [communityId, setCommunityId] = useState<number | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PostValues>();
  const toast = useToast();

  const onSubmit: SubmitHandler<PostValues> = (data: PostValues) => {
    if (data.text == "") {
      data.text = null;
    }
    data.post_image_filename = image;
    if (data.post_image_filename == undefined) {
      data.post_image_filename = null;
    }
    console.log(data);
    setUploading(true);
    postapiToken(AuthUser.token)
      .post("/createPost", data)
      .then(
        (res) => {
          console.log(res.data);
          setUploading(false);
          toast({
            description: "Your Post was a Success !",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          reset();
          setImage(null);
        },
        (error) => {
          console.log(error.response.data);
        }
      );
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  return (
    <Container size={{ sm: "xl", md: "2xl" }} pb={2}>
      <Heading>Create a post </Heading>
      <VStack
        align="start"
        w="100%"
        mt={2}
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl isInvalid={errors.community_id != null}>
          <FormLabel>Choose a Community</FormLabel>
          <Controller
            name="community_id"
            control={control}
            rules={{ required: "Please Select a Community" }}
            render={({ field: { onChange, ref } }) => (
              <Select
                ref={ref}
                onChange={(option) => onChange(option?.value)}
                // onChange={(option: SingleValue<Options>) => {
                //   onChange(option?.value);
                // }}
                options={communities.map((community: Community) => {
                  return {
                    label: community.name,
                    value: community.id,
                    key: community.id,
                    image: community.community_image_url,
                  };
                })}
                formatOptionLabel={(community) => (
                  <HStack>
                    <Avatar size="xs" src={community.image} />
                    <Text>{community.label}</Text>
                  </HStack>
                )}
                isSearchable
                isClearable
                placeholder="Choose a Community"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: useColorModeValue("white", "#1d1e1f"),
                    border: "none",
                    boxShadow: "none",
                  }),
                  option: (styles, state) => ({
                    ...styles,
                    backgroundColor: state.isSelected ? "" : "",
                    ":hover": {
                      cursor: "pointer",
                    },
                  }),
                  container: (base) => ({
                    ...base,
                    width: "100%",
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: useColorModeValue("white", "#1d1e1f"),
                  }),
                  placeholder: (base) => ({
                    ...base,
                    fontSize: "1em",
                    color: useColorModeValue("black", "white"),
                    fontWeight: 400,
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: useColorModeValue("black", "white"),
                  }),
                  input: (base, props) => ({
                    ...base,
                    color: useColorModeValue("black", "white"),
                  }),
                }}
              />
            )}
          />
          <FormErrorMessage>{errors.community_id?.message}</FormErrorMessage>
        </FormControl>
        <Box
          bgColor={useColorModeValue("white", "#1d1e1f")}
          borderRadius="lg"
          borderWidth="1px"
          w="100%"
        >
          <VStack m={2} align="start">
            <FormControl isInvalid={errors.title != null}>
              <FormLabel>Title</FormLabel>
              <Input
                focusBorderColor={themeColor.primary}
                placeholder="Title"
                {...register("title", {
                  required: "Title is Required",
                })}
              />
              <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.text != null}>
              <FormLabel>Text</FormLabel>
              <Textarea
                placeholder="Text (Optional)"
                size="md"
                focusBorderColor={themeColor.primary}
                {...register("text")}
              />
              <FormErrorMessage>{errors.text?.message}</FormErrorMessage>
            </FormControl>
            <FormLabel>Image</FormLabel>
            <Box w="full" h="300px" border="1px solid">
              {image == null ? null : (
                <Image src={preview} objectFit="fill" w="full" h="300px" />
              )}
            </Box>
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
            <HStack w="100%">
              <Button
                onClick={() => inputRef.current?.click()}
                w="100%"
                fontSize={{ base: "sm", md: "md" }}
              >
                Upload Image (Optional)
              </Button>
              <Button onClick={() => setImage(null)} w="100%">
                Remove Image
              </Button>
            </HStack>
            <FormLabel>Tags</FormLabel>
            <Button
              type="submit"
              variant="solid"
              w="100%"
              isLoading={uploading}
            >
              Post
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePost;
