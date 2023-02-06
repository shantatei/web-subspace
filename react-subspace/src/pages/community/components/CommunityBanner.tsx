import {
  Box,
  useColorModeValue,
  Avatar,
  HStack,
  Flex,
  Heading,
  VStack,
  Text,
  Spacer,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { themeColor } from "../../../utils/theme";
import { CalendarIcon } from "@chakra-ui/icons";
import { HamburgerIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { CommunityUser, Community, Role } from "../../../utils/types";
import { communityapi } from "../../../api/community";
import { RootState } from "../../../store";
import EditCommunity from "./EditCommunity";

interface CommunityBannerProps {
  community: Community;
}

export const CommunityBanner = ({ community }: CommunityBannerProps) => {
  const [communityUsers, setCommunityUsers] = useState<Array<CommunityUser>>(
    []
  );
  const [modalState, setModalState] = useState({
    name: community.name,
    about: community.about,
    community_id: community.id,
    community_image_url: community.community_image_url,
    community_banner_url: community.community_banner_url,
    isOpen: false,
  });
  const [owner, setOwner] = useState<boolean>(false);
  const [comUserId, setComUserID] = useState(0);
  const AuthUser = useSelector((state: RootState) => state.auth);
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

  const checkOwner = () => {
    console.log("Checking Owner");
    if (communityUsers == null) {
      console.log(communityUsers);
    } else {
      communityUsers.map((communityuser: CommunityUser) => {
        if (communityuser.user_id == AuthUser.user?.id) {
          setComUserID(communityuser.id);
        }
        communityuser.roles.map((role: Role) => {
          if (
            role.pivot.com_users_id == comUserId &&
            role.role_name == "Owner"
          ) {
            console.log("I am the owner");
            setOwner(true);
          }
        });
      });
    }
  };

  useEffect(() => {
    fetchCommunityUsers();
  }, []);

  useEffect(() => {
    checkOwner();
  }, [communityUsers, AuthUser.isAuth]);

  return (
    <Box
      borderRadius="md"
      borderTopRadius="none"
      borderWidth="1px"
      bgColor={useColorModeValue("white", "#1d1e1f")}
      h={20}
      w="full"
      mt={`0 !important`}
    >
      <Flex m={2} justifyContent="start" alignItems="center">
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
        <Spacer />
        {AuthUser.isAuth == false ? (
          []
        ) : owner == true ? (
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
            />
            <MenuList>
              <MenuItem
                icon={<EditIcon />}
                onClick={() => setModalState({ ...modalState, isOpen: true })}
              >
                Edit
              </MenuItem>
              <MenuItem
                icon={<DeleteIcon />}
                // onClick={() => {
                //   setModalState({
                //     isOpen: true,
                //     commentid: comment.id,
                //   });
                // }}
              >
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          []
        )}
      </Flex>
      <EditCommunity state={modalState} setState={setModalState} />
    </Box>
  );
};
