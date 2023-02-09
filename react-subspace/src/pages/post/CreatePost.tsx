import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Text,
  Textarea,
  useColorMode,
  useColorModeValue,
  useToast,
  VStack,
  Tag,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Select from "react-select";
import { postapiToken } from "../../api/post";
import { RootState } from "../../store";
import { themeColor } from "../../utils/theme";
import { Category, Community } from "../../utils/types";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../utils/routes";

export interface PostValues {
  community_id: number | null;
  title: string;
  text?: string | null;
  post_image_filename?: File | null | undefined;
  category_id: number | null;
}

const CreatePost = () => {
  const communities = useSelector(
    (state: RootState) => state.community.communities
  );
  const categories = useSelector((state: RootState) => state.post.categories);
  const AuthUser = useSelector((state: RootState) => state.auth);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<File | null | undefined>();
  const [preview, setPreview] = useState<any>();
  const [uploading, setUploading] = useState<boolean>(false);
  const navigate = useNavigate();
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
    if (data.category_id == undefined) {
      data.category_id = null;
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
          navigate(AppRoute.Home);
        },
        (error) => {
          console.log(error.response.data);
        }
      );
  };

  const { colorMode } = useColorMode();
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
                    <Text color={colorMode === "dark" ? "white" : "black"}>
                      {community.label}
                    </Text>
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
                    backgroundColor: state.isSelected
                      ? useColorModeValue("#bea8ed", "#9268ed")
                      : "",
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
            <FormControl isInvalid={errors.category_id != null}>
              <FormLabel>Tags (Optional)</FormLabel>
              <Controller
                name="category_id"
                control={control}
                render={({ field: { onChange, ref } }) => (
                  <Select
                    ref={ref}
                    onChange={(option) => onChange(option?.value)}
                    options={categories.map((category: Category) => {
                      return {
                        label: category.category_name,
                        value: category.id,
                        key: category.id,
                      };
                    })}
                    formatOptionLabel={(category) => (
                      <Tag>{category.label}</Tag>
                    )}
                    isSearchable
                    isClearable
                    placeholder="Choose a Tag"
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        backgroundColor: useColorModeValue("white", "gray.800"),
                        borderColor: useColorModeValue("black", "white"),
                        boxShadow: "none",
                        ":hover": {
                          borderColor: useColorModeValue("black", "white"),
                        },
                      }),
                      option: (styles, state) => ({
                        ...styles,
                        backgroundColor: state.isSelected
                          ? useColorModeValue("#bea8ed", "#9268ed")
                          : "",
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
              <FormErrorMessage>{errors.category_id?.message}</FormErrorMessage>
            </FormControl>
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
