import { FC } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerOverlay,
  DrawerBody,
  Button,
  Icon,
  VStack,
  Text,
  Image,
  HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AppRoute } from "../../../utils/routes";
import { FiHome, FiPlus } from "react-icons/fi";
import { IconType } from "react-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import ToggleColorButton from "./ToggleColorButton";

interface SideBarProps {
  drawerIsOpen: boolean;
  toggleDrawer: () => void;
}

interface SidebarItemProps {
  icon: IconType;
  link: AppRoute;
  name: string;
  toggleDrawer: () => void;
}

const SideBarItems = [
  {
    name: "Home",
    icon: FiHome,
    link: AppRoute.Home,
  },
  {
    name: "Create Post",
    icon: FiPlus,
    link: AppRoute.CreatePost,
  },
];

const SidebarItem: FC<SidebarItemProps> = ({
  link,
  icon,
  name,
  toggleDrawer,
}) => {
  const navigate = useNavigate();
  const AuthUser = useSelector((state: RootState) => state.auth);
  return (
    <Button
      w="100%"
      leftIcon={<Icon as={icon} />}
      borderRadius="lg"
      justifyContent="start"
      cursor="pointer"
      display={
        link == AppRoute.CreatePost && !AuthUser.isAuth ? "none" : "flex"
      }
      onClick={() => {
        navigate(link);
        toggleDrawer();
      }}
    >
      <Text fontSize="md">{name}</Text>
    </Button>
  );
};

const Sidebar: FC<SideBarProps> = ({ drawerIsOpen, toggleDrawer }) => {
  return (
    <Drawer
      preserveScrollBarGap
      autoFocus={false}
      isOpen={drawerIsOpen}
      placement="left"
      onClose={toggleDrawer}
      returnFocusOnClose={false}
      onOverlayClick={toggleDrawer}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader as={Link} to={AppRoute.Home}>
          <HStack>
            <Image src="/icon-192.png" boxSize={10} />
            <Text>Subspace</Text>
          </HStack>
        </DrawerHeader>

        <DrawerBody>
          <VStack mt={4} spacing={2}>
            {SideBarItems.map((item, index) => (
              <SidebarItem
                key={index}
                icon={item.icon}
                link={item.link}
                name={item.name}
                toggleDrawer={toggleDrawer}
              />
            ))}
            <ToggleColorButton
              display={{ base: "flex", md: "none" }}
              width="100%"
            />
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default Sidebar;
