import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";

const FilterPost = () => {
  return (
    <Box
      bgColor={useColorModeValue("white", "#1d1e1f")}
      h="fit-content"
      w="full"
    >
        Filter Post
    </Box>
  );
};

export default FilterPost;
