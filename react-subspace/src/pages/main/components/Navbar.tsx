import { FC, useState } from "react";
import {
  Button,
  ButtonGroup,
  Flex,
  Text,
  useColorMode,
  IconButton,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { HamburgerIcon, AddIcon } from "@chakra-ui/icons";
import ToggleColorButton from "./ToggleColorButton";
import SearchBar from "./SearchBar";
import { themeColor } from "../../../utils/theme";
import AuthModal from "./modal/AuthModal";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { authapiToken } from "../../../api/auth";
import { logoutSuccess } from "../../../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { AppRoute } from "../../../utils/routes";
import { setUser } from "../../../redux/userSlice";
import SearchBox from "./SearchBox";

const Navbar: FC = () => {
  const { colorMode } = useColorMode();

  const [modalState, setModalState] = useState({ index: 0, isOpen: false });

  const dispatch = useDispatch();

  const toast = useToast();

  const AuthUser = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  const NavigateProfilePage = () => {
    dispatch(setUser(AuthUser.user));
    navigate(AppRoute.Profile);
  };

  const logoutUser = () => {
    authapiToken(AuthUser.token)
      .post("/logout")
      .then((res) => {
        console.log(res.data);
      });
    dispatch(logoutSuccess());
    toast({
      description: "Logout Success",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Flex
      minWidth="100%"
      align="center"
      p={3}
      bgColor={colorMode === "dark" ? "#1d1e1f" : "white"}
      boxShadow="base"
      gap="2"
      position="fixed"
      top={0}
      zIndex={100}
      justifyContent="space-between"
    >
      <IconButton
        icon={<HamburgerIcon />}
        display={{ base: "flex", md: "none" }}
        aria-label="Menu Button"
      ></IconButton>
      <Text
        fontSize="xl"
        display={{ base: "none", md: "flex" }}
        as={Link}
        to={AppRoute.Home}
      >
        Subspace
      </Text>
      <VStack alignItems="start">
        <SearchBar />
        <SearchBox />
      </VStack>
      <HStack>
        {AuthUser.isAuth ? (
          <>
            <Button
              display={{ base: "none", md: "flex" }}
              leftIcon={<AddIcon />}
              onClick={() => navigate(AppRoute.CreatePost)}
            >
              <Text> Create Post</Text>
            </Button>
            <Button
              display={{ base: "flex", md: "none" }}
              onClick={() => navigate(AppRoute.CreatePost)}
            >
              <AddIcon />
            </Button>
            <ToggleColorButton />
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} src={AuthUser.user?.profile_image_url} />
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Avatar
                    size={"sm"}
                    src={AuthUser.user?.profile_image_url}
                    m="2"
                  />
                  <Text fontSize="lg">{AuthUser.user?.username}</Text>
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => NavigateProfilePage()}>
                  Profile
                </MenuItem>
                <MenuItem onClick={() => navigate(AppRoute.Settings)}>
                  Settings
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={logoutUser}>Log Out</MenuItem>
              </MenuList>
            </Menu>
          </>
        ) : (
          <ButtonGroup gap="1">
            <ToggleColorButton />
            <Button onClick={() => setModalState({ index: 0, isOpen: true })}>
              Login
            </Button>
            <Button
              bgColor={themeColor.primary}
              onClick={() => setModalState({ index: 1, isOpen: true })}
            >
              Sign Up
            </Button>
          </ButtonGroup>
        )}
      </HStack>
      <AuthModal state={modalState} setState={setModalState} />
    </Flex>
  );
};

export default Navbar;
