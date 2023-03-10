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
import DeleteCommunity from "./DeleteCommunity";

interface CommunityBannerProps {
  community: Community;
}

interface DeleteModalState {
  communityid: number | null;
  isOpen: boolean;
}

export const CommunityBanner = ({ community }: CommunityBannerProps) => {
  const [communityUsers, setCommunityUsers] = useState<Array<CommunityUser>>(
    []
  );
  const [editModalState, setEditModalState] = useState({
    name: community.name,
    about: community.about,
    community_id: community.id,
    community_image_url: community.community_image_url,
    community_banner_url: community.community_banner_url,
    isOpen: false,
  });
  const [deleteModalState, setDeleteModalState] = useState<DeleteModalState>({
    communityid: community.id,
    isOpen: false,
  });
  const [owner, setOwner] = useState<boolean>(false);
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
    setOwner(false);
    console.log("Checking Owner");
    if (communityUsers == null) {
      console.log(communityUsers);
    } else {
      communityUsers.map((communityuser: CommunityUser) => {
        var comuserid: number;
        if (communityuser.user_id == AuthUser.user?.id) {
          comuserid = communityuser.id;
        }
        communityuser.roles.map((role: Role) => {
          if (
            role.pivot.com_users_id == comuserid &&
            role.role_name == "Owner"
          ) {
            console.log("I am the owner");
            setOwner(true);
          } else {
            console.log("You are not the owner");
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
              className="community-menu-btn"
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
            />
            <MenuList>
              <MenuItem
                icon={<EditIcon />}
                onClick={() =>
                  setEditModalState({ ...editModalState, isOpen: true })
                }
              >
                Edit
              </MenuItem>
              <MenuItem
                icon={<DeleteIcon />}
                onClick={() => {
                  setDeleteModalState({
                    ...deleteModalState,
                    isOpen: true,
                  });
                }}
              >
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          []
        )}
      </Flex>
      <EditCommunity state={editModalState} setState={setEditModalState} />
      <DeleteCommunity
        state={deleteModalState}
        setState={setDeleteModalState}
      />
    </Box>
  );
};
