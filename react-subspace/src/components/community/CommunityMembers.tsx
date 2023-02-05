import { useEffect, useState } from "react";
import {
  Box,
  useColorModeValue,
  VStack,
  Text,
  Flex,
  Avatar,
  Progress,
} from "@chakra-ui/react";
import { Community, CommunityUser, User, Role } from "../../utils/types";
import { themeColor } from "../../utils/theme";
import { communityapi } from "../../api/community";

interface CommunityMembersProps {
  community: Community;
  bgColorDark: string;
}

const CommunityMembers = ({
  community,
  bgColorDark,
}: CommunityMembersProps) => {
  const [communityUsers, setCommunityUsers] = useState<Array<CommunityUser>>(
    []
  );
  const fetchCommunityUsers = () => {
    communityapi.get(`usersInCommunity/${community.id}`).then(
      (res) => {
        setCommunityUsers(res.data.community_users);
      },
      (error) => {
        console.log(error.response.data);
      }
    );
  };

  function CommunityMembers() {
    if (!communityUsers.length) {
      return (
        <Box w="100%">
          <Text>
            <Progress size="xs" isIndeterminate  />
            Fetching Data
          </Text>
        </Box>
      );
    }
    return (
      <>
        {communityUsers.map((communityuser: CommunityUser) => {
          return (
            <Box key={communityuser.id}>
              {communityuser.user.map((member: User) => {
                return (
                  <Flex key={member.id}>
                    <Avatar src={member.profile_image_url} />
                    <Box ml="3">
                      <Text>{member.username}</Text>
                      {communityuser.roles.map((role: Role) => {
                        return (
                          <Text fontSize="sm" key={role.id}>
                            {role.role_name}
                          </Text>
                        );
                      })}
                    </Box>
                  </Flex>
                );
              })}
            </Box>
          );
        })}
      </>
    );
  }

  useEffect(() => {
    fetchCommunityUsers();
  }, []);
  return (
    <Box
      borderRadius="md"
      borderWidth="1px"
      bgColor={useColorModeValue("white", bgColorDark)}
      w="90%"
      h="max-content"
    >
      <VStack w="100%" pb={2}>
        <Box
          bgColor={themeColor.primary}
          objectFit="cover"
          borderTopRadius="md"
          objectPosition="center"
          boxSize="10"
          w="100%"
          display="flex"
          alignItems="center"
        >
          <Text px={2}>Members</Text>
        </Box>
        <VStack px={2} alignItems="start" w="100%">
          <CommunityMembers />
        </VStack>
      </VStack>
    </Box>
  );
};

export default CommunityMembers;
