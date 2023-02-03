import {
  Box,
  VStack,
  useColorModeValue,
  Text,
  Divider,
  Heading,
  Button,
} from "@chakra-ui/react";
import { themeColor } from "../../../utils/theme";

const HomeFeed = () => {
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

          <Button w="100%" variant="solid">
            Create Post
          </Button>
          <Button w="100%" variant="outline">
            Create Community
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default HomeFeed;
