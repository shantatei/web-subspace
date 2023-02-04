import { Dispatch, SetStateAction } from "react";
import {
  VStack,
  FormControl,
  Textarea,
  FormErrorMessage,
  Button,
  Box,
  ButtonGroup,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { themeColor } from "../../utils/theme";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { commentapiToken } from "../../api/comment";
import { editComment } from "../../redux/commentSlice";

interface EditCommentValues {
  comment_id: number;
  text: string;
  _method: "PUT";
}

interface EditCommentProps {
  text: string;
  comment_id: number;
  fetchComments: () => void;
  setIsEditable: Dispatch<SetStateAction<boolean>>;
}

const EditComment = ({
  text,
  fetchComments,
  setIsEditable,
  comment_id,
}: EditCommentProps) => {
  const toast = useToast();
  const AuthUser = useSelector((state: RootState) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<EditCommentValues>();
  const dispatch = useDispatch();

  const onSubmit = (data: EditCommentValues) => {
    data.comment_id = comment_id;
    data._method = "PUT";
    console.log(data);
    commentapiToken(AuthUser.token)
      .post("/editComment", data)
      .then(
        (res) => {
          setIsEditable(false);
          dispatch(
            editComment({
              comment_id: comment_id,
              text: data.text,
            })
          );
          fetchComments();
          toast({
            description: "Comment has been updated",
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
    <VStack as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.text != null}>
        <Textarea
          defaultValue={text}
          size="md"
          focusBorderColor={themeColor.primary}
          {...register("text", {
            required: "You are required to type a text to comment !",
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

export default EditComment;
