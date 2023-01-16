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
} from "@chakra-ui/react";
import { HamburgerIcon, AddIcon } from "@chakra-ui/icons";
import ToggleColorButton from "./ToggleColorButton";
import SearchBar from "./SearchBar";
import { themeColor } from "../../../utils/theme";
import AuthModal from "./modal/AuthModal";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { authapi } from "../../../api/auth";
import { logoutSuccess } from "../../../features/authSlice";

const Navbar: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [modalState, setModalState] = useState({ index: 0, isOpen: false });

  const dispatch = useDispatch();

  const AuthUser = useSelector((state: RootState) => state.auth);

  const logoutUser = () => {
    authapi.post("/logout", { token: AuthUser.token }).then((res) => {
      console.log(res.data);
    });
    dispatch(logoutSuccess());
  };

  return (
    <Flex
      minWidth="100%"
      align="center"
      p={3}
      bgColor={colorMode === "dark" ? "#1d1e1f" : "white"}
      boxShadow="base"
      gap="2"
      justifyContent="space-between"
    >
      <IconButton
        icon={<HamburgerIcon />}
        display={{ base: "flex", md: "none" }}
        aria-label="Menu Button"
      ></IconButton>
      <Text fontSize="xl" display={{ base: "none", md: "flex" }}>
        Subspace
      </Text>
      <SearchBar />
      <HStack>
        {AuthUser.isAuth ? (
          <>
            <IconButton icon={<AddIcon />} aria-label="Post Button" />
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
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
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
