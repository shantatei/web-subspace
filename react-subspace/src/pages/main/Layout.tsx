import { FC } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { VStack } from "@chakra-ui/react";

const Layout: FC = () => {
  return (
    <VStack>
      <Navbar />
      <Outlet />
    </VStack>
  );
};

export default Layout;
