import { Dispatch, SetStateAction } from "react";
import {
  VStack,
  FormControl,
  FormErrorMessage,
  Textarea,
  Box,
  ButtonGroup,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { themeColor } from "../../utils/theme";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { postapiToken, postapi } from "../../api/post";
import { editPost, setPost } from "../../redux/postSlice";

interface EditPostValues {
  title: string;
  text: string;
  _method: "PUT";
}

interface EditPostProps {
  text: string | undefined;
  title: string;
  post_id: number;
  setIsEditable: Dispatch<SetStateAction<boolean>>;
}

const EditPost = ({ text, post_id, title, setIsEditable }: EditPostProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<EditPostValues>();
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
  const onSubmit = (data: EditPostValues) => {
    data.title = title;
    data._method = "PUT";
    postapiToken(AuthUser.token)
      .post(`/editPost/${post_id}`, data)
      .then(
        (res) => {
          setIsEditable(false);
          dispatch(
            editPost({
              post_id: post_id,
              text: data.text,
            })
          );
          fetchPost();
          toast({
            description: "Post has been updated",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        },
        (error) => {
          console.log(error.response.data);
        }
      );
  };
  return (
    <VStack as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.text != null}>
        <Textarea
          defaultValue={text}
          size="md"
          focusBorderColor={themeColor.primary}
          {...register("text", {
            required: "You are required to type a text to post!",
          })}
        />
        <FormErrorMessage>{errors.text?.message}</FormErrorMessage>
      </FormControl>
      <Box justifyContent="right" w="100%">
        <ButtonGroup gap={2}>
          <Button onClick={() => setIsEditable(false)}>Cancel</Button>
          <Button
            type="submit"
            variant="outline"
            bgColor={themeColor.primary}
            _hover={{ bgColor: themeColor.secondary }}
            disabled={!isDirty}
          >
            Save
          </Button>
        </ButtonGroup>
      </Box>
    </VStack>
  );
};

export default EditPost;
