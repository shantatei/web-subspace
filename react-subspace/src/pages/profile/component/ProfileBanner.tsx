import {
  Box,
  Flex,
  HStack,
  Avatar,
  VStack,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { User } from "../../../utils/types";
import { themeColor } from "../../../utils/theme";
import ProfileTabs from "./ProfileTabs";

interface ProfileBannerProps {
  user: User | undefined;
}

const ProfileBanner = ({ user }: ProfileBannerProps) => {
  return (
    <Box
      borderRadius="md"
      borderTopRadius="none"
      borderWidth="1px"
      bgColor={useColorModeValue("white", "#1d1e1f")}
      h="fit-content"
      w="full"
      mt={`0 !important`}
    >
      <Flex m={2} justifyContent="start" alignItems="center">
        <HStack>
          <Avatar
            size="lg"
            src={user?.profile_image_url}
            border={`4px solid ${themeColor.secondary}`}
          />
          <VStack alignItems="start">
            <Heading fontSize="lg">{user?.username}</Heading>
          </VStack>
        </HStack>
      </Flex>
      <ProfileTabs />
    </Box>
  );
};

export default ProfileBanner;
