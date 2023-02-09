import { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  Button,
  InputRightElement,
  InputGroup,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { themeColor } from "../../../../utils/theme";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { loginFail, loginSuccess } from "../../../../redux/authSlice";
import { useDispatch } from "react-redux";
import { authapi } from "../../../../api/auth";

interface LoginValues {
  email: string;
  password: string;
}

interface LoginFormProps {
  onClose: () => void;
}

const LoginForm = ({ onClose }: LoginFormProps) => {
  const dispatch = useDispatch();
  const [showPW, setShowPW] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPW(!showPW);
  };

  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginValues>();

  const onSubmit = (data: LoginValues) => {
    // api call
    authapi.post("/login", data).then(
      (res) => {
        dispatch(loginSuccess(res.data));
        onClose();
        toast({
          description: "Login Success",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      },
      (error) => {
        console.log(error.response.data);
        toast({
          title: "Invalid Login Details",
          description: error.response.data.error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        dispatch(loginFail());
        if (
          (error.response.data.error =
            "Unauthorized, Invalid Email or Password")
        ) {
          console.log("invalid");
          setError("email", { message: "Incorrect Email or Password" });
          setError("password", { message: "Incorrect Email or Password" });
        }
      }
    );
  };

  return (
    <VStack
      as="form"
      mx="auto"
      id="loginform"
      justifyContent="center"
      onSubmit={handleSubmit(onSubmit)}
    >
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
        variant="outline"
        w="100%"
        bgColor={themeColor.primary}
        _hover={{ bgColor: themeColor.secondary }}
      >
        Log In
      </Button>
    </VStack>
  );
};

export default LoginForm;
