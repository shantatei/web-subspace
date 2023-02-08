import React from "react";
import { Button, Text } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useColorMode } from "@chakra-ui/react";

interface ToggleColorButtonProps {
  display: any;
  width? : any
}

const ToggleColorButton = ({ display ,width }: ToggleColorButtonProps) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button
      onClick={() => toggleColorMode()}
      justifyContent="start"
      cursor="pointer"
      width={width}
      display={display}
      leftIcon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
    >
      <Text>{colorMode === "dark" ? "Light Theme" : "Dark Theme"}</Text>
    </Button>
  );
};
export default ToggleColorButton;
