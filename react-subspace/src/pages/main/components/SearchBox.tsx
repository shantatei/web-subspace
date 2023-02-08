import {
  Box,
  useColorModeValue,
  VStack,
  Divider,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Post } from "../../../utils/types";

const SearchBox = () => {
  const isQuery = useSelector((state: RootState) => state.search.isQuery);
  const filteredPosts = useSelector(
    (state: RootState) => state.post.filteredPost
  );
  return (
    <Box
      bgColor={useColorModeValue("white", "#1d1e1f")}
      h="fit-content"
      position="fixed"
      overflow="auto"
      zIndex={100}
      top="50px"
      width={{ base: "250px", md: "400px" }}
      display={isQuery == true ? "flex" : "none"}
      maxHeight={"482px"}
      scrollBehavior="smooth"
    >
      <VStack divider={<Divider />} align="start" w="100%">
        {filteredPosts == undefined ? (
          <Box p={2}>
            <Text>Fetching Data</Text>
          </Box>
        ) : !filteredPosts.length ? (
          <Box p={2}>
            <Text></Text>
            <Text>We can't find a post that match your search term</Text>
          </Box>
        ) : (
          filteredPosts.map((post: Post) => {
            return (
              <Box
                w="100%"
                key={post.id}
                p={2}
                justifyContent="start"
                _hover={{
                  cursor: "pointer",
                }}
              >
                <Text fontWeight="semi-bold">{post.title}</Text>
                <Text pt="2" fontSize="sm">
                  {post.text}
                </Text>
              </Box>
            );
          })
        )}
      </VStack>
    </Box>
  );
};

export default SearchBox;
