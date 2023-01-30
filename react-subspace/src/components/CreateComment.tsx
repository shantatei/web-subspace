import {
  Textarea,
  Box,
  Button,
  VStack,
  FormControl,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { themeColor } from "../utils/theme";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { commentapiToken } from "../api/comment";

interface CommentValues {
  text: string;
}

const CreateComment = () => {
  const AuthUser = useSelector((state: RootState) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentValues>();

  const toast = useToast();

  const onSubmit = (data: CommentValues) => {
    if (AuthUser.isAuth) {
      console.log(data);

    //   commentapiToken(AuthUser.token)
    //     .post("/createComment", data)
    //     .then(
    //       (res) => {
    //         console.log(res.data);
    //       },
    //       (error) => {
    //         console.log(error.response.data);
    //       }
    //     );
    } else {
      toast({
        title: "Unauthorized",
        description: "Please Login to Comment ",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <Box mb={2}>
      <VStack spacing={2} as="form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.text != null}>
          <Textarea
            placeholder="What are your thoughts ?"
            size="md"
            focusBorderColor={themeColor.primary}
            {...register("text", {
              required: "You are required to type a text to comment !",
            })}
          />
          <FormErrorMessage>{errors.text?.message}</FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          variant="outline"
          w="100%"
          bgColor={themeColor.primary}
          _hover={{ bgColor: themeColor.secondary }}
        >
          Comment
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateComment;
