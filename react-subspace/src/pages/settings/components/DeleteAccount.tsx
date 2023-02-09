import { useState } from "react";
import {
  Text,
  Box,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  useToast,
  InputRightElement,
  InputGroup,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { authapiToken } from "../../../api/auth";
import { themeColor } from "../../../utils/theme";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { logoutSuccess } from "../../../redux/authSlice";

interface DeleteAccountValues {
  password: string;
  _method: "DELETE";
}

const DeleteAccount = () => {
  const [showPW, setShowPW] = useState<boolean>(false);
  const AuthUser = useSelector((state: RootState) => state.auth);
  const toast = useToast();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<DeleteAccountValues>();

  const handleClickShowPassword = () => {
    setShowPW(!showPW);
  };

  const logoutUser = () => {
    authapiToken(AuthUser.token)
      .post("/logout")
      .then((res) => {
        console.log(res.data);
      });
    dispatch(logoutSuccess());
  };
  const onSubmitDelete = (data: DeleteAccountValues) => {
    data._method = "DELETE";
    // api call
    authapiToken(AuthUser.token)
      .post("/deleteUser", data)
      .then(
        (res) => {
          console.log(res.data);
          logoutUser();
          toast({
            description: "Your Account has been deleted",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        },
        (error) => {
          console.log(error.response.data);
          if ((error.response.data.error = "Current password does not match")) {
            setError("password", {
              message: "Current password does not match",
            });
          }
        }
      );
  };

  return (
    <>
      <Text mt="2" fontSize={{ base: "md", lg: "lg" }}>
        Delete Account
      </Text>
      <Box
        bgColor={useColorModeValue("white", "#1d1e1f")}
        borderRadius="lg"
        borderWidth="1px"
        w="100%"
      >
        <VStack
          id="deleteaccform"
          as="form"
          m={2}
          justifyContent="center"
          onSubmit={handleSubmit(onSubmitDelete)}
        >
          <FormControl isInvalid={errors.password != null}>
            <FormLabel>
              For security, please enter your password to delete your account
            </FormLabel>
            <InputGroup>
              <Input
                focusBorderColor={themeColor.primary}
                {...register("password", {
                  required: "Current Password is Required",
                  minLength: {
                    value: 6,
                    message: "Password is at least 6 characters",
                  },
                })}
                type={showPW ? "text" : "password"}
              />
              <InputRightElement>
                <IconButton
                  variant={"ghost"}
                  aria-label="show-password"
                  icon={showPW ? <ViewIcon /> : <ViewOffIcon />}
                  onClick={handleClickShowPassword}
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            id="deleteaccbtn"
            w="100%"
            bgColor="red"
            _hover={{ bgColor: "red" }}
          >
            Delete Account
          </Button>
        </VStack>
      </Box>
    </>
  );
};

export default DeleteAccount;
