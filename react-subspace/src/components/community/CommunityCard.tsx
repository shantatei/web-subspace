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
  Progress,
  useToast,
} from "@chakra-ui/react";
import { Community, User, CommunityUser } from "../../utils/types";
import { CalendarIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { communityapi, communityapiToken } from "../../api/community";
import { themeColor } from "../../utils/theme";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../utils/routes";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import useUnauthorizedToast from "../../hooks/useUnauthorizedToast";

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
  const [joinedCommunity, setJoinedCommunity] = useState<boolean>(false);
  const AuthUser = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toast = useToast();

  function over() {
    setIsVisible(true);
  }
  function out() {
    setIsVisible(false);
  }

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

  const checkJoinedCommunity = () => {
    communityUsers.community_users.map((communityuser: CommunityUser) => {
      communityuser.user.map((member: User) => {
        if (member.id == AuthUser.user?.id) {
          setJoinedCommunity(true);
        }
      });
    });
  };

  const joinCommunity = () => {
    if (AuthUser.isAuth) {
      const data = {
        community_id: community.id,
      };
      console.log(data);
      communityapiToken(AuthUser.token)
        .post("joinCommunity", data)
        .then(
          (res) => {
            console.log(res.data);
            toast({
              description: `Successfully joined ${community.name}`,
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            setJoinedCommunity(true);
          },
          (error) => {
            console.log(error.response.data);
          }
        );
    } else {
      useUnauthorizedToast(toast);
    }
  };

  const leaveCommunity = () => {
    const data = {
      community_id: community.id,
      _method: "DELETE",
    };
    console.log(data);
    communityapiToken(AuthUser.token)
      .post("leaveCommunity", data)
      .then(
        (res) => {
          console.log(res.data);
          if (
            res.data.message ==
            "You are the owner, you cannot leave your own community !"
          ) {
            toast({
              description: res.data.message,
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          } else {
            toast({
              description: `Successfully left ${community.name}`,
              status: "error",
              duration: 3000,
              isClosable: true,
            });
            setJoinedCommunity(false);
          }
        },
        (error) => {
          console.log(error.response.data);
        }
      );
  };

  useEffect(() => {
    fetchUserCount();
  }, [joinCommunity]);

  useEffect(() => {
    checkJoinedCommunity();
  }, [communityUsers.community_users]);

  return (
    <Box
      borderRadius="md"
      borderWidth="1px"
      bgColor={useColorModeValue("white", bgColorDark)}
      w="90%"
      h="max-content"
    >
      <VStack w="100%" pb={2}>
        <Banner />
        <VStack px={2} alignItems="start" w="100%">
          <HStack
            onClick={() =>
              navigate(AppRoute.Community, {
                state: { community: community },
              })
            }
            cursor="pointer"
          >
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
          {communityUsers.members_count > 0 ? (
            <Text>{communityUsers.members_count} Members</Text>
          ) : (
            <Box w="100%">
              <Text>
                <Progress size="xs" isIndeterminate />
                Fetching Data
              </Text>
            </Box>
          )}

          <Divider />
          {joinedCommunity == false ? (
            <Button
              w="100%"
              onClick={() => joinCommunity()}
              disabled={!communityUsers.community_users.length}
            >
              Join
            </Button>
          ) : (
            <Button
              w="100%"
              onMouseOver={over}
              onMouseOut={out}
              onClick={() => leaveCommunity()}
            >
              {isVisible ? "Leave" : "Joined"}
            </Button>
          )}
        </VStack>
      </VStack>
    </Box>
  );
};
