import { Box, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { Community } from "../utils/types";

interface CommunityProps {
  community: Community;
}

const CommunityCard = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      borderRadius="md"
      borderWidth="1px"
      bgColor={useColorModeValue("white", "blackAlpha.200")}
      w="80%"
    >
      <VStack>
        <Text>About Community</Text>
        <Text fontWeight="semibold">Community Name</Text>
      </VStack>
    </Box>
  );
};

export default CommunityCard;
