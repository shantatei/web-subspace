import {
  Box,
  useColorModeValue,
  Avatar,
  Spacer,
  Button,
  HStack,
  Flex,
  Heading,
  VStack,
  Text,
} from "@chakra-ui/react";
import { Community } from "../../../utils/types";
import { themeColor } from "../../../utils/theme";
import { CalendarIcon } from "@chakra-ui/icons";

interface CommunityBannerProps {
  community: Community;
}

export const CommunityBanner = ({ community }: CommunityBannerProps) => {
  return (
    <Box
      bgColor={useColorModeValue("white", "#1d1e1f")}
      h={20}
      w="full"
      mt={`0 !important`}
    >
      <Flex m={2} alignItems="center" justifyContent="center" gap={10} >
        <HStack>
          <Avatar
            size="lg"
            src={community.community_image_url}
            border={`4px solid ${themeColor.secondary}`}
          />
          <VStack alignItems="start">
            <Heading fontSize="lg">{community.name}</Heading>
            <HStack mt={`0 !important`}>
              <CalendarIcon />
              <Text>
                Created {new Date(community.created_at).toLocaleDateString()}
              </Text>
            </HStack>
          </VStack>
        </HStack>
        <Button
          bgColor={themeColor.primary}
          _hover={{ bgColor: themeColor.secondary }}
        >
          Join
        </Button>
      </Flex>
    </Box>
  );
};
