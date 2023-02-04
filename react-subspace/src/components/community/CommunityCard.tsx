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
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../utils/routes";

interface CommunityCardProps {
  community: Community;
  bgColorDark: string;
}

interface CommunityUsers {
  community_users: Array<CommunityUser>;
  members_count: number;
}

export const CommunityCard = ({
  community,
  bgColorDark,
}: CommunityCardProps) => {
  const [communityUsers, setCommunityUsers] = useState<CommunityUsers>({
    community_users: [],
    members_count: 0,
  });

  const navigate = useNavigate();

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

  function Banner() {
    if (community.community_banner_url) {
      return (
        <Image
          src={community.community_banner_url}
          objectFit="cover"
          borderTopRadius="md"
          objectPosition="center"
          boxSize="10"
          w="100%"
        />
      );
    }
    return (
      <Box
        bgColor={themeColor.secondary}
        objectFit="cover"
        borderTopRadius="md"
        objectPosition="center"
        boxSize="10"
        w="100%"
      />
    );
  }

  useEffect(() => {
    fetchUserCount();
  }, []);

  return (
    <Box
      borderRadius="md"
      borderWidth="1px"
      bgColor={useColorModeValue("white", bgColorDark)}
      w="90%"
      h="max-content"
      onClick={() =>
        navigate(AppRoute.Community, {
          state: { community: community },
        })
      }
      cursor="pointer"
    >
      <VStack w="100%" pb={2}>
        <Banner />
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
