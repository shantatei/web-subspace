import {
  Box,
  VStack,
  useColorModeValue,
  Text,
  Divider,
  Heading,
  Button,
  useToast,
} from "@chakra-ui/react";
import { themeColor } from "../../../utils/theme";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../../utils/routes";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import useUnauthorizedToast from "../../../hooks/useUnauthorizedToast";
import CreateCommunity from "../../../components/community/CreateCommunity";
import { useState } from "react";

const HomeFeed = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const Auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const toast = useToast();
  return (
    <Box
      display="flex"
      borderRadius="md"
      borderWidth="1px"
      bgColor={useColorModeValue("white", "#1d1e1f")}
      w="80"
      h="max-content"
    >
      <VStack w="100%" pb={2}>
        <Box
          bgColor={themeColor.secondary}
          objectFit="cover"
          borderTopRadius="md"
          objectPosition="center"
          boxSize="10"
          w="100%"
        />
        <VStack p={3} alignItems="start" w="100%">
          <Heading fontSize="md">Home</Heading>
          <Text>
            Your personal Subspace frontpage. Come here to check in with your
            favorite communities.
          </Text>
          <Divider />

          <Button
            w="100%"
            variant="solid"
            onClick={() =>
              Auth.isAuth
                ? navigate(AppRoute.CreatePost)
                : useUnauthorizedToast(toast)
            }
          >
            Create Post
          </Button>
          <Button
            w="100%"
            variant="outline"
            onClick={() => {
              Auth.isAuth ? setIsOpen(true) : useUnauthorizedToast(toast);
            }}
          >
            Create Community
          </Button>
        </VStack>
      </VStack>
      <CreateCommunity isOpen={isOpen} setIsOpen={setIsOpen} />
    </Box>
  );
};

export default HomeFeed;
