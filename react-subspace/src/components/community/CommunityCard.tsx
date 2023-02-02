import {
  Box,
  Text,
  useColorModeValue,
  VStack,
  HStack,
  Avatar,
  Image,
  Divider,
  Button,
} from "@chakra-ui/react";
import { Community } from "../../utils/types";
import { CalendarIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { communityapi } from "../../api/community";
import { CommunityUser } from "../../utils/types";
import { themeColor } from "../../utils/theme";

interface CommunityCardProps {
  community: Community;
}

interface CommunityUsers {
  community_users: Array<CommunityUser>;
  members_count: number;
}

const CommunityCard = ({ community }: CommunityCardProps) => {
  const [communityUsers, setCommunityUsers] = useState<CommunityUsers>({
    community_users: [],
    members_count: 0,
  });

  const fetchUserCount = () => {
    communityapi.get(`usersInCommunity/${community.id}`).then(
      (res) => {
        setCommunityUsers({
          community_users: res.data.community_users,
          members_count: res.data.members_count,
        });
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  };
  useEffect(() => {
    fetchUserCount();
  }, []);
  return (
    <Box
      display="flex"
      borderRadius="md"
      borderWidth="1px"
      bgColor={useColorModeValue("white", "blackAlpha.200")}
      w="80%"
      h="max-content"
    >
      <VStack w="100%" pb={2} >
        <Image
          src={community.community_banner_url}
          objectFit="cover"
          borderTopRadius="md"
          objectPosition="center"
          boxSize="10"
          w="100%"
        />
        <VStack px={2} alignItems="start" w="100%">
          <HStack>
            <Avatar src={community.community_image_url} />
            <Text fontWeight="semibold">{community.name}</Text>
          </HStack>
          <Text>{community.about}</Text>
          <HStack>
            <CalendarIcon />
            <Text>
              Created {new Date(community.created_at).toLocaleDateString()}
            </Text>
          </HStack>
          <Divider />
          <Text>{communityUsers.members_count} Members</Text>
          <Divider />
          <Button
            w="100%"
            bgColor={themeColor.primary}
            _hover={{ bgColor: themeColor.secondary }}
          >
            Join
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default CommunityCard;
