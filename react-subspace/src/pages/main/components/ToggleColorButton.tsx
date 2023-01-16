import React from "react";
import { Button } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useColorMode } from "@chakra-ui/react";

const ToggleColorButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={() => toggleColorMode()}>
      {colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
};
export default ToggleColorButton;
