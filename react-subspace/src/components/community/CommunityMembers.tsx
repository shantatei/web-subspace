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
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { resetJoinCommunity, resetLeftCommunity } from "../../redux/authSlice";
import { setUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../utils/routes";

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
  const [isDeletedCommunity, setIsDeletedCommunity] = useState<boolean>(false);
  const leftCommunity = useSelector(
    (state: RootState) => state.auth.leftCommunity
  );
  const joinCommunity = useSelector(
    (state: RootState) => state.auth.joinCommunity
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchCommunityUsers = () => {
    communityapi.get(`usersInCommunity/${community.id}`).then(
      (res) => {
        setCommunityUsers(res.data.community_users);
      },
      (error) => {
        console.log(error.response.data);
        setIsDeletedCommunity(true);
      }
    );
  };

  const NavigateProfilePage = (user: User) => {
    dispatch(setUser(user));
    navigate(AppRoute.Profile);
  };

  function CommunityMembers() {
    if (!communityUsers.length) {
      return (
        <Box w="100%">
          <Text>
            <Progress size="xs" isIndeterminate />
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
                    <Avatar
                      src={member.profile_image_url}
                      onClick={() => NavigateProfilePage(member)}
                      _hover={{
                        cursor: "pointer",
                      }}
                    />
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
    dispatch(resetJoinCommunity());
    dispatch(resetLeftCommunity());
    fetchCommunityUsers();
  }, [leftCommunity == true, joinCommunity == true]);
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
        {isDeletedCommunity == true ? (
          <Text px={2} alignSelf="start">
            Community does not exist
          </Text>
        ) : (
          <VStack px={2} alignItems="start" w="100%">
            <CommunityMembers />
          </VStack>
        )}
      </VStack>
    </Box>
  );
};

export default CommunityMembers;
