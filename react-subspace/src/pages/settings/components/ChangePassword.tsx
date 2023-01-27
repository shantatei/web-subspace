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
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { authapiToken } from "../../../api/auth";
import { themeColor } from "../../../utils/theme";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

interface ChangePasswordValues {
  old_password: string;
  password: string;
  confirm_password: string;
}

const ChangePassword = () => {
  const [showPW, setShowPW] = useState<boolean>(false);
  const [showCfmPW, setShowCfmPW] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPW(!showPW);
  };

  const handleClickShowConfirmPassword = () => {
    setShowCfmPW(!showCfmPW);
  };
  const toast = useToast();
  const AuthUser = useSelector((state: RootState) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm<ChangePasswordValues>();

  const onSubmitChange = (data: ChangePasswordValues) => {
    // api call
    authapiToken(AuthUser.token)
      .post("/change-password", data)
      .then(
        (res) => {
          console.log(res.data);
          toast({
            description: "Password has been changed",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        },
        (error) => {
          console.log(error.response.data);
          if ((error.response.data.error = "Old password does not match")) {
            setError("old_password", {
              message: "Old password does not match",
            });
          }
        }
      );
  };

  return (
    <>
      <Text mt="2" fontSize={{ base: "md", lg: "lg" }}>
        Change Password
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
          onSubmit={handleSubmit(onSubmitChange)}
        >
          <FormControl isInvalid={errors.old_password != null}>
            <FormLabel>Old Password</FormLabel>
            <Input
              focusBorderColor={themeColor.primary}
              {...register("old_password", {
                required: "Old Password is Required",
              })}
              type="password"
            />
            <FormErrorMessage>{errors.old_password?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password != null}>
            <FormLabel>New Password</FormLabel>
            <InputGroup>
              <Input
                focusBorderColor={themeColor.primary}
                {...register("password", {
                  required: "New Password is Required",
                  minLength: {
                    value: 6,
                    message: "Password must have at least 6 characters",
                  },
                })}
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
          <FormControl isInvalid={errors.confirm_password != null}>
            <FormLabel>Confirm New Password</FormLabel>
            <InputGroup>
              <Input
                focusBorderColor={themeColor.primary}
                {...register("confirm_password", {
                  required: "Confirm New Password is Required",
                  minLength: {
                    value: 6,
                    message: "Password must have at least 6 characters",
                  },
                  validate: (value) =>
                    value === getValues().password ||
                    "The passwords do not match",
                })}
                type={showPW ? "text" : "password"}
              />
              <InputRightElement>
                <IconButton
                  variant={"ghost"}
                  aria-label="show-password"
                  icon={showCfmPW ? <ViewIcon /> : <ViewOffIcon />}
                  onClick={handleClickShowConfirmPassword}
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {errors.confirm_password?.message}
            </FormErrorMessage>
          </FormControl>
          <Button type="submit" w="100%">
            Change Password
          </Button>
        </VStack>
      </Box>
    </>
  );
};

export default ChangePassword;
