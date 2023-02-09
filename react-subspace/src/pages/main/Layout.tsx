import { FC } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { VStack, Box } from "@chakra-ui/react";
import SearchBox from "./components/SearchBox";

const Layout: FC = () => {
  return (
    <VStack>
      <Navbar />
      {/* <SearchBox /> */}
      <Outlet />
    </VStack>
  );
};

export default Layout;
