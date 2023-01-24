import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  Button,
  InputGroup,
  InputRightElement,
  IconButton,
  useToast
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { themeColor } from "../../../../utils/theme";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { authapi } from "../../../../api/auth";

interface SignupValues {
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
}

interface SignupFormProps {
  onClose: () => void;
}
const SignUpForm = ({ onClose }: SignupFormProps) => {
  const [showPW, setShowPW] = useState<boolean>(false);
  const [showCfmPW, setShowCfmPW] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPW(!showPW);
  };

  const handleClickShowConfirmPassword = () => {
    setShowCfmPW(!showCfmPW);
  };
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm<SignupValues>();

  const onSubmit = (data: SignupValues) => {
    // api call
    authapi.post("/register", data).then(
      (res) => {
        console.log(res.data);
        onClose();

        toast({
          title: "Account created.",
          description: "We've created your account for you.",
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
    <VStack
      as="form"
      mx="auto"
      justifyContent="center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl isInvalid={errors.username != null}>
        <FormLabel>Username</FormLabel>
        <Input
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
      <FormControl isInvalid={errors.password != null}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            focusBorderColor={themeColor.primary}
            {...register("password", {
              required: "Password is Required",
              minLength: {
                value: 6,
                message: "Password must have at least 6 characters",
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
      <FormControl isInvalid={errors.password_confirmation != null}>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            backdropBrightness="1"
            focusBorderColor={themeColor.primary}
            {...register("password_confirmation", {
              required: "Password Confirmation is Required",
              minLength: {
                value: 6,
                message: "Password must have at least 6 characters",
              },
              validate: (value) =>
                value === getValues().password || "The passwords do not match",
            })}
            type={showCfmPW ? "text" : "password"}
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
          {errors.password_confirmation?.message}
        </FormErrorMessage>
      </FormControl>

      <Button
        type="submit"
        variant="outline"
        w="100%"
        bgColor={themeColor.primary}
        _hover={{ bgColor: themeColor.secondary }}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUpForm;
